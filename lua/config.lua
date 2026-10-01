-- Isports SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Isports",
      slug = "isports",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "http://api.isportsapi.com",
      auth = {
        prefix = "",
        ["in"] = "query",
        name = "api_key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["football"] = {},
      },
    },
    entity = {
      ["football"] = {
        ["fields"] = {
          {
            ["name"] = "schedule",
            ["title"] = "Schedule",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "football",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/stats",
                ["segments"] = {
                  {
                    ["lit"] = "sport",
                  },
                  {
                    ["lit"] = "football",
                  },
                  {
                    ["lit"] = "stats",
                  },
                },
                ["parts"] = {
                  "sport",
                  "football",
                  "stats",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "ycOrrj2NLYdzuOBr",
                    },
                    {
                      ["name"] = "league_id",
                      ["orig"] = "leagueId",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "season",
                      ["orig"] = "season",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "team_id",
                      ["orig"] = "teamId",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "stat",
                  ["exist"] = {
                    "api_key",
                    "league_id",
                    "season",
                    "team_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/livescores",
                ["segments"] = {
                  {
                    ["lit"] = "sport",
                  },
                  {
                    ["lit"] = "football",
                  },
                  {
                    ["lit"] = "livescores",
                  },
                },
                ["parts"] = {
                  "sport",
                  "football",
                  "livescores",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "ycOrrj2NLYdzuOBr",
                    },
                    {
                      ["name"] = "league_id",
                      ["orig"] = "leagueId",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "match_id",
                      ["orig"] = "matchId",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "livescore",
                  ["exist"] = {
                    "api_key",
                    "league_id",
                    "match_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/schedule/basic",
                ["segments"] = {
                  {
                    ["lit"] = "sport",
                  },
                  {
                    ["lit"] = "football",
                  },
                  {
                    ["lit"] = "schedule",
                  },
                  {
                    ["lit"] = "basic",
                  },
                },
                ["parts"] = {
                  "sport",
                  "football",
                  "schedule",
                  "basic",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "ycOrrj2NLYdzuOBr",
                    },
                    {
                      ["name"] = "league_id",
                      ["orig"] = "leagueId",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 1639,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "api_key",
                    "league_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
