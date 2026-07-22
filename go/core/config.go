package core

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
						"active": true,
						"name": "code",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "message",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "football",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "season",
											"orig": "season",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "team_id",
											"orig": "team_id",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "match_id",
											"orig": "match_id",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "ycOrrj2NLYdzuOBr",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 1639,
											"kind": "query",
											"name": "league_id",
											"orig": "league_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 2,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
