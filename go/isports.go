package voxgigisportssdk

import (
	"github.com/voxgig-sdk/isports-sdk/go/core"
	"github.com/voxgig-sdk/isports-sdk/go/entity"
	"github.com/voxgig-sdk/isports-sdk/go/feature"
	_ "github.com/voxgig-sdk/isports-sdk/go/utility"
)

// Type aliases preserve external API.
type IsportsSDK = core.IsportsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IsportsEntity = core.IsportsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IsportsError = core.IsportsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFootballEntityFunc = func(client *core.IsportsSDK, entopts map[string]any) core.IsportsEntity {
		return entity.NewFootballEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIsportsSDK = core.NewIsportsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIsportsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IsportsSDK  { return NewIsportsSDK(nil) }
func Test() *IsportsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
