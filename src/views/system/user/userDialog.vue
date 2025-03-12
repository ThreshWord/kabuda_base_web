<template>
  <el-dialog v-model="dialogVisible" title="用户信息" :before-close="close">
    <el-form ref="queryRef" :inline="true" label-width="82px">
      <el-form-item label="用户状态">
        <el-select v-model="form.userStatus" placeholder="请选择用户状态" style="width: 240px">
          <el-option
            v-for="item in userStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineExpose } from 'vue'
const emit = defineEmits(['submit'])
const userStatusOptions = [
  { label: '冻结', value: '0' },
  { label: '正常', value: '1' },
]

const form = ref({
  userStatus: '',
  userName: '',
})
const submit = () => {
  emit('submit')
}
const dialogVisible = ref(false)
const isEdit = ref(false)
const setDialogVisible = (type: boolean) => {
  dialogVisible.value = true
  isEdit.value = type
}

const close = () => {
  dialogVisible.value = false
}

defineExpose({ setDialogVisible })
</script>
