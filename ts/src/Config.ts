
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "http://api.isportsapi.com",

    auth: {
      prefix: '',
      in: 'query',
      name: 'api_key',
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
          "name": "schedule",
          "title": "Schedule",
          "type": "`$ARRAY`"
        }
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
                  "lit": "sport"
                },
                {
                  "lit": "football"
                },
                {
                  "lit": "stats"
                }
              ],
              "parts": [
                "sport",
                "football",
                "stats"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ycOrrj2NLYdzuOBr"
                  },
                  {
                    "name": "league_id",
                    "orig": "league_id",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "season",
                    "orig": "season",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "team_id",
                    "orig": "team_id",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "$action": "stat",
                "exist": [
                  "api_key",
                  "league_id",
                  "season",
                  "team_id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/sport/football/livescores",
              "segments": [
                {
                  "lit": "sport"
                },
                {
                  "lit": "football"
                },
                {
                  "lit": "livescores"
                }
              ],
              "parts": [
                "sport",
                "football",
                "livescores"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ycOrrj2NLYdzuOBr"
                  },
                  {
                    "name": "league_id",
                    "orig": "league_id",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "match_id",
                    "orig": "match_id",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "$action": "livescore",
                "exist": [
                  "api_key",
                  "league_id",
                  "match_id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/sport/football/schedule/basic",
              "segments": [
                {
                  "lit": "sport"
                },
                {
                  "lit": "football"
                },
                {
                  "lit": "schedule"
                },
                {
                  "lit": "basic"
                }
              ],
              "parts": [
                "sport",
                "football",
                "schedule",
                "basic"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "api_key",
                    "orig": "api_key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ycOrrj2NLYdzuOBr"
                  },
                  {
                    "name": "league_id",
                    "orig": "league_id",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true,
                    "example": 1639
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "league_id"
                ]
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
  config,
  FEATURE_PLUGINS,
}

