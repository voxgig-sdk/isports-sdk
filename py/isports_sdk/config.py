# Isports SDK configuration


def make_config():
    return {
        "main": {
            "name": "Isports",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "matches",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "schedule",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "stats",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
        ],
        "name": "football",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "league_id",
                      "orig": "league_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "season",
                      "orig": "season",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "team_id",
                      "orig": "team_id",
                      "reqd": False,
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "league_id",
                      "orig": "league_id",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "match_id",
                      "orig": "match_id",
                      "reqd": False,
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
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "ycOrrj2NLYdzuOBr",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
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
                "index$": 2,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
