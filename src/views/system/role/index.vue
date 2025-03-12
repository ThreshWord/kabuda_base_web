<template>
  <Content title="筛选条件">
    <el-form ref="queryRef" :inline="true" label-width="82px">
      <el-form-item label="角色名称:" prop="deviceName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Content>
  <Content title="角色信息">
    <YzTable
      :fieldList="fieldList"
      :dataList="dataList"
      isSelection
      isPagination
      :queryParams="queryParams"
      :total="total"
      @change-page="search"
    >
      <template #deviceType="scope">
        <div style="color: red">
          {{ scope.row.deviceType }}
        </div>
      </template>
    </YzTable>
  </Content>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import Content from '@/components/Content.vue'
import YzTable from '@/components/Table/YzTable.vue'
interface QueryParams {
  roleName: string
  pageSize: number
  pageNum: number
}
const queryParams: Ref<QueryParams> = ref({
  roleName: '',
  pageSize: 10,
  pageNum: 1,
})
const search = () => {
  console.log(111)
}
const total = ref(0)
const fieldList = [
  {
    label: '角色名称',
    props: 'roleName',
  },
  {
    label: '角色类型',
    props: 'roleType',
  },
  {
    label: '角色状态',
    props: 'status',
  },
  {
    label: '创建时间',
    props: 'createTime',
  },
  {
    label: '操作',
    props: 'action',
  },
]
const dataList = ref([])
</script>
