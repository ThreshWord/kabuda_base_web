<template>
  <Content title="筛选条件">
    <el-form ref="queryRef" :inline="true" label-width="82px">
      <el-form-item label="用户状态">
        <el-select
          v-model="queryParams.userStatus"
          placeholder="请选择用户状态"
          style="width: 240px"
        >
          <el-option
            v-for="item in userStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称:" prop="deviceName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          style="width: 240px"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Content>
  <Content title="用户信息">
    <YzTable
      :fieldList="fieldList"
      :dataList="dataList"
      isSelection
      isPagination
      :queryParams="queryParams"
      :total="total"
      @change-page="search"
    >
      <template #action="scope">
        <el-link :underline="false" @click="dialogShow(true)"
          ><el-icon><EditPen /></el-icon
        ></el-link>
      </template>
    </YzTable>
  </Content>
  <userDialog ref="userDialogRef" />
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import Content from '@/components/Content.vue'
import YzTable from '@/components/Table/YzTable.vue'
import userDialog from './userDialog.vue'
interface QueryParams {
  userName: string
  userStatus: string
  pageSize: number
  pageNum: number
}
const queryParams: Ref<QueryParams> = ref({
  userName: '',
  userStatus: '',
  pageSize: 10,
  pageNum: 1,
})
const userStatusOptions = [
  { label: '冻结', value: '0' },
  { label: '正常', value: '1' },
]
const search = (): void => {
  console.log(111)
}
const userDialogRef = ref<InstanceType<typeof userDialog> | null>(null)

const dialogShow = async (edit: boolean): Promise<void> => {
  if (userDialogRef.value) {
    userDialogRef.value.setDialogVisible(edit)
  }
}
const total = ref(0)
const fieldList = [
  {
    label: '用户名称',
    props: 'userName',
  },
  {
    label: '用户类型',
    props: 'userType',
  },
  {
    label: '用户状态',
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
const dataList = ref([
  {
    userName: 'admin',
    userType: '管理员',
    status: '正常',
    createTime: '2021-01-01 00:00:00',
    action: '操作',
  },
  {
    userName: 'admin',
    userType: '管理员',
    status: '正常',
    createTime: '2021-01-01 00:00:00',
    action: '操作',
  },
])
</script>
