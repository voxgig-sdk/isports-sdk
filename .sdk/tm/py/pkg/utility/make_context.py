# Isports SDK utility: make_context

from projectname_sdk.core.context import IsportsContext


def make_context_util(ctxmap, basectx):
    return IsportsContext(ctxmap, basectx)
