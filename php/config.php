<?php
declare(strict_types=1);

// Isports SDK configuration

class IsportsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Isports",
                "slug" => "isports",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "http://api.isportsapi.com",
                "auth" => [
                    "prefix" => "",
                    "in" => "query",
                    "name" => "api_key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "football" => [],
                ],
            ],
            "entity" => [
        'football' => [
          'fields' => [
            [
              'name' => 'schedule',
              'title' => 'Schedule',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'football',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/schedule/basic',
                  'segments' => [
                    [
                      'lit' => 'sport',
                    ],
                    [
                      'lit' => 'football',
                    ],
                    [
                      'lit' => 'schedule',
                    ],
                    [
                      'lit' => 'basic',
                    ],
                  ],
                  'parts' => [
                    'sport',
                    'football',
                    'schedule',
                    'basic',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                      ],
                      [
                        'name' => 'league_id',
                        'orig' => 'leagueId',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 1639,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'league_id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/livescores',
                  'segments' => [
                    [
                      'lit' => 'sport',
                    ],
                    [
                      'lit' => 'football',
                    ],
                    [
                      'lit' => 'livescores',
                    ],
                  ],
                  'parts' => [
                    'sport',
                    'football',
                    'livescores',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                      ],
                      [
                        'name' => 'league_id',
                        'orig' => 'leagueId',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'match_id',
                        'orig' => 'matchId',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'livescore',
                    'exist' => [
                      'api_key',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/stats',
                  'segments' => [
                    [
                      'lit' => 'sport',
                    ],
                    [
                      'lit' => 'football',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                  ],
                  'parts' => [
                    'sport',
                    'football',
                    'stats',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                      ],
                      [
                        'name' => 'league_id',
                        'orig' => 'leagueId',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'team_id',
                        'orig' => 'teamId',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'stat',
                    'exist' => [
                      'api_key',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IsportsFeatures::make_feature($name);
    }
}
