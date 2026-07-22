package core

type IsportsError struct {
	IsIsportsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIsportsError(code string, msg string, ctx *Context) *IsportsError {
	return &IsportsError{
		IsIsportsError: true,
		Sdk:              "Isports",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IsportsError) Error() string {
	return e.Msg
}
