# Isports SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "http://api.isportsapi.com",
            "auth": {
                "prefix": "",
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
            "name": "matches",
            "type": "`$ARRAY`",
          },
          {
            "name": "schedule",
            "type": "`$ARRAY`",
          },
          {
            "name": "stats",
            "type": "`$OBJECT`",
          },
        ],
        "name": "football",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "league_id",
                      "orig": "league_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "season",
                      "orig": "season",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "team_id",
                      "orig": "team_id",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/stats",
                "parts": [
                  "sport",
                  "football",
                  "stats",
                ],
                "select": {
                  "$action": "stat",
                  "exist": [
                    "api_key",
                    "league_id",
                    "season",
                    "team_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "league_id",
                      "orig": "league_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "match_id",
                      "orig": "match_id",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/livescores",
                "parts": [
                  "sport",
                  "football",
                  "livescores",
                ],
                "select": {
                  "$action": "livescore",
                  "exist": [
                    "api_key",
                    "league_id",
                    "match_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1639,
                      "kind": "query",
                      "name": "league_id",
                      "orig": "league_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sport/football/schedule/basic",
                "parts": [
                  "sport",
                  "football",
                  "schedule",
                  "basic",
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "league_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
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
