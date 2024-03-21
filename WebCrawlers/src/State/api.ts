import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEventsResponse, GetFightsResponse, getFightersResponse, getKpisResponse } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["kpis", "fighters", "events", "fights"],
    endpoints: (build) => ({
        getKpis: build.query<getKpisResponse, void>({
            query: () => "kpi/kpis/",
            providesTags: ["kpis"]
        }),
        getFighters: build.query<getFightersResponse, void>({
            query: () => "fighter/fighters/",
            providesTags: ["fighters"]
        }),
        getEvents: build.query<GetEventsResponse, void>({
            query: () => "event/events/",
            providesTags: ["events"]
        }),
        getFights: build.query<GetFightsResponse, void>({
            query: () => "fight/fights/",
            providesTags: ["fights"]
        }),
    })
})

export const { useGetKpisQuery, useGetFightersQuery, useGetEventsQuery, useGetFightsQuery } = api;