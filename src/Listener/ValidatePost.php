<?php


namespace Tank\Perspective\Listener;


use Flarum\Flags\Flag;
use Flarum\Post\Event\Saving;
use Tank\Perspective\Perspective;

class ValidatePost
{
    protected $perspective;

    public function __construct(Perspective $perspective)
    {
        $this->perspective = $perspective;
    }

    public function handle(Saving $event) {
        $post = $event->post;
        $isToxic = $this->perspective->isToxic($post->content);
        if ($isToxic) {
            $post->is_approved = false;
            $post->afterSave(function ($post) {
                // Do not disapprove the discussion if only one post
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
