<template>
  <div>
    {{ getDateTimeString }}
  </div>
</template>
<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { Config } from '../config/config'
import { DateTimeFormatter } from '@/enum/dateTimeFormatter'
import { DateTime } from '@/utils/dateTime'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  time: {
    type: Number,
    default: 0,
  },

  /**
   * # 时间格式化模板
   * ---
   * 💡 建议使用 ```DateTimeFormatter```
   */
  formatter: {
    type: String as PropType<DateTimeFormatter | string>,
    default: Config.dateTimeFormatter,
  },

  /**
   * # 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

/**
 * 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (props.isFriendly) {
    return DateTime.getFriendlyDateTime(props.time)
  }
  return DateTime.formatFromMilliSecond(props.time, props.formatter)
})
</script>
