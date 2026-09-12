import { Context } from './Context';
declare class IsportsError extends Error {
    isIsportsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IsportsError };
