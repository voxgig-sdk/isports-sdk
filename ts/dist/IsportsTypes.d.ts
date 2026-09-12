export interface Football {
    matches?: any[];
    schedule?: any[];
    stats?: Record<string, any>;
}
export interface FootballLoadMatch {
    api_key: string;
    league_id: number;
    $action?: string;
    [action: string]: any;
}
