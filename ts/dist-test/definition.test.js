"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "football",
        "accessor": "Football",
        "op": "load",
        "method": "GET",
        "path": "/sport/football/schedule/basic",
        "args": [],
        "select": {
            "api_key": "ycOrrj2NLYdzuOBr",
            "league_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "leagueId"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "league_id",
                "wire": "leagueId"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "code": 1,
            "message": "x",
            "data": {
                "schedule": [
                    {
                        "matchId": 1,
                        "leagueId": 1,
                        "homeTeam": "x",
                        "awayTeam": "x",
                        "matchTime": "2026-01-01T00:00:00Z",
                        "status": "x",
                        "score": {
                            "home": 1,
                            "away": 1
                        }
                    }
                ]
            }
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "football",
        "accessor": "Football",
        "op": "load",
        "method": "GET",
        "path": "/sport/football/livescores",
        "action": "livescore",
        "args": [],
        "select": {
            "api_key": "ycOrrj2NLYdzuOBr",
            "match_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "leagueId",
            "matchId"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "match_id",
                "wire": "matchId"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "code": 1,
            "message": "x",
            "data": {
                "matches": [
                    {
                        "matchId": 1,
                        "leagueId": 1,
                        "leagueName": "x",
                        "homeTeam": {
                            "teamId": 1,
                            "teamName": "x",
                            "logo": "x"
                        },
                        "awayTeam": {
                            "teamId": 1,
                            "teamName": "x",
                            "logo": "x"
                        },
                        "score": {
                            "home": 1,
                            "away": 1
                        },
                        "matchTime": "2026-01-01T00:00:00Z",
                        "status": "scheduled",
                        "minute": 1,
                        "events": [
                            {
                                "eventType": "goal",
                                "minute": 1,
                                "player": "x",
                                "team": "x"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "football",
        "accessor": "Football",
        "op": "load",
        "method": "GET",
        "path": "/sport/football/stats",
        "action": "stat",
        "args": [],
        "select": {
            "api_key": "ycOrrj2NLYdzuOBr",
            "season": "v1",
            "team_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "api_key",
            "leagueId",
            "teamId",
            "season"
        ],
        "queryArgs": [
            {
                "name": "api_key",
                "wire": "api_key"
            },
            {
                "name": "season",
                "wire": "season"
            },
            {
                "name": "team_id",
                "wire": "teamId"
            }
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "code": 1,
            "message": "x",
            "data": {
                "stats": {
                    "teamStats": {
                        "matchesPlayed": 1,
                        "wins": 1,
                        "draws": 1,
                        "losses": 1,
                        "goalsFor": 1,
                        "goalsAgainst": 1,
                        "points": 1
                    },
                    "playerStats": [
                        {
                            "playerId": 1,
                            "playerName": "x",
                            "goals": 1,
                            "assists": 1,
                            "appearances": 1
                        }
                    ]
                }
            }
        },
        "idField": "id",
        "ownQuery": "api_key"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map