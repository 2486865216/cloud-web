<template>
  <a-row id="header" justify="space-around" align="middle">
    <a-col :span="4" style="display: flex;align-items: center">
      <img style="width: 32px; height: 32px"
           src="https://zhangyuyetypora.oss-cn-guangzhou.aliyuncs.com/avatar/1da379a3d2a84a6585c396b787486f2c.jpg"
           alt="logo">
      <a-page-header
          title="MyTask"
      />
    </a-col>
    <a-col :span="8">
      <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
      >
        <a-menu-item key="/" @click="world">
          主页
        </a-menu-item>
        <a-menu-item key="/user/" @click="userInfo">
          <template #icon>
            <UserOutlined/>
          </template>
          个人
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col :span="8">
      <a-input-search
          v-model:value="value"
          placeholder="input search text"
          enter-button
          @search="onSearch"
      />
    </a-col>
    <a-col :span="4">
      <a-button v-if="!isLogin" type="primary" @click="login">登录</a-button>
      <a-dropdown v-else placement="bottom">
        <a class="ant-dropdown-link" @click.prevent>
          <span style="margin-right: 24px">
            <a-badge :count="0">
              <a-avatar @click="gotoInfo" :src="avatarUrl">
              </a-avatar>
            </a-badge>
          </span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logout">注销登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, onMounted, ref} from 'vue';
import router from "@/router";
import {getInfo} from "@/server/userService";
import {UserOutlined} from '@ant-design/icons-vue';

const current = ref<string[]>([router.currentRoute.value.path])
const avatarUrl = ref<string>('')
const value = ref<string>("")

onMounted(() => {
  if (router.currentRoute.value.path.startsWith("/user/")) {
    current.value = ["/user/"]
  }
})

//获取用户信息
onBeforeMount(() => {
  if (localStorage.getItem("token")) {
    getInfo(localStorage.getItem("token") as string)
        .then(res => {
          const {data} = res
          avatarUrl.value = data.data.avatar
        })
  }
})

const world = () => {
  router.push("/")
}
const userInfo = () => {
  router.push("/user/")
}

const isLogin = computed(() => {
  if (localStorage.getItem("token")) {
    return true
  }
  return false
})

const onSearch = () => {
  console.log("hello")
}

const login = () => {
  router.push("/login")
}

const gotoInfo = () => {
  current.value = ["/user/"]
  router.push("/user/")
}

//注销
const logout = () => {
  localStorage.removeItem("token")
  window.location.reload()
  router.push("/")
}
</script>

<style scoped>
.ant-row {
  height: 10vh;
  min-height: 80px;
  background-color: white;
  margin-bottom: 16px;
}

.ant-col-4 {
  flex: none;
}
</style>