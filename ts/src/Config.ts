
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Isports',
        slug: "isports",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "http://api.isportsapi.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      football: {
      },

    }
  }


  entity = {
    "football": {
      "fields": [
        {
          "name": "matches",
          "type": "`$ARRAY`"
        },
        {
          "name": "schedule",
          "type": "`$ARRAY`"
        },
        {
          "name": "stats",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "league_id",
                    "orig": "league_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "season",
                    "orig": "season",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "team_id",
                    "orig": "team_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/sport/football/stats",
              "parts": [
                "sport",
                "football",
                "stats"
              ],
              "select": {
                "$action": "stat",
                "exist": [
                  "api_key",
                  "league_id",
                  "season",
                  "team_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "ycOrrj2NLYdzuOBr",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "league_id",
                    "orig": "league_id",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "match_id",
                    "orig": "match_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/sport/football/livescores",
              "parts": [
                "sport",
                "football",
                "livescores"
              ],
              "select": {
                "$action": "livescore",
                "exist": [
                  "api_key",
                  "league_id",
                  "match_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "ycOrrj2NLYdzuOBr",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1639,
                    "kind": "query",
                    "name": "league_id",
                    "orig": "league_id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/sport/football/schedule/basic",
              "parts": [
                "sport",
                "football",
                "schedule",
                "basic"
              ],
              "select": {
                "exist": [
                  "api_key",
                  "league_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

