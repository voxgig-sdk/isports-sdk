import { IsportsEntityBase } from '../IsportsEntityBase';
import type { IsportsSDK } from '../IsportsSDK';
import type { Control } from '../types';
import type { Football, FootballLoadMatch } from '../IsportsTypes';
declare class FootballEntity extends IsportsEntityBase<Football> {
    constructor(client: IsportsSDK, entopts: any);
    make(this: FootballEntity): FootballEntity;
    load(this: any, reqmatch?: FootballLoadMatch, ctrl?: Control): Promise<FootballEntity>;
}
export { FootballEntity };
