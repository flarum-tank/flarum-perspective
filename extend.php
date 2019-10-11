<?php
use Flarum\Extend;
use Flarum\Post\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;
use Tank\Perspective\Listener\ValidatePost;
use Tank\Perspective\Perspective;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    function (Dispatcher $events, Container $container) {
        $container->bind(Perspective::class, function ($app) {
            $settings = $app->make(SettingsRepositoryInterface::class);
            return new Perspective(
                $settings->get('perspective.api_key'), $settings->get('perspective.threshold'),
                [
                    'toxicity' => $settings->get('perspective.models.toxicity'),
                    'identity' => false,
                    'insult' => false,
                    'profanity' => $settings->get('perspective.models.profanity'),
                    'threat' => $settings->get('perspective.models.threat'),
                    'sexually_explicit' => $settings->get('perspective.models.sexually_explicit'),
                    'flirtation' => $settings->get('perspective.models.flirtation')
                ]
            );
        });
        $events->listen(Saving::class, ValidatePost::class);
    }
];
