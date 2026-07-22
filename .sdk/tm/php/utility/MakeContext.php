<?php
declare(strict_types=1);

// Isports SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IsportsMakeContext
{
    public static function call(array $ctxmap, ?IsportsContext $basectx): IsportsContext
    {
        return new IsportsContext($ctxmap, $basectx);
    }
}
