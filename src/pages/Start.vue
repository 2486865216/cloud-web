<template>
  <Header />
  <div id="main" :style="style">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import Header from '../components/Header.vue'
import {onMounted, reactive, ref} from "vue";
const height = ref<number>(0);
onMounted(() => {
  let hight = 80;
  hight = Number(document.getElementById("main")?.offsetTop);
  let bottom = document.getElementsByTagName("body")[0]?.offsetHeight;
  height.value = bottom - hight - 1;
  style.height = height.value + 'px';
})
const style = reactive({
  'height': '0px',
  'overflow': 'auto'
})
</script>
<style scoped>
</style>