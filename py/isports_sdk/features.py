# Isports SDK feature factory

from isports_sdk.feature.base_feature import IsportsBaseFeature
from isports_sdk.feature.test_feature import IsportsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IsportsBaseFeature(),
        "test": lambda: IsportsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
