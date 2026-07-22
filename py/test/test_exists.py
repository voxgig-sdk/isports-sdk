# ProjectName SDK exists test

import pytest
from isports_sdk import IsportsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IsportsSDK.test(None, None)
        assert testsdk is not None
