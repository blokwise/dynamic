<template>
  <div>
    <h1>slots</h1>

    <!-- test usage of default slot -->
    <NuxtDynamic
      is-component="component-b"
    >
      <span>passed through slot of ComponentB</span>
    </NuxtDynamic>

    <!-- test usage of named slot with slot props -->
    <NuxtDynamic
      v-for="(componentName, i) in ['AwesomeBar']"
      :key="i"
      :is-component="componentName"
      :tags="['page', 'article']"
    >
      <template #some-slot="slotData">
        <div>
          additional content with slot data:
          <div v-for="(tag, j) in slotData.tags" :key="j">
            tag: {{ tag }}
          </div>
        </div>
      </template>
    </NuxtDynamic>
  </div>
</template>
