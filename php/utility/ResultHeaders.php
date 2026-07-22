<?php
declare(strict_types=1);

// Isports SDK utility: result_headers

class IsportsResultHeaders
{
    public static function call(IsportsContext $ctx): ?IsportsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
