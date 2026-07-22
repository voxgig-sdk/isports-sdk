<?php
declare(strict_types=1);

// Isports SDK utility: result_body

class IsportsResultBody
{
    public static function call(IsportsContext $ctx): ?IsportsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
