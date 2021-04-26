<template>
  <div>
    <NuxtDynamic
      v-for="(item, i) in ['AwesomeFoo', 'awesome-bar']"
      :key="i"
      :component="item"
      :tags="['page', 'article']"
    >
      <template v-slot:some-slot="slotData">
        <div>
          additional content with component data:
          <div v-for="(item, j) in slotData.tags" :key="j">{{ item }}</div>
        </div>
      </template>
    </NuxtDynamic>
  </div>
</template>
