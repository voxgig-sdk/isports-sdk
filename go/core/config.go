package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Isports",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "http://api.isportsapi.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"football": map[string]any{},
			},
		},
		"entity": map[string]any{
			"football": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "matches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "schedule",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "stats",
						"type": "`$OBJECT`",
					},
				},
				"name": "football",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "season",
											"orig": "season",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "team_id",
											"orig": "team_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sport/football/stats",
								"parts": []any{
									"sport",
									"football",
									"stats",
								},
								"select": map[string]any{
									"$action": "stat",
									"exist": []any{
										"api_key",
										"league_id",
										"season",
										"team_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "match_id",
											"orig": "match_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sport/football/livescores",
								"parts": []any{
									"sport",
									"football",
									"livescores",
								},
								"select": map[string]any{
									"$action": "livescore",
									"exist": []any{
										"api_key",
										"league_id",
										"match_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1639,
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sport/football/schedule/basic",
								"parts": []any{
									"sport",
									"football",
									"schedule",
									"basic",
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"league_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
