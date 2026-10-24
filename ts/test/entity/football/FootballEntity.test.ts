

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IsportsSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FootballEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ISPORTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ISPORTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IsportsSDK.test()
    const ent = testsdk.Football()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IsportsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Football().load({"api_key":1,"league_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ISPORTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'football.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"schedule":{"a":true,"h":"Schedule","n":"schedule","r":false,"t":"`$ARRAY`","key$":"schedule","index$":0}},"name":"football","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /sport/football/schedule/basic","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"ycOrrj2NLYdzuOBr","k":"query","n":"api_key","or":"api_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":1639,"k":"query","n":"league_id","or":"leagueId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/sport/football/schedule/basic","q":{"exist":["api_key","league_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sport"},{"lit":"football"},{"lit":"schedule"},{"lit":"basic"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /sport/football/livescores","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"ycOrrj2NLYdzuOBr","k":"query","n":"api_key","or":"api_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"league_id","or":"leagueId","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"match_id","or":"matchId","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/sport/football/livescores","q":{"$action":"livescore","exist":["api_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sport"},{"lit":"football"},{"lit":"livescores"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /sport/football/stats","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"ycOrrj2NLYdzuOBr","k":"query","n":"api_key","or":"api_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"league_id","or":"leagueId","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"season","or":"season","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"team_id","or":"teamId","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/sport/football/stats","q":{"$action":"stat","exist":["api_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"sport"},{"lit":"football"},{"lit":"stats"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"football","name__orig":"football","Name":"Football","name_":"football","name-":"football","NAME":"FOOTBALL","index$":0}, {"active":true,"entity":"football","key$":"BasicFootballFlow","kind":"basic","name":"BasicFootballFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"football_ref01","srcdatavar":"football_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-football_ref01"}}],"index$":0}]}, 'Football', {"GET /sport/football/schedule/basic":{"protocol":"http","parameters":[{"name":"api_key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"example":"ycOrrj2NLYdzuOBr","index$":0},{"name":"leagueId","in":"query","description":"The unique identifier for the football league","required":true,"schema":{"type":"integer"},"example":1639,"index$":1}]},"GET /sport/football/livescores":{"protocol":"http","parameters":[{"name":"api_key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"example":"ycOrrj2NLYdzuOBr","index$":0},{"name":"leagueId","in":"query","description":"Filter by specific league ID","required":false,"schema":{"type":"integer"},"index$":1},{"name":"matchId","in":"query","description":"Filter by specific match ID","required":false,"schema":{"type":"integer"},"index$":2}]},"GET /sport/football/stats":{"protocol":"http","parameters":[{"name":"api_key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"example":"ycOrrj2NLYdzuOBr","index$":0},{"name":"leagueId","in":"query","description":"The unique identifier for the football league","required":false,"schema":{"type":"integer"},"index$":1},{"name":"teamId","in":"query","description":"The unique identifier for the team","required":false,"schema":{"type":"integer"},"index$":2},{"name":"season","in":"query","description":"Season year for statistics","required":false,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let football_ref01_data = Object.values(setup.data.existing.football)[0] as any

    // LOAD
    const football_ref01_ent = client.Football()
    const football_ref01_match_dt0: any = {}
    const football_ref01_data_dt0 = (await football_ref01_ent.load(football_ref01_match_dt0)).data()
    assert(null != football_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/football/FootballTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IsportsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['football01','football02','football03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ISPORTS_TEST_FOOTBALL_ENTID': idmap,
    'ISPORTS_TEST_LIVE': 'FALSE',
    'ISPORTS_TEST_EXPLAIN': 'FALSE',
    'ISPORTS_APIKEY': '',
  })

  idmap = env['ISPORTS_TEST_FOOTBALL_ENTID']

  const live = 'TRUE' === env.ISPORTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ISPORTS_TEST_FOOTBALL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IsportsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
