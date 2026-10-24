# Isports SDK utility: prepare_body
require_relative 'media'
module IsportsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IsportsUtilities.raw_body(ctx.reqdata) if IsportsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
