<template>
 <div id="username">
   <a-upload
       v-model:file-list="fileList"
       name="avatar"
       list-type="picture-card"
       class="avatar-uploader"
       :show-upload-list="false"
       :before-upload="beforeUpload"
       :custom-request="customRequest"
   >
   <a-avatar size="large" :src="userInfo.avatar">
   </a-avatar>
   </a-upload>
   <div>
     <h1>{{userInfo.username}}</h1>
   </div>
 </div>
  <div id="userinfo">
    <div class="head">
      <span>信息</span>
      <a-button type="link" @click="editInfo">编辑</a-button>
    </div>
    <a-divider />
    <div>
      <div class="info_list">
        <div class="info_name">邮箱</div>
        <div class="info_desc">{{userInfo.email ? userInfo.email : "暂无"}}</div>
      </div>
      <div class="info_list">
        <div class="info_name">个人简介</div>
        <div class="info_desc">{{userInfo.userCommand ? userInfo.userCommand : "暂无"}}</div>
      </div>
      <div class="info_list">
        <div class="info_name">所在地区</div>
        <div class="info_desc">{{ userInfo.address ? userInfo.address  : "暂无"}}</div>
      </div>
      <div class="info_list">
        <div class="info_name">注册时间</div>
        <div class="info_desc">{{userInfo.createTime}}</div>
      </div>
    </div>
    <a-modal v-model:visible="visible" title="编辑信息" @ok="handleOk">
      <a-form-item label="用户名">
        <a-input v-model:value="editUser.username"/>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="editUser.email"/>
      </a-form-item>
      <a-form-item label="个人简介">
        <a-input v-model:value="editUser.userCommand"/>
      </a-form-item>
      <a-form-item label="所在地区">
        <a-input v-model:value="editUser.address"/>
      </a-form-item>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue";
import {editUserInfo, getInfo, getUserId, userAvatarUpload} from "@/server/userService";
import {message, UploadChangeParam, UploadProps} from "ant-design-vue";

onBeforeMount(() => {
  getInfo(localStorage.getItem("token") as string)
      .then(res => {
        const data = res?.data
        const info = data.data
        userInfo.avatar = info.avatar
        userInfo.username = info.username
        userInfo.email = info.email
        userInfo.address = info.address
        userInfo.userCommand = info.userCommand
        userInfo.createTime = formatTime(info.createTime)
      })
})

interface userInfoType {
  username: string,
  avatar: string,
  email: string,
  userCommand: string,
  address: string,
  createTime: string
}

interface editUserInfoType {
  username: string,
  email: string,
  userCommand: string,
  address: string,
}

const fileList = ref([])
const beforeUpload = (file: any) => {
  const isJpgOrPng = file?.type === 'image/jpeg' || file?.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG 或 PNG 文件!');
  }
  const isLt2M = file?.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('文件必须小于 5MB!');
  }
  return isJpgOrPng && isLt2M;
}

const userInfo = reactive<userInfoType>({
  username: "",
  avatar: "",
  email: "",
  userCommand: "",
  address: "",
  createTime: ""
})

const editUser = reactive<editUserInfoType>({
  username: '',
  email: '',
  userCommand: '',
  address: '',
})

//上传头像
const customRequest = (info: any) => {
  const {file} = info
  userAvatarUpload(file).then(res => {
    if (res?.data.code === 200) {
      userInfo.avatar = res.data.data.upload
      window.location.reload();
    }
  }).catch(error => {
    console.log(error)
  })
}

const formatTime = (time: string) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = formatOne(date.getMonth() + 1)
  let day = formatOne(date.getDate())
  let hour = formatOne(date.getHours())
  let minute = formatOne(date.getMinutes())
  let seconds = formatOne(date.getSeconds())

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
}

const formatOne = (time: any) => {
  if (time < 10) {
    return "0" + time
  }
  return time
}

const visible = ref<boolean>(false);

const editInfo = () => {
  visible.value = !visible.value;
}

const handleOk = async () => {
  editUserInfo(await getUserId(), editUser.username, editUser.email, editUser.userCommand, editUser.address)
  .then(res => {
    if (res?.data.code === 200) {
      message.info("修改成功!");

      userInfo.username = editUser.username;
      userInfo.email = editUser.email;
      userInfo.userCommand = editUser.userCommand;
      userInfo.address = editUser.address;

      editUser.username = '';
      editUser.email = '';
      editUser.userCommand = '';
      editUser.address = '';
    }else {
      message.error("修改失败!");
    }
  }).catch(error => {
    console.log(error)
  })
  visible.value = !visible.value;
}
</script>

<style scoped>
#username{
  background-color: white;
  display: flex;
  box-sizing: border-box;
  padding: 1vw;
}
.ant-avatar{
  width: 8vw;
  height: 8vw;
}
#userinfo{
  background-color: white;
  box-sizing: border-box;
  padding: 2vw;
  margin-top: 2vw;
}
.head{
  display: flex;
  justify-content: space-between;
}
.info_list{
  display: flex;
  margin-bottom: 3vw;
}
.info_name{
  width: 150px;
}
.avatar-uploader{
  width: 128px;
  height: 128px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
</style>