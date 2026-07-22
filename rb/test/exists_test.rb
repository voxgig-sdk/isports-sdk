# Isports SDK exists test

require "minitest/autorun"
require_relative "../Isports_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IsportsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
