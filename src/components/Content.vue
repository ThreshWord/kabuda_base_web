<template>
  <div class="content">
    <div class="content_header">
      <div class="content_header_title">{{ props.title }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String,
})
</script>

<style lang="scss" scoped>
.content {
  padding: 15px;
  background: #ffffff;
  border: 1px solid #e9edf2;
  margin-bottom: 10px;
  .content_header {
    margin-bottom: 15px;
    font-weight: 600;
  }
  .content_header_title {
    position: relative;
    padding-left: 10px;
    font-size: 16px;
    color: #000;
    font-weight: 600;
    &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: 55%;
      transform: translateY(-50%);
      width: 3px;
      height: 90%;
      background-color: var(--btn-primary-color);
    }
  }
}
</style>
