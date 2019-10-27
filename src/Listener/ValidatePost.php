<?php


namespace Tank\Perspective\Listener;


use Flarum\Flags\Flag;
use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use PerspectiveApi\CommentsClient;

class ValidatePost
{
    protected $perspective;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(Saving $event) {
        $post = $event->post;

        $doNotStore = $this->settings->get('perspective.donotstore');

        $requestAttributes = array();
        if ($this->settings->get('perspective.models.toxicity')) {
            $requestAttributes['TOXICITY'] = ['scoreType' => 'PROBABILITY', 'scoreThreshold' => 0];
        }
        if ($this->settings->get('perspective.models.threat')) {
            $requestAttributes['THREAT'] = ['scoreType' => 'PROBABILITY', 'scoreThreshold' => 0];
        }
        if ($this->settings->get('perspective.models.profanity')) {
            $requestAttributes['PROFANITY'] = ['scoreType' => 'PROBABILITY', 'scoreThreshold' => 0];
        }
        if ($this->settings->get('perspective.models.sexually_explicit')) {
            $requestAttributes['SEXUALLY_EXPLICIT'] = ['scoreType' => 'PROBABILITY', 'scoreThreshold' => 0];
        }
        if ($this->settings->get('perspective.models.flirtation')) {
            $requestAttributes['FLIRTATION'] = ['scoreType' => 'PROBABILITY', 'scoreThreshold' => 0];
        }
        $perspectiveClient = new CommentsClient($this->settings->get('perspective.api_key'));
        $perspectiveClient->comment(['text' => $post->content]);
        $perspectiveClient->requestedAttributes($requestAttributes);
        $response = $perspectiveClient->analyze();
        $scores = array();
        foreach ($response->attributeScores() as $score) {
            $scores[] = $score['summaryScore']['value'];
        }
        $scores = array_filter($scores);
        $average = array_sum($scores)/count($scores);
        $isToxic = $average * 100 >= $this->settings->get('perspective.threshold') ? true : false;
        if ($isToxic) {
            $post->is_approved = false;
            $post->afterSave(function ($post) {
                // Do not approve the discussion if only one post
                if ($post->number == 1) {
                    $post->discussion->is_approved = false;
                    $post->discussion->save();
                }
                // Flag the post/discussion
                $flag = new Flag();
                $flag->post_id = $post->id;
                $flag->type = 'perspective';
                $flag->created_at = time();
                $flag->save();
            });
        }
    }
}
