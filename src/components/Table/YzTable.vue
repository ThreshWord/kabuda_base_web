<template>
  <el-table
    ref="commonTable"
    :data="dataList"
    v-loading="tableLoading"
    table-layout="fixed"
    @selection-change="handleSelectionChange"
    @select="handleSelect"
    stripe
    :reserve-selection="true"
  >
    <el-table-column
      v-if="isSelection"
      type="selection"
      width="50"
      align="center"
      :selectable="isSelectable"
      :fixed="true"
    ></el-table-column>
    <el-table-column
      type="index"
      width="60"
      align="center"
      :fixed="true"
      label="序号"
    ></el-table-column>
    <template v-for="item in fieldList" :key="item.props">
      <el-table-column
        :prop="item.props"
        :label="item.label"
        :show-overflow-tooltip="item.tooltip"
        :width="item.width"
        :fixed="item.fixed || false"
        align="center"
      >
        <template #default="scope">
          <template v-if="$slots[item.props]">
            <slot :name="item.props" :row="scope.row"></slot>
          </template>
          <template v-else-if="item.isDateTimer">
            <DateTime
              :formatter="item.dateTimeFormatter"
              :is-friendly="item.friendlyDateTime"
              :time="scope.row[item.props]"
            />
          </template>
          <template v-else>
            {{ scope.row[item.props] }}
          </template>
        </template>
      </el-table-column>
    </template>
    <template #empty>
      <img alt="" src="../../assets/images/empty.svg" style="width: 80px" />
      <div>
        {{ emptyText || '暂无数据' }}
      </div>
    </template>
  </el-table>
  <div class="pagination_container" v-if="isPagination">
    <el-pagination
      v-model:current-page="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="changePage"
      @current-change="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { TableConfig } from './tableConfig.ts'
import DateTime from '../DateTime.vue'
const emit = defineEmits(['handleSelectionChange', 'handleSelect', 'changePage'])
const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
    required: true,
  },
  /**
   * # 默认选中的数据数组
   */
  selectList: {
    type: Array,
    default: () => [],
  },
  /**
   * # 显示字段列表
   * 如传入 则优先使用
   */
  fieldList: {
    type: Array as () => TableConfig[],
    default: () => [],
  },
  tableLoading: {
    //加载中状态
    type: Boolean,
    default: false,
  },
  /**
   * # 默认表格空文案
   * 如不传入 有默认配置
   */
  emptyText: {
    type: String,
    default: undefined,
  },
  /**
   * 是否开起多选
   */
  isSelection: {
    type: Boolean,
    default: false,
  },
  /**
   * # 控制是否禁用多选按钮的回调方法
   */
  selectable: {
    type: Function,
    default: null,
  },
  /**
   * # 是否分页
   */
  isPagination: {
    type: Boolean,
    default: false,
  },
  /**
   * # 总数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * # 当前页码参数
   */
  queryParams: {
    type: Object,
    default: () => {
      return {
        pageNum: 1,
        pageSize: 10,
      }
    },
  },
})
const query = JSON.parse(JSON.stringify(props.queryParams))
type T = /*unresolved*/ any
const handleSelectionChange = (val: Array<T>) => {
  emit('handleSelectionChange', val)
}
const isSelectable = (row: any) => (props.selectable ? props.selectable(row) : true)
const handleSelect = (val: Array<T>) => {
  emit('handleSelect', val)
}

const changePage = () => {
  emit('changePage', props.queryParams)
}
</script>

<style lang="scss" scoped>
.pagination_container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
