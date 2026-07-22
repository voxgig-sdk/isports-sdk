<?php
declare(strict_types=1);

// Isports SDK utility: prepare_body

class IsportsPrepareBody
{
    public static function call(IsportsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
