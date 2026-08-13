# Isports SDK utility: make_context

from isports_sdk.core.context import IsportsContext


def make_context_util(ctxmap, basectx):
    return IsportsContext(ctxmap, basectx)
