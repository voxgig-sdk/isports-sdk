<?php
declare(strict_types=1);

// Isports SDK configuration

class IsportsConfig
{
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
              'active' => true,
              'name' => 'matches',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'schedule',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'stats',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
          ],
          'name' => 'football',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'league_id',
                        'orig' => 'league_id',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'season',
                        'orig' => 'season',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'team_id',
                        'orig' => 'team_id',
                        'reqd' => false,
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
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'league_id',
                        'orig' => 'league_id',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'match_id',
                        'orig' => 'match_id',
                        'reqd' => false,
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
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'ycOrrj2NLYdzuOBr',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
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
                  'index$' => 2,
                ],
              ],
              'key$' => 'load',
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
