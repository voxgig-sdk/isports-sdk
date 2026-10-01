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
        "path": "/sport/football/stats",
        "action": "stat",
        "args": [],
        "select": {
            "api_key": "ycOrrj2NLYdzuOBr",
            "league_id": "v1",
            "season": "v1",
            "team_id": "v1"
        },
        "headers": [],
        "query": [
            "api_key",
            "leagueId",
            "teamId",
            "season"
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
                    "playerStats": [
                        {
                            "appearances": 1,
                            "assists": 1,
                            "goals": 1,
                            "playerId": 1,
                            "playerName": "x"
                        }
                    ],
                    "teamStats": {
                        "draws": 1,
                        "goalsAgainst": 1,
                        "goalsFor": 1,
                        "losses": 1,
                        "matchesPlayed": 1,
                        "points": 1,
                        "wins": 1
                    }
                }
            }
        },
        "idField": "id"
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
            "league_id": "v1",
            "match_id": "v1"
        },
        "headers": [],
        "query": [
            "api_key",
            "leagueId",
            "matchId"
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
                        "awayTeam": {
                            "logo": "x",
                            "teamId": 1,
                            "teamName": "x"
                        },
                        "events": [
                            {
                                "eventType": "goal",
                                "minute": 1,
                                "player": "x",
                                "team": "x"
                            }
                        ],
                        "homeTeam": {
                            "logo": "x",
                            "teamId": 1,
                            "teamName": "x"
                        },
                        "leagueId": 1,
                        "leagueName": "x",
                        "matchId": 1,
                        "matchTime": "2026-01-01T00:00:00Z",
                        "minute": 1,
                        "score": {
                            "away": 1,
                            "home": 1
                        },
                        "status": "scheduled"
                    }
                ]
            }
        },
        "idField": "id"
    },
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
        "query": [
            "api_key",
            "leagueId"
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
                        "awayTeam": "x",
                        "homeTeam": "x",
                        "leagueId": 1,
                        "matchId": 1,
                        "matchTime": "2026-01-01T00:00:00Z",
                        "score": {
                            "away": 1,
                            "home": 1
                        },
                        "status": "x"
                    }
                ]
            }
        },
        "idField": "id"
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