<?php
namespace Tank\Perspective;

class Perspective {
    // API Url
    const API_URL = '';
    // The API version
    const API_VERSION = '';
    // The PHP file version
    const VERSION = '1.0.0';

    /**
     * The perspective API key
     * @var string
     */
    private $apiKey;
    /**
     * The API timeout
     * @var int
     */
    private $timeOut = 60;
    /**
     * The user agent
     * @var string
     */
    private $userAgent;
    /**
     * The url
     * @var string
     */
    private $url;

    /**
     * Threshold for any model
     * @var int
     */
    private $threshold;

    /**
     * Perspective models to enable
     * @var array|null
     */
    private $models = [
        'toxicity' => true,
        'identity' => false,
        'insult' => false,
        'profanity' => false,
        'threat' => false,
        'sexually_explicit' => false,
        'flirtation' => false
    ];

    /**
     * Perspective constructor.
     * @param $apiKey string
     * @param $threshold int
     * @param $models array|null
     */
    public function __construct($apiKey, $threshold = 70, $models = null)
    {
        $this->setApiKey($apiKey);
        $this->threshold = $threshold;
        if ($models != null) {
            $this->models = $models;
        }
    }

    /**
     * Set the API key
     * @param $apiKey string
     */
    public function setApiKey($apiKey) {
        $this->apiKey = (string) $apiKey;
    }

    /**
     * Get the user agent
     * @return string
     */
    public function getUserAgent() {
        return (string) 'PHP Perspective/' . self::VERSION . ' ' . $this->userAgent;
    }

    /**
     * Set the user agent
     * @param $userAgent string
     */
    public function setUserAgent($userAgent) {
        $this->userAgent = (string) $userAgent;
    }

    /**
     * Check if comment is toxic
     * @param $comment
     * @return bool
     */
    public function isToxic($comment) {
        return false;
    }
}
