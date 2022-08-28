<template>
  <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Usernmae"
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
        has-feedback
        :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item
        has-feedback
        label="Password"
        name="checkPass"
        :rules="[{ required: true, message: '请确认密码!' }]"
    >
      <a-input-password v-model:value="formState.checkPass">
        <template #prefix>
          <LockOutlined class="site-form-item-icon"/>
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import {computed, reactive} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";
import {register} from "@/server/userService";
import router from "@/router";


interface FormState {
  username: string;
  password: string;
  checkPass: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  checkPass: ''
});


const onFinish = (values: FormState) => {
  if (values.password !== values.checkPass) {
    message.info("两次输入的密码不一致!")
    return
  }
  register(values.username, values.password)
  .then(res => {
    if (res?.data.code == 200) {
      localStorage.setItem("token", res.data.data.token)
      router.push("/user/")
    }
    if (res?.data.code == 400) {
      message.info(res.data.message)
    }
  }).catch(error => {
    console.log(error)
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