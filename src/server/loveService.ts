import axios from "axios";
import {baseUrl} from "@/server/baseUrl";

export const love = (userId: string, taskId: string) => {
    return axios.post(baseUrl + "/love", {
        loveUserId: userId,
        taskId: taskId
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error);
    })
}

export const unLove = (userId: string, taskId: string) => {
    return axios.post(baseUrl + "/unLove", {
        loveUserId: userId,
        taskId: taskId
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error);
    })
}

export const getMyLoveList = async (userId: string): Promise<Array<string>> => {
    let list = [""];
    await axios.get(baseUrl + "/getMyLoveList", {
        params: {
            userId: userId
        }
    }).then(res => {
        if (res?.data.code == 200) {
            list = res.data.data;
        }
    }).catch(error => {
        console.log(error)
    })
    return list;
}

export const getMyLove = (userId: string) => {
    return axios.get(baseUrl + "/getMyLove", {
        params: {
            userId: userId
        }
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error)
    })
}