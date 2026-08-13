// Typed models for the Isports SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Football {
  matches?: any[]
  schedule?: any[]
  stats?: Record<string, any>
}

export interface FootballLoadMatch {
  matches?: any[]
  schedule?: any[]
  stats?: Record<string, any>

  // Selects a custom action instead of the plain load:
  //   'livescore' | 'stat'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

