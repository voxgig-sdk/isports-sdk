<?php
declare(strict_types=1);

// Isports SDK base feature

class IsportsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IsportsContext $ctx, array $options): void {}
    public function PostConstruct(IsportsContext $ctx): void {}
    public function PostConstructEntity(IsportsContext $ctx): void {}
    public function SetData(IsportsContext $ctx): void {}
    public function GetData(IsportsContext $ctx): void {}
    public function GetMatch(IsportsContext $ctx): void {}
    public function SetMatch(IsportsContext $ctx): void {}
    public function PrePoint(IsportsContext $ctx): void {}
    public function PreSpec(IsportsContext $ctx): void {}
    public function PreRequest(IsportsContext $ctx): void {}
    public function PreResponse(IsportsContext $ctx): void {}
    public function PreResult(IsportsContext $ctx): void {}
    public function PreDone(IsportsContext $ctx): void {}
    public function PreUnexpected(IsportsContext $ctx): void {}
}
