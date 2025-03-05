import axios from "axios";

type TestType = "CLASSIC" | "SERVER_SIDE" | "MVT";

type TestStatus = "DRAFT" | "ONLINE" | "PAUSED" | "STOPPED";

export interface Test {
    id: number;
    name: string;
    type: TestType;
    status: TestStatus;
    siteId: number;
}


export const testsApi = {
    api: axios.create({
        baseURL: `${import.meta.env.VITE_YOUR_BACKEND_URL}/tests`
    }),
    getTests: async function () {
        const { data } = await this.api.get<Test[]>('')
        return data
    },
    getTestsById: async function (id: number) {
        const { data } = await this.api.get<Test>(`/${id}`)
        return data
    }
}