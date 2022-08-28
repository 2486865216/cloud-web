<template>
  <a-list item-layout="horizontal" :data-source="props.item">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
            :description= "item.description"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup lang="ts">
type itemType = {
  title: string,
  description: string
}
interface Props {
  item: itemType,
  msg: string
}
const props = defineProps<Props>()

</script>