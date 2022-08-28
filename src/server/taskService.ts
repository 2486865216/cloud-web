import axios from "axios";
import {baseUrl} from "@/server/baseUrl";

export const createTask = (name: string, isShow: number, userId: string, command: string, time: string,) => {
    return axios.post(baseUrl + "/newTask", {
            taskName: name,
            isShow: isShow,
            taskCommand: command,
            createUserId: userId,
            endTime: time
    }).then(res => {
        return res
    }).catch(error => {
        console.log(error)
    })
}

export const getMyTasks = (userId: string) => {
    return axios.get(baseUrl + "/getMyTasks", {
        params: {
            userId: userId
        }
    }).then(res => {
        return res
    }).catch(error => {
        console.log(error)
    })
}

export const getAllTasks = (pageId: number) => {
    return axios.get(baseUrl + "/getAllTasks", {
        params: {
            pageId: pageId
        }
    }).then(res => {
        return res
    }).catch(error => {
        console.log(error)
    })
}