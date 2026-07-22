# Isports SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IsportsFeatures
  def self.make_feature(name)
    case name
    when "base"
      IsportsBaseFeature.new
    when "test"
      IsportsTestFeature.new
    else
      IsportsBaseFeature.new
    end
  end
end
