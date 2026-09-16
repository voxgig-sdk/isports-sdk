# Isports SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IsportsFeatures
  def self.make_feature(name)
    case name
    when "base"
      IsportsBaseFeature.new
    when "ratelimit"
      IsportsRatelimitFeature.new
    when "retry"
      IsportsRetryFeature.new
    when "test"
      IsportsTestFeature.new
    when "timeout"
      IsportsTimeoutFeature.new
    else
      IsportsBaseFeature.new
    end
  end
end
