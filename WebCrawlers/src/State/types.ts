export interface GetEventsResponse {
    id: string;
    Event_Name: string;
    Event_Date: string;
    Red_Fighter_images: string,
    Blue_Fighter_images: string,
}

export interface GetFightsResponse{
    ID: string,
    Event_Card: string,
    Event_Weight: string,
    Red_Event_fighter_image: string,
    Red__Fighter_Name: string,
    Blue__Fighter_Name: string,
    Blue_Event_fighter_image: string
}