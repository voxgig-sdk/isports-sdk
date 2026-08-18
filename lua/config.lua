-- Isports SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Isports",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "http://api.isportsapi.com",
      auth = {
        prefix = "",
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
            ["name"] = "matches",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "schedule",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "stats",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "football",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "ycOrrj2NLYdzuOBr",
                      ["kind"] = "query",
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "league_id",
                      ["orig"] = "league_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "season",
                      ["orig"] = "season",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "team_id",
                      ["orig"] = "team_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/stats",
                ["parts"] = {
                  "sport",
                  "football",
                  "stats",
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "ycOrrj2NLYdzuOBr",
                      ["kind"] = "query",
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "league_id",
                      ["orig"] = "league_id",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "match_id",
                      ["orig"] = "match_id",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/livescores",
                ["parts"] = {
                  "sport",
                  "football",
                  "livescores",
                },
                ["select"] = {
                  ["$action"] = "livescore",
                  ["exist"] = {
                    "api_key",
                    "league_id",
                    "match_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "ycOrrj2NLYdzuOBr",
                      ["kind"] = "query",
                      ["name"] = "api_key",
                      ["orig"] = "api_key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1639,
                      ["kind"] = "query",
                      ["name"] = "league_id",
                      ["orig"] = "league_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/sport/football/schedule/basic",
                ["parts"] = {
                  "sport",
                  "football",
                  "schedule",
                  "basic",
                },
                ["select"] = {
                  ["exist"] = {
                    "api_key",
                    "league_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
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
