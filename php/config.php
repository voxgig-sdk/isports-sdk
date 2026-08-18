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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "http://api.isportsapi.com",
                "auth" => [
                    "prefix" => "",
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
              'name' => 'matches',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'schedule',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'stats',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'football',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'league_id',
                        'orig' => 'league_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'team_id',
                        'orig' => 'team_id',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/stats',
                  'parts' => [
                    'sport',
                    'football',
                    'stats',
                  ],
                  'select' => [
                    '$action' => 'stat',
                    'exist' => [
                      'api_key',
                      'league_id',
                      'season',
                      'team_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'league_id',
                        'orig' => 'league_id',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'match_id',
                        'orig' => 'match_id',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/livescores',
                  'parts' => [
                    'sport',
                    'football',
                    'livescores',
                  ],
                  'select' => [
                    '$action' => 'livescore',
                    'exist' => [
                      'api_key',
                      'league_id',
                      'match_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1639,
                        'kind' => 'query',
                        'name' => 'league_id',
                        'orig' => 'league_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sport/football/schedule/basic',
                  'parts' => [
                    'sport',
                    'football',
                    'schedule',
                    'basic',
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'league_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
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
