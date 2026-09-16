# Isports SDK feature factory

from isports_sdk.feature.base_feature import IsportsBaseFeature
from isports_sdk.feature.ratelimit_feature import IsportsRatelimitFeature
from isports_sdk.feature.retry_feature import IsportsRetryFeature
from isports_sdk.feature.test_feature import IsportsTestFeature
from isports_sdk.feature.timeout_feature import IsportsTimeoutFeature


_FEATURES = {
    "base": lambda: IsportsBaseFeature(),
    "ratelimit": lambda: IsportsRatelimitFeature(),
    "retry": lambda: IsportsRetryFeature(),
    "test": lambda: IsportsTestFeature(),
    "timeout": lambda: IsportsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
