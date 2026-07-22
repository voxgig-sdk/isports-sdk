<?php
declare(strict_types=1);

// Isports SDK exists test

require_once __DIR__ . '/../isports_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IsportsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
