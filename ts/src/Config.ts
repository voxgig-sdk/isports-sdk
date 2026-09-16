
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


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
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
              },
              "parts": [
                "sport",
                "football",
                "stats"
              ]
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
              },
              "parts": [
                "sport",
                "football",
                "livescores"
              ]
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
              "select": {
                "exist": [
                  "api_key",
                  "league_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "sport",
                "football",
                "schedule",
                "basic"
              ]
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

