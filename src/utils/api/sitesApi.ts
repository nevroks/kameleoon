import axios from "axios";

export interface Site {
    id: number;
    url: string;
}


export const sitesApi = {
    api: axios.create({
        baseURL: `${import.meta.env.VITE_YOUR_BACKEND_URL}/sites`
    }),
    getSites: async function () {
        const { data } = await this.api.get<Site[]>('')
        return data
    },
    getSitesById: async function (id: string) {
        const { data } = await this.api.get<Site>(`/${id}`)
        return data
    }
}