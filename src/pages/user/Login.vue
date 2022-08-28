<template>
  <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: '请输入用户名!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon"/>
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import {computed, reactive} from 'vue';
import {message} from 'ant-design-vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {login} from "@/server/userService";
import router from "@/router";

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
});
const onFinish = (values: any) => {

  const login_data = login(values.username, values.password)

  login_data.then(({data}) => {
    if (data.code == 200) {
      localStorage.setItem("token", data.data.token)
      router.replace("/")
    } else {
      message.info("登录失败，请输入正确的用户名或者密码!")
    }
  }).catch(error => {
    console.log(error)
    message.info("登录失败，服务端问题!")
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style scoped>
.login-form-button {
  display: block;
  margin: auto;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>