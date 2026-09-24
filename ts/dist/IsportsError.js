"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsportsError = void 0;
class IsportsError extends Error {
    isIsportsError = true;
    sdk = 'Isports';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IsportsError = IsportsError;
//# sourceMappingURL=IsportsError.js.map