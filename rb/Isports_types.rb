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
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
Football = Struct.new(
  :code,
  :data,
  :message,
  keyword_init: true
)

# Request payload for Football#load.
#
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
FootballLoadMatch = Struct.new(
  :code,
  :data,
  :message,
  keyword_init: true
)

