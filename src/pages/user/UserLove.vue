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
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue";
import {myTasksType} from "@/components/Task.vue";
import {getUserAvatar, getUserId, getUserName} from "@/server/userService";
import {getMyLove, getMyLoveList} from "@/server/loveService";
import Task from '../../components/Task.vue';
import {useStore} from "@/pinia";

const taskList = reactive<Array<myTasksType>>([])
const avatarUrl = ref<string>("");
const store = useStore()

onBeforeMount(async () => {
  avatarUrl.value = await getUserAvatar();
  const userId = await getUserId();
  getMyLove(userId).then(res => {
    if (res?.data.code === 200) {
      taskList.push(...res.data.data)
    }
  })
  const list = await getMyLoveList(userId);
  store.$state = { myLoveList: list }
})

const love = (increment: boolean, currentTask: myTasksType) => {
  let index = taskList.indexOf(currentTask);
  if (increment) {
    taskList[index].loveCount++;
  }else {
    taskList[index].loveCount--;
  }
}
</script>

<style scoped>

</style>