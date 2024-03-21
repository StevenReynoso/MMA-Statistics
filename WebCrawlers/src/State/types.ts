export interface GetEventsResponse {
    id: string;
    Event_Name: string;
    Event_Date: string;
    Red_Fighter_images: string,
    Blue_Fighter_images: string,
}

export interface GetFightsResponse{
    ID: string,
    Fight_Num: number,
    Event_Card: string,
    Event_Weight: string,
    Red_Event_fighter_image: string,
    Red__Fighter_Name: string,
    Red_Fighter_Nickname: string,
    Blue__Fighter_Name: string,
    Blue_Fighter_Nickname: string,
    Blue_Event_fighter_image: string
}

export interface getFightersResponse{
    Fighter_ID: number 
    First: string,
    Last: string,
    Nickname: string,
    Ht : number | string,
    Wt : number | string,
    Reach: string,
    Stance: string,
    Weight_Class: string
}

export interface getKpisResponse{
    Fighter_ID: number, 
    W: number,
    L: number,
    D: number,
    Belt: number,
    SLpM: number,               
    "Str.Acc": number,
    SApM: number,
    "Str.Def": number
    "TD Avg": number,
    "TD Acc": number,
    "TD Def": number,
    "Sub Avg": number,
    "Total Fights": number,
}