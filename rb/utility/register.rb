# Isports SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IsportsUtility.registrar = ->(u) {
  u.clean = IsportsUtilities::Clean
  u.done = IsportsUtilities::Done
  u.make_error = IsportsUtilities::MakeError
  u.feature_add = IsportsUtilities::FeatureAdd
  u.feature_hook = IsportsUtilities::FeatureHook
  u.feature_init = IsportsUtilities::FeatureInit
  u.fetcher = IsportsUtilities::Fetcher
  u.make_fetch_def = IsportsUtilities::MakeFetchDef
  u.make_context = IsportsUtilities::MakeContext
  u.make_options = IsportsUtilities::MakeOptions
  u.make_request = IsportsUtilities::MakeRequest
  u.make_response = IsportsUtilities::MakeResponse
  u.make_result = IsportsUtilities::MakeResult
  u.make_point = IsportsUtilities::MakePoint
  u.make_spec = IsportsUtilities::MakeSpec
  u.make_url = IsportsUtilities::MakeUrl
  u.param = IsportsUtilities::Param
  u.prepare_auth = IsportsUtilities::PrepareAuth
  u.prepare_body = IsportsUtilities::PrepareBody
  u.prepare_headers = IsportsUtilities::PrepareHeaders
  u.prepare_method = IsportsUtilities::PrepareMethod
  u.prepare_params = IsportsUtilities::PrepareParams
  u.prepare_path = IsportsUtilities::PreparePath
  u.prepare_query = IsportsUtilities::PrepareQuery
  u.result_basic = IsportsUtilities::ResultBasic
  u.result_body = IsportsUtilities::ResultBody
  u.result_headers = IsportsUtilities::ResultHeaders
  u.transform_request = IsportsUtilities::TransformRequest
  u.transform_response = IsportsUtilities::TransformResponse
}
