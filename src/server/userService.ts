import axios from "axios";
import {baseUrl} from "@/server/baseUrl";
import {message} from "ant-design-vue";
import router from "@/router";

export const login = (username: string, password: string) => {
    return axios.get(baseUrl + "/login", {
        params: {
            username,
            password
        }
    }).then(res => {
        return res
    }).catch(error => {
        console.log(error)
    })
}

export const register = (username: string, password: string) => {
    return axios.post(baseUrl + "/register", {
        username: username,
        password: password
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error)
    })
}

export const getInfo = (token: string) => {
    return axios.get(baseUrl + "/getInfo", {
        headers: {
            'Authorization': token
        },
    }).then(res => {
        if (res?.data.code === 402) {
            message.error("用户登录信息过期，请重新登录!")
            router.push("/login")
        }
        return res
    }).catch(error => {
        console.log(error)
    })
}

export const editUserInfo = (userId: string, username: string, email: string, userCommand: string, address: string) => {
    return axios.post(baseUrl + "/editUserInfo", {
        userId,
        username,
        email,
        userCommand,
        address
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error);
    })
}

export const userAvatarUpload = (file: any) => {
    const avatar = new FormData();
    avatar.append("avatar", file);
    return axios.post(baseUrl + "/userAvatarUpload", avatar, {
        headers: {
            'Authorization': localStorage.getItem("token") as string
        },
    }).then(res => {
        return res
    }).catch(error => {
        console.log(error);
    })
}

export const getUserId = async (): Promise<string> => {
    let userId = "";
    if (!localStorage.getItem("token")) {
        return ""
    }
    await getInfo(localStorage.getItem("token") as string).then(res => {
        if (res?.data.code === 200) {
            userId = res.data.data.userId;
        }
    }).catch(error => {
        console.log(error)
    })
    return userId;
}

export const getUserAvatar = async () => {
    let userAvatar = "";
    if (!localStorage.getItem("token")) {
        return ""
    }
    await getInfo(localStorage.getItem("token") as string).then(res => {
        if (res?.data.code === 200) {
            userAvatar = res.data.data.avatar;
        }
    }).catch(error => {
        console.log(error)
    })
    return userAvatar;
}

export const getUserName = async (userId: string) => {
    let username = "";
    if (!userId) {
        return ""
    }
    await axios.get(baseUrl + "/getOtherInfo", {
        params: {
            userId: userId
        }
    }).then(res => {
        if (res?.data.code === 200) {
            username = res.data.data.username;
        }
    }).catch(error => {
        console.log(error)
    })
    return username;
}