# Isports SDK utility: make_context
require_relative '../core/context'
module IsportsUtilities
  MakeContext = ->(ctxmap, basectx) {
    IsportsContext.new(ctxmap, basectx)
  }
end
