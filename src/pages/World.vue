<template>
  <a-row wrap
         type="flex"
         justify="start"
         :gutter="[0, { xs: 8, sm: 16, md: 24, lg: 32 }]"
  >
    <a-col
        v-for="item in taskList" :key="item"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 6 }"
        :xxl="{ span: 4 }"
        :xxxl="{ span: 4 }"
    >
      <Task :my-task="item" :user-avatar="avatarUrl" @love="love"/>
    </a-col>
  </a-row>
  <a-row justify="end" style="margin: 20px">
    <a-col>
      <a-pagination @change="onChange" v-model:current="current" :total="total" />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import Task from '../components/Task.vue';
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {myTasksType} from "../components/Task.vue";
import {getAllTasks} from "@/server/taskService";
import {getUserAvatar, getUserId, getUserName} from "@/server/userService";
import {useStore} from "@/pinia/index";
import {getMyLoveList} from "@/server/loveService";

const taskList = reactive<Array<myTasksType>>([])
const avatarUrl = ref<string>("");
const current = ref<number>(1)
const total = ref<number>(0);

const initMyLoveList = async () => {
  const userId = await getUserId();
  const store = useStore();
  const list = await getMyLoveList(userId);
  store.$state = { myLoveList: list }
}

onMounted(async () => {
  avatarUrl.value = await getUserAvatar();
  initMyLoveList();
  getAllTasks(1).then(res => {
    if (res?.data.code === 200) {
      taskList.push(...res.data.data.tasks);
      total.value = res.data.data.total;
    }
  }).catch(error => {
    console.log(error);
  })
})

const love = (increment: boolean, currentTask: myTasksType) => {
    let index = taskList.indexOf(currentTask);
    if (increment) {
      taskList[index].loveCount++;
    }else {
      taskList[index].loveCount--;
    }
}
//分页
const onChange = (pageIndex: number) => {
  getAllTasks(pageIndex).then(res => {
    if (res?.data.code === 200) {
      taskList.length = 0;
      taskList.push(...res.data.data.tasks);
    }
  }).catch(error => {
    console.log(error);
  })
}
</script>
<style scoped>
</style>