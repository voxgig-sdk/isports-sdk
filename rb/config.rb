# Isports SDK configuration

module IsportsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Isports",
        "slug" => "isports",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "http://api.isportsapi.com",
        "auth" => {
          "prefix" => "",
          "in" => "query",
          "name" => "api_key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "football" => {},
        },
      },
      "entity" => {
        "football" => {
          "fields" => [
            {
              "name" => "schedule",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "football",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "ycOrrj2NLYdzuOBr",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "league_id",
                        "orig" => "league_id",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "season",
                        "orig" => "season",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "team_id",
                        "orig" => "team_id",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sport/football/stats",
                  "segments" => [
                    {
                      "lit" => "sport",
                    },
                    {
                      "lit" => "football",
                    },
                    {
                      "lit" => "stats",
                    },
                  ],
                  "select" => {
                    "$action" => "stat",
                    "exist" => [
                      "api_key",
                      "league_id",
                      "season",
                      "team_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "sport",
                    "football",
                    "stats",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "ycOrrj2NLYdzuOBr",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "league_id",
                        "orig" => "league_id",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "match_id",
                        "orig" => "match_id",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sport/football/livescores",
                  "segments" => [
                    {
                      "lit" => "sport",
                    },
                    {
                      "lit" => "football",
                    },
                    {
                      "lit" => "livescores",
                    },
                  ],
                  "select" => {
                    "$action" => "livescore",
                    "exist" => [
                      "api_key",
                      "league_id",
                      "match_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "sport",
                    "football",
                    "livescores",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "ycOrrj2NLYdzuOBr",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1639,
                        "kind" => "query",
                        "name" => "league_id",
                        "orig" => "league_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sport/football/schedule/basic",
                  "segments" => [
                    {
                      "lit" => "sport",
                    },
                    {
                      "lit" => "football",
                    },
                    {
                      "lit" => "schedule",
                    },
                    {
                      "lit" => "basic",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "api_key",
                      "league_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "sport",
                    "football",
                    "schedule",
                    "basic",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IsportsFeatures.make_feature(name)
  end
end
