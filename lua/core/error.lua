-- Isports SDK error

local json = require("dkjson")

local IsportsError = {}
IsportsError.__index = IsportsError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function IsportsError.new(code, msg, ctx)
  local self = setmetatable({}, IsportsError)
  self.is_sdk_error = true
  self.sdk = "Isports"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function IsportsError:context()
  return CONTEXT[self]
end


function IsportsError:error()
  return self.msg
end


function IsportsError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function IsportsError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function IsportsError:to_json()
  return json.encode(self:to_table())
end


function IsportsError:__tostring()
  return self.msg
end


function IsportsError.__tojson(self)
  return self:to_json()
end


return IsportsError
