-- Isports SDK error

local IsportsError = {}
IsportsError.__index = IsportsError


function IsportsError.new(code, msg, ctx)
  local self = setmetatable({}, IsportsError)
  self.is_sdk_error = true
  self.sdk = "Isports"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IsportsError:error()
  return self.msg
end


function IsportsError:__tostring()
  return self.msg
end


return IsportsError
