<template>
  <div id="main">
    <img class="logo" src="../../assets/logo.png" alt="" @click="index">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="登录">
        <Login />
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册">
        <Register />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
import router from "@/router";

const activeKey = ref<string>('1')

const index = () => {
  router.push("/")
}
</script>

<style scoped>
.logo{
  margin-right: 20px;
}
#main {
  display: flex;
  width: 100vw;
  height: 100vh;
  min-width: 500px;
  justify-content: center;
  align-items: center;
}
</style>