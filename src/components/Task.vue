<template>
  <a-row type="flex" justify="center">
    <a-col :span="22" @click="detail">
      <a-card hoverable style="width: 100%">
        <template #cover>
          <div id="show_detail">
            <a-list item-layout="horizontal" :data-source="data">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta
                      :description="username"
                  >
                    <template #title>
                      <a href="javascript:;">创建人</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.avatarUrl"/>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta
                      :description="item.description"
                  >
                    <template #title>
                      <a href="https://www.antdv.com/">任务名称</a>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
            <a-statistic-countdown
                title="剩余时间"
                :value="deadline"
                format="M 月 D 天 H 时 m 分 s 秒"
                :value-style="value_style"
                :finish="finish"
            />
          </div>
        </template>
        <template #actions>
          <div @click="doLike">
            {{ props.myTask.loveCount }}
            <HeartFilled v-if="isLove"/>
            <HeartOutlined v-else/>
          </div>
          <SettingOutlined key="setting"/>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {SettingOutlined, HeartFilled, HeartOutlined} from '@ant-design/icons-vue';
import {getUserId, getUserName} from "@/server/userService";
import {love, unLove} from "@/server/loveService";
import {message} from "ant-design-vue";
import {useStore} from "@/pinia/index";

interface DataItem {
  avatarUrl: string
  description: string;
}

export interface myTasksType {
  taskId: string,
  taskName: string,
  isShow: number,
  taskCommand: string,
  createUserId: string,
  loveCount: number,
  createTime: string,
  endTime: string,
  status: number
}

const value_style = {
  color: "#096",
  fontSize: "16px",
}

const props = defineProps<{
  myTask: myTasksType,
  userAvatar: string,
}>()

const username = ref<string>("");

const isLove = ref<boolean>(false);

onBeforeMount(async () => {
  username.value = await getUserName(props.myTask.createUserId)
  if (store.myLoveList.includes(props.myTask.taskId)) {
    isLove.value = true;
  }
})

const data: DataItem[] = [
  {
    avatarUrl: props.userAvatar,
    description: props.myTask.taskName,
  }
];
const deadline = ref<number>(new Date(props.myTask.endTime).getTime());

const store = useStore();

const emit = defineEmits<{
  (e: 'love', incremant: boolean, currentTask: myTasksType): void,
  (e: 'deadline', taskId: string): void,
}>()

const doLike = async () => {
  const userId = await getUserId()
  if (!userId) {
    return;
  }
  if (userId === props.myTask.createUserId) {
    return;
  }
  if (isLove.value) {
    //取消收藏
    unLove(userId, props.myTask.taskId).then(res => {
      if (res?.data.code === 200) {
        message.info("取消收藏");
        store.$patch((state: { myLoveList: any[]; }) => {
          state.myLoveList = state.myLoveList.filter(item => {
            item.taskId != props.myTask.taskId;
          });
        });
        isLove.value = false;
        emit('love', false, props.myTask)
      }
      if (res?.data.code === 500) {
        message.info("取消收藏失败");
      }
    }).catch(error => {
      console.log(error)
    })
  } else {
    //收藏
    love(userId, props.myTask.taskId).then(res => {
      if (res?.data.code === 200) {
        message.info("收藏成功");
        store.$patch((state: { myLoveList: string[]; }) => {
          state.myLoveList.push(props.myTask.taskId);
        })
      }
      isLove.value = true;
      emit('love', true, props.myTask)
    })
  }
}

const detail = () => {
  console.log()
}

const finish = () => {
  emit("deadline", props.myTask.taskId)
}
</script>

<style scoped>
#show_detail {
  box-sizing: border-box;
  padding: 16px;
}
</style>