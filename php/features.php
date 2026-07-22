<?php
declare(strict_types=1);

// Isports SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IsportsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IsportsBaseFeature();
            case "test":
                return new IsportsTestFeature();
            default:
                return new IsportsBaseFeature();
        }
    }
}
