"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FootballEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ISPORTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ISPORTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IsportsSDK.test();
        const ent = testsdk.Football();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ISPORTS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'football.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "matches", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "schedule", "req": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "stats", "req": false, "type": "`$OBJECT`", "index$": 2 }], "name": "football", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "ycOrrj2NLYdzuOBr", "kind": "query", "name": "api_key", "orig": "api_key", "reqd": true, "type": "`$STRING`" }, { "active": true, "kind": "query", "name": "league_id", "orig": "league_id", "reqd": false, "type": "`$INTEGER`" }, { "active": true, "kind": "query", "name": "season", "orig": "season", "reqd": false, "type": "`$STRING`" }, { "active": true, "kind": "query", "name": "team_id", "orig": "team_id", "reqd": false, "type": "`$INTEGER`" }] }, "contract": { "id": "GET /sport/football/stats", "json": "{\"operationId\":\"getFootballStats\",\"parameters\":[{\"description\":\"API key for authentication\",\"example\":\"ycOrrj2NLYdzuOBr\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique identifier for the football league\",\"in\":\"query\",\"name\":\"leagueId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The unique identifier for the team\",\"in\":\"query\",\"name\":\"teamId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Season year for statistics\",\"in\":\"query\",\"name\":\"season\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Response status code\",\"type\":\"integer\"},\"data\":{\"properties\":{\"stats\":{\"properties\":{\"playerStats\":{\"items\":{\"properties\":{\"appearances\":{\"type\":\"integer\"},\"assists\":{\"type\":\"integer\"},\"goals\":{\"type\":\"integer\"},\"playerId\":{\"type\":\"integer\"},\"playerName\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"teamStats\":{\"properties\":{\"draws\":{\"type\":\"integer\"},\"goalsAgainst\":{\"type\":\"integer\"},\"goalsFor\":{\"type\":\"integer\"},\"losses\":{\"type\":\"integer\"},\"matchesPlayed\":{\"type\":\"integer\"},\"points\":{\"type\":\"integer\"},\"wins\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"},\"message\":{\"description\":\"Response message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with football statistics data\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"description\":\"Unauthorized - Invalid API key\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for authentication. You can obtain your API key from the iSports API dashboard.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sport/football/stats", "segments": [{ "lit": "sport" }, { "lit": "football" }, { "lit": "stats" }], "select": { "$action": "stat", "exist": ["api_key", "league_id", "season", "team_id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "ycOrrj2NLYdzuOBr", "kind": "query", "name": "api_key", "orig": "api_key", "reqd": true, "type": "`$STRING`" }, { "active": true, "kind": "query", "name": "league_id", "orig": "league_id", "reqd": false, "type": "`$INTEGER`" }, { "active": true, "kind": "query", "name": "match_id", "orig": "match_id", "reqd": false, "type": "`$INTEGER`" }] }, "contract": { "id": "GET /sport/football/livescores", "json": "{\"operationId\":\"getFootballLiveScores\",\"parameters\":[{\"description\":\"API key for authentication\",\"example\":\"ycOrrj2NLYdzuOBr\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by specific league ID\",\"in\":\"query\",\"name\":\"leagueId\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by specific match ID\",\"in\":\"query\",\"name\":\"matchId\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Response status code\",\"type\":\"integer\"},\"data\":{\"properties\":{\"matches\":{\"items\":{\"properties\":{\"awayTeam\":{\"properties\":{\"logo\":{\"type\":\"string\"},\"teamId\":{\"type\":\"integer\"},\"teamName\":{\"type\":\"string\"}},\"type\":\"object\"},\"events\":{\"description\":\"Live match events\",\"items\":{\"properties\":{\"eventType\":{\"enum\":[\"goal\",\"yellow_card\",\"red_card\",\"substitution\"],\"type\":\"string\"},\"minute\":{\"type\":\"integer\"},\"player\":{\"type\":\"string\"},\"team\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"homeTeam\":{\"properties\":{\"logo\":{\"type\":\"string\"},\"teamId\":{\"type\":\"integer\"},\"teamName\":{\"type\":\"string\"}},\"type\":\"object\"},\"leagueId\":{\"description\":\"League identifier\",\"type\":\"integer\"},\"leagueName\":{\"description\":\"League name\",\"type\":\"string\"},\"matchId\":{\"description\":\"Unique match identifier\",\"type\":\"integer\"},\"matchTime\":{\"description\":\"Match start time\",\"format\":\"date-time\",\"type\":\"string\"},\"minute\":{\"description\":\"Current match minute\",\"type\":\"integer\"},\"score\":{\"properties\":{\"away\":{\"type\":\"integer\"},\"home\":{\"type\":\"integer\"}},\"type\":\"object\"},\"status\":{\"description\":\"Match status (e.g., live, halftime, finished)\",\"enum\":[\"scheduled\",\"live\",\"halftime\",\"finished\",\"postponed\",\"cancelled\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"message\":{\"description\":\"Response message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with live football scores\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"description\":\"Unauthorized - Invalid API key\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for authentication. You can obtain your API key from the iSports API dashboard.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sport/football/livescores", "segments": [{ "lit": "sport" }, { "lit": "football" }, { "lit": "livescores" }], "select": { "$action": "livescore", "exist": ["api_key", "league_id", "match_id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": "ycOrrj2NLYdzuOBr", "kind": "query", "name": "api_key", "orig": "api_key", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1639, "kind": "query", "name": "league_id", "orig": "league_id", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /sport/football/schedule/basic", "json": "{\"operationId\":\"getFootballSchedule\",\"parameters\":[{\"description\":\"API key for authentication\",\"example\":\"ycOrrj2NLYdzuOBr\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The unique identifier for the football league\",\"example\":1639,\"in\":\"query\",\"name\":\"leagueId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Response status code\",\"type\":\"integer\"},\"data\":{\"properties\":{\"schedule\":{\"items\":{\"properties\":{\"awayTeam\":{\"description\":\"Away team name\",\"type\":\"string\"},\"homeTeam\":{\"description\":\"Home team name\",\"type\":\"string\"},\"leagueId\":{\"description\":\"League identifier\",\"type\":\"integer\"},\"matchId\":{\"description\":\"Unique match identifier\",\"type\":\"integer\"},\"matchTime\":{\"description\":\"Match date and time\",\"format\":\"date-time\",\"type\":\"string\"},\"score\":{\"properties\":{\"away\":{\"type\":\"integer\"},\"home\":{\"type\":\"integer\"}},\"type\":\"object\"},\"status\":{\"description\":\"Match status\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"message\":{\"description\":\"Response message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with football schedule and results data\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"description\":\"Unauthorized - Invalid API key\"},\"404\":{\"description\":\"Not found - League not found\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for authentication. You can obtain your API key from the iSports API dashboard.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sport/football/schedule/basic", "segments": [{ "lit": "sport" }, { "lit": "football" }, { "lit": "schedule" }, { "lit": "basic" }], "select": { "exist": ["api_key", "league_id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "football", "name__orig": "football", "Name": "Football", "name_": "football", "name-": "football", "NAME": "FOOTBALL", "index$": 0 }, { "active": true, "entity": "football", "key$": "BasicFootballFlow", "kind": "basic", "name": "BasicFootballFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "football_ref01", "srcdatavar": "football_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-football_ref01" } }], "index$": 0 }] }, 'Football');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let football_ref01_data = Object.values(setup.data.existing.football)[0];
        // LOAD
        const football_ref01_ent = client.Football();
        const football_ref01_match_dt0 = {};
        const football_ref01_data_dt0 = (await football_ref01_ent.load(football_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != football_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/football/FootballTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IsportsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['football01', 'football02', 'football03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ISPORTS_TEST_FOOTBALL_ENTID': idmap,
        'ISPORTS_TEST_LIVE': 'FALSE',
        'ISPORTS_TEST_EXPLAIN': 'FALSE',
        'ISPORTS_APIKEY': '',
    });
    idmap = env['ISPORTS_TEST_FOOTBALL_ENTID'];
    const live = 'TRUE' === env.ISPORTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ISPORTS_TEST_FOOTBALL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IsportsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ISPORTS_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ISPORTS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=FootballEntity.test.js.map