# Isports SDK feature factory

from feature.base_feature import IsportsBaseFeature
from feature.test_feature import IsportsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IsportsBaseFeature(),
        "test": lambda: IsportsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
