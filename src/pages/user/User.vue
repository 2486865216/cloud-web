<template>
  <a-layout>
    <a-layout-sider>
      <a-menu v-model:selectedKeys="current" @click="tabUser">
        <a-menu-item key="/user/">
          <template #icon>
            <UserOutlined />
          </template>
          个人资料
        </a-menu-item>
        <a-menu-item key="/user/task">
          <template #icon>
            <DiffOutlined />
          </template>
          我的任务
        </a-menu-item>
        <a-menu-item key="/user/love">
          <template #icon>
            <HeartOutlined />
          </template>
          我的收藏
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>

  <div id="new_task" @click="showModal">
    new task
  </div>
  <a-modal v-model:visible="visible" title="新建任务" @ok="handleOk">
    <a-form-item label="任务名">
      <a-input v-model:value="state.taskName"/>
    </a-form-item>
    <a-form-item :label="state.delivery ? '公开' : '私有'">
      <a-switch v-model:checked="state.delivery"/>
    </a-form-item>
    <a-form-item label="选择时间">
      <a-date-picker show-time placeholder="选择时间" @change="onChange" @ok="onOk"/>
    </a-form-item>
    <a-form-item label="任务简介">
      <a-textarea v-model:value="state.textValue" :rows="4" placeholder="任务简介" allow-clear/>
    </a-form-item>
  </a-modal>
</template>

<script setup lang="ts">
import {UserOutlined,DiffOutlined,HeartOutlined} from "@ant-design/icons-vue";
import {reactive, ref, watch} from "vue";
import router from "@/router";
import {Dayjs} from "dayjs";
import {getInfo} from "@/server/userService";
import {createTask} from "@/server/taskService";
import {message} from "ant-design-vue";

interface State {
  taskName: string,
  delivery: boolean,
  textValue: string,
  time: string,
}

const userId = ref<string>("")

const state = reactive<State>({
  taskName: '',
  delivery: false,
  textValue: '',
  time: ''
});

getInfo(localStorage.getItem("token") as string).then(res => {
  if (res?.data.code == 200) {
    userId.value = res.data.data.userId
  }
}).catch(error => {
  console.log(error)
})

const current = ref<string[]>([router.currentRoute.value.path])

watch(router.currentRoute, () => {
  current.value = [router.currentRoute.value.path]
})

const visible = ref<boolean>(false);

const tabUser = (value: any) => {
  router.push(value.key)
}

const showModal = () => {
  visible.value = true;
}


const onChange = (value: Dayjs, dateString: string) => {
  state.time = dateString
};

const onOk = (value: Dayjs) => {
  console.log()
};

const handleOk = () => {
  let show = state.delivery === true ? 1 : 0;
  createTask(state.taskName, show, userId.value, state.textValue, state.time)
  .then(res => {
    if(res?.data.code === 200) {
      message.info("添加任务成功")
    }
  }).catch(error => {
    console.log(error)
  })
  visible.value = false;
  state.taskName = '';
  state.delivery = false;
  state.textValue = '';
  state.time = '';
}
</script>

<style scoped>
.ant-menu{
  width: 100%;
}
.ant-layout{
  height: 100%;
}
.ant-layout-sider{
  height: 100%;
  background-color: white;
}
.ant-layout-content{
  box-sizing: border-box;
  padding: 2vw;
}
#new_task {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  line-height: 100px;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #1890ff;
  position: fixed;
  right: 50px;
  bottom: 50px;
}

#new_task:hover {
  cursor: pointer;
}
</style>