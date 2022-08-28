<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="进行中">
      <a-empty v-if="!myTasks.length"/>
      <a-row v-else
             wrap
             type="flex"
             justify="start"
             :gutter="[0, { xs: 8, sm: 16, md: 24, lg: 32 }]"
      >
        <a-col
            v-for="item in myTasks" :key="item.task_id"
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
            :xxl="{ span: 4 }"
            :xxxl="{ span: 4 }"
        >
          <Task :myTask="item" :userAvatar="userAvatar" :username="username"/>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane key="2" tab="已完成">
      <a-empty v-if="!myTasks1.length"/>
      <a-row v-else
             wrap
             type="flex"
             justify="start"
             :gutter="[0, { xs: 8, sm: 16, md: 24, lg: 32 }]"
      >
        <a-col
            v-for="item in myTasks" :key="item.task_id"
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
            :xxl="{ span: 4 }"
            :xxxl="{ span: 4 }"
        >
          <Task :myTask="item" :userAvatar="userAvatar" :username="username" @deadline="deadline"/>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane key="3" tab="未完成">
      <a-empty v-if="!myTasks2.length"/>
      <a-row v-else
             wrap
             type="flex"
             justify="start"
             :gutter="[0, { xs: 8, sm: 16, md: 24, lg: 32 }]"
      >
        <a-col
            v-for="item in myTasks2" :key="item.task_id"
            :xs="{ span: 24 }"
            :sm="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
            :xxl="{ span: 4 }"
            :xxxl="{ span: 4 }"
        >
          <Task :myTask="item" :userAvatar="userAvatar" :username="username"/>
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {getMyTasks} from "@/server/taskService";
import {getInfo} from "@/server/userService";
import Task from '../../components/Task.vue';
import {myTasksType} from "../../components/Task.vue";

const userId = ref<string>("")
const userAvatar = ref<string>("")
const username = ref<string>("")

const myTasks = reactive<Array<myTasksType>>([])
const myTasks1 = reactive<Array<myTasksType>>([])
const myTasks2 = reactive<Array<myTasksType>>([])

const activeKey = ref<string>('1');
onBeforeMount(() => {
  getInfo(localStorage.getItem("token") as string).then(res => {
    if (res?.data.code == 200) {
      userId.value = res.data.data.userId
      userAvatar.value = res.data.data.avatar
      username.value = res.data.data.username

      getMyTasks(userId.value).then(res => {
        res?.data.data.forEach((item: myTasksType) => {
          if (item.status === 0) {
            myTasks.push(item);
          }else if (item.status === 1) {
            myTasks1.push(item);
          } else {
            myTasks2.push(item);
          }
        })
      }).catch(error => {
        console.log(error)
      })
    }

  }).catch(error => {
    console.log(error)
  })
})

const deadline = (taskId: string) => {
  let temp = myTasks.filter((item: myTasksType) => {
    let flag = item.taskId !== taskId
    if (flag) {
      myTasks2.push(item)
    }
    return flag;
  })
  myTasks.length = 0;
  myTasks.push(...temp);
}

</script>

<style scoped>
.ant-tabs{
  height: 100%;
  overflow: auto;
}
</style>