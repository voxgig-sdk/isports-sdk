# frozen_string_literal: true

# Typed models for the Isports SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Football entity data model.
#
# @!attribute [rw] schedule
#   @return [Array, nil]
Football = Struct.new(
  :schedule,
  keyword_init: true
)

# Request payload for Football#load.
#
# @!attribute [rw] api_key
#   @return [String]
#
# @!attribute [rw] league_id
#   @return [Integer]
FootballLoadMatch = Struct.new(
  :api_key,
  :league_id,
  keyword_init: true
)

