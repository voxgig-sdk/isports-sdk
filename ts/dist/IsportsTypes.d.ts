export interface Football {
    schedule?: any[];
}
export interface FootballLoadMatch {
    api_key: string;
    league_id: number;
    $action?: string;
    [action: string]: any;
}
