<template>
  <Frame :menuList="menuList">
    <template #logo>
      <div class="logo">LOGO</div>
    </template>
    <template #user>
      <div>image</div>
      <div>|</div>
      <div>user</div>
    </template>
    <RouterView />
  </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Frame from './components/frame.vue'
import { UserInfoService } from '@/api/userInfo'
import { RouterHelp } from '@/router/routerHelp'
import { userStore } from '@/stores/modules/user'
const UserService = new UserInfoService()
const menuList: any = ref(userStore().roles)

const getMenuList = async () => {
  menuList.value = userStore().roles
}
getMenuList()
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;
}
.logo {
  font-size: 28px;
}
.content {
  padding: 10px;
}
</style>
