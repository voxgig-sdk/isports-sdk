
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IsportsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IsportsSDK.test()
    equal(testsdk instanceof IsportsSDK, true,
      'IsportsSDK.test() must return a client synchronously')
  })

})
