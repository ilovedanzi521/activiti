import axios from "axios";

export default class AxiosFun {
    // static root = "http://127.0.0.1:8080";

    static get(url: string, params?: any): Promise<any> {
        return this.apiAxios("GET", url, params);
    }
    static post(url: string, params: any): Promise<any> {
        return this.apiAxios("POST", url, params);
    }

    static put(url: string, params: any): Promise<any> {
        return this.apiAxios("PUT", url, params);
    }

    static delete(url: string, params?: any): Promise<any> {
        return this.apiAxios("DELETE", url, params);
    }

    static apiAxios(method: string, url: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (params) {
                params = this.filterNull(params);
            }
            axios({
                method: method,
                url: url,
                data: method === "POST" || method === "PUT" ? params : null,
                params: method === "GET" || method === "DELETE" ? params : null,
                timeout: 10 * 1000,
                withCredentials: false
            })
                .then(response => {
                    if ("SUCC" != response.data.winRspType) {
                    }
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status) {
                        if (404 == error.response.status) {
                            alert("请求资源不存在");
                        } else if (404 == error.response.status) {
                            alert("服务器发生错误");
                        }
                    } else {
                        alert(error.message);
                    }

                    reject(error);
                });
        });
    }

    static filterNull(o: any): any {
        for (var key in o) {
            if (o[key] === null) {
                delete o[key];
            }
            if (this.toType(o[key]) === "string") {
                o[key] = o[key].trim();
            } else if (this.toType(o[key]) === "object") {
                o[key] = this.filterNull(o[key]);
            } else if (this.toType(o[key]) === "array") {
                o[key] = this.filterNull(o[key]);
            }
        }
        return o;
    }

    static toType(obj: any): string {
        return {}.toString
            .call(obj)
            .match(/\s([a-zA-Z]+)/)[1]
            .toLowerCase();
    }
}
