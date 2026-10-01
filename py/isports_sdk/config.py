# Isports SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Isports",
            "slug": "isports",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "http://api.isportsapi.com",
            "auth": {
                "prefix": "",
                "in": "query",
                "name": "api_key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "football": {},
            },
        },
        "entity": {
      "football": {
        "fields": [
          {
            "name": "schedule",
            "title": "Schedule",
            "type": "`$ARRAY`",
          },
        ],
        "name": "football",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/stats",
                "segments": [
                  {
                    "lit": "sport",
                  },
                  {
                    "lit": "football",
                  },
                  {
                    "lit": "stats",
                  },
                ],
                "parts": [
                  "sport",
                  "football",
                  "stats",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "ycOrrj2NLYdzuOBr",
                    },
                    {
                      "name": "league_id",
                      "orig": "leagueId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "season",
                      "orig": "season",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "team_id",
                      "orig": "teamId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "stat",
                  "exist": [
                    "api_key",
                    "league_id",
                    "season",
                    "team_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/livescores",
                "segments": [
                  {
                    "lit": "sport",
                  },
                  {
                    "lit": "football",
                  },
                  {
                    "lit": "livescores",
                  },
                ],
                "parts": [
                  "sport",
                  "football",
                  "livescores",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "ycOrrj2NLYdzuOBr",
                    },
                    {
                      "name": "league_id",
                      "orig": "leagueId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "match_id",
                      "orig": "matchId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "livescore",
                  "exist": [
                    "api_key",
                    "league_id",
                    "match_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/schedule/basic",
                "segments": [
                  {
                    "lit": "sport",
                  },
                  {
                    "lit": "football",
                  },
                  {
                    "lit": "schedule",
                  },
                  {
                    "lit": "basic",
                  },
                ],
                "parts": [
                  "sport",
                  "football",
                  "schedule",
                  "basic",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "api_key",
                      "orig": "api_key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "ycOrrj2NLYdzuOBr",
                    },
                    {
                      "name": "league_id",
                      "orig": "leagueId",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1639,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "api_key",
                    "league_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
