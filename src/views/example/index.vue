<template>
  <div class="example">
    <Content title="头部样式">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="切换1" name="first">切换1</el-tab-pane>
        <el-tab-pane label="切换2" name="second">切换2</el-tab-pane>
      </el-tabs>
    </Content>
    <Content title="按钮Button">
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary" plain>次主按钮</el-button>
      <el-button>次按钮</el-button>
      <el-button disabled>不可用</el-button>
    </Content>
    <Content title="输入框Input">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入内容" disabled clearable></el-input>
        </el-col>
      </el-row>
    </Content>
    <Content title="选择Choose">
      <el-radio-group v-model="radio">
        <el-radio value="1" size="large">Option 1</el-radio>
        <el-radio value="2" size="large">Option 2</el-radio>
        <el-radio value="2" size="large" disabled>Option 2</el-radio>
      </el-radio-group>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="Option A" value="Value A" />
        <el-checkbox label="Option B" value="Value B" />
        <el-checkbox label="Option C" value="Value C" />
        <el-checkbox label="disabled" value="Value disabled" disabled />
      </el-checkbox-group>
    </Content>
    <Content title="提示警告Alert">
      <el-button type="primary" plain @click="successAlert">提示成功</el-button>
      <el-button type="warning" plain @click="warningAlert">提示警告</el-button>
      <el-button type="info" plain @click="infoAlert">提示info</el-button>
      <el-button type="danger" plain @click="errorAlert">提示错误</el-button>
      <el-button type="primary" plain @click="alertBtn">确认提示</el-button>
      <el-button type="primary" plain @click="dialogShow">dialog示例</el-button>
    </Content>
    <Content title="表格Table">
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
    <el-dialog v-model="dialogVisible" title="dialog示例" :before-close="handleClose">
      <div class="dialog_content">This is a message</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Content from '@/components/Content.vue'
import YzTable from '@/components/Table/YzTable.vue'
import { Notification } from '@/messageFeedback/notification'
import { Alert } from '@/messageFeedback/alert'

const activeName = ref('first')
const input = ref('')
const radio = ref('1')
const checkList = ref(['Value A'])
interface QueryParams {
  menuName: string
  pageSize: number
  pageNum: number
}
const queryParams: Ref<QueryParams> = ref({
  menuName: '',
  pageSize: 10,
  pageNum: 1,
})
const total = ref(0)

const search = (val?: QueryParams) => {
  console.log(val)

  queryParams.value = val || queryParams.value
  Notification.success('重新获取表格数据')
}
const dialogVisible: Ref<boolean> = ref(false)
const dialogShow = () => {
  dialogVisible.value = true
}
const handleClose = () => {
  dialogVisible.value = false
  Notification.success('关闭弹窗')
}
// 表格数据演示   start ↓
const dataList = [
  {
    deviceName: '设备名称',
    deviceIdentifier: '设备编号',
    deviceType: '设备类型',
    deviceSn: '设备序列号',
    installDate: '安装时间',
    stationName: '目标站点',
    position: '详细安装位置',
    status: '设备状态',
    handle: '操作',
    timer: 1741232297182,
    friendTimer: 1741232297182,
  },
  {
    deviceName: '设备名称',
    deviceIdentifier: '设备编号',
    deviceType: '设备类型',
    deviceSn: '设备序列号',
    installDate: '安装时间',
    stationName: '目标站点',
    position: '详细安装位置',
    status: '设备状态',
    handle: '操作',
    timer: 1741232297182,
    friendTimer: 1741232297182,
  },
  {
    deviceName: '设备名称',
    deviceIdentifier: '设备编号',
    deviceType: '设备类型',
    deviceSn: '设备序列号',
    installDate: '安装时间',
    stationName: '目标站点',
    position: '详细安装位置',
    status: '设备状态',
    handle: '操作',
    timer: 1741232297182,
    friendTimer: 1741232297182,
  },
  {
    deviceName: '设备名称',
    deviceIdentifier: '设备编号',
    deviceType: '设备类型',
    deviceSn: '设备序列号',
    installDate: '安装时间',
    stationName: '目标站点',
    position: '详细安装位置',
    status: '设备状态',
    handle: '操作',
    timer: 1741232297182,
    friendTimer: 1741232297182,
  },
]
const fieldList = [
  {
    props: 'deviceName', //props
    label: '设备名称',
    tooltip: true, //超出隐藏
  },
  {
    props: 'deviceIdentifier',
    label: '设备编号',
    tooltip: true,
  },
  {
    props: 'timer',
    label: '日期时间',
    tooltip: true,
    isDateTimer: true,
  },
  {
    props: 'friendTimer',
    label: '友好时间',
    tooltip: true,
    isDateTimer: true,
    friendlyDateTime: true,
  },
  {
    props: 'deviceType',
    label: '设备类型',
    tooltip: true,
  },
  {
    props: 'deviceSn',
    label: '设备序列号',
    tooltip: true,
  },
  {
    props: 'installDate',
    label: '安装时间',
    tooltip: true,
  },
  {
    props: 'stationName',
    label: '目标站点',
    tooltip: true,
  },
  {
    props: 'position',
    label: '详细安装位置',
    tooltip: true,
  },
  {
    props: 'status',
    label: '设备状态',
    tooltip: true,
  },
  {
    props: 'handle',
    width: 150,
    label: '操作',
    tooltip: true,
  },
]

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const alertBtn = async () => {
  try {
    await Alert.create().warning('主要按钮消息提示框')
    console.log(1)
  } catch (error) {
    console.log(2)
  }
}
const successAlert = () => {
  Notification.success('这是一条成功提示')
}
const warningAlert = () => {
  Notification.warning('这是一条警告提示')
}
const infoAlert = () => {
  Notification.info('这是一条信息提示')
}
const errorAlert = () => {
  Notification.error('这是一条错误提示')
}
</script>

<style lang="scss" scoped>
.dialog_content {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #0064c9;
}
</style>
