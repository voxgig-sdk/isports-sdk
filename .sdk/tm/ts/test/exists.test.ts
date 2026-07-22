
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IsportsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IsportsSDK.test()
    equal(null !== testsdk, true)
  })

})
