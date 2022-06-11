import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

type TAxiosOption = {
    baseURL: string;
    timeout: number;
}

// const config = {
//     baseURL: '/',
//     timeout: 120000
// }

class Http {
    service: AxiosInstance;
    constructor(config:TAxiosOption) {
        this.service = axios.create(config);
        this.service.defaults.withCredentials = true
        this.service.interceptors.request.use(
            (value)=>{
               if (value.headers !== null){
                   // @ts-ignore
                   value.headers.sea_user_id = sessionStorage.getItem("sea_user_id")
               }
               return value
        },()=>{

        })
    }

    async get<T>(url: string, params?: object, _object = {}): Promise<IResponseData<T>> {
        return (await this.service.get(url, { params, ..._object })).data
    }
    async post<T>(url: string, data?: object, _object:AxiosRequestConfig = {}): Promise<IResponseData<T>> {
        return (await this.service.post(url, data, _object)).data
    }
    async put<T>(url: string, params?: object, _object = {}): Promise<IResponseData<T>> {
        return (await this.service.put(url, params, _object)).data
    }
    async delete<T>(url: string, params?: any, _object = {}): Promise<IResponseData<T>> {
        return (await this.service.delete(url, { params, ..._object })).data
    }
}

export default Http

export interface IResponseData<T> {
    success: boolean;
    msg:string;
    data:T;
    code: number;
    error?:string
}
