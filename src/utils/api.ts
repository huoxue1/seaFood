import Http from "./request";

let http = new Http({
    baseURL: "/",
    timeout: 30000
});

let base = process.env.REACT_APP_BASE_URL

class API {
    // 用户登录
    login = async (username:string,password:string)=>{
        return await http.post<number>(base + "/user/login",{username:username,password:password})
    }

    // 用户注册
    register = async (username:string,password:string) =>{
        return await http.post<number>(base + "/user/register",{username:username,password:password})
    }

    // 检查登录状态
    check_login = async () => {
        return await http.post<any>(base + "/user/check_login")
    }

    //店铺添加
    shop_add = async (shop_name:string,introduction:string,avatar:string) => {
        return await http.post<boolean>(base+ "/shop/add",{shop_name:shop_name,introduction:introduction,avatar:avatar})
    }

    // 店铺列表
    shop_list = async () => {
        return await  http.post<any>(base+"/shop/list")
    }

    shop_query_by_id = async (id:number) => {
        return await http.post<any>(base+"/shop/query/"+id)
    }

    // 货物添加
    goods_add = async (value:any) => {
        return await http.post<boolean>(base+ "/goods/add",value)
    }

    query_goods_by_shop_id = async (shop_id:number) => {
        return await http.get<any>(base+"/goods/query_by_shop_id/"+shop_id)
    }

    user_list = async () => {
        return await http.post<any>(base+"/user/list")
    }

}


export default new API();
