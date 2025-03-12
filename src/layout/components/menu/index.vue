<template>
  <el-menu
    class="menu-tree"
    :default-active="defaultMenu"
    :router="true"
    :unique-opened="uniqueOpened"
  >
    <ChildMenu :menu-list="menuList" />
  </el-menu>
</template>

<script lang="ts" setup>
import { type PropType, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import ChildMenu from './childMenu.vue'
import { type IMenu } from '../../../interface/IMenu'

defineProps({
  /**
   * # 菜单列表
   * ---
   * ### 💡 请确保传入的数组类型为 ```IMenu``` 的实现类
   */
  menuList: {
    type: Array as PropType<IMenu[]>,
    required: true,
  },

  /**
   * # 是否只保持展开一个菜单
   */
  uniqueOpened: {
    type: Boolean,
    default: false,
  },
})

/**
 * 菜单状态激活
 */
// eslint-disable-next-line no-restricted-globals
const defaultMenu = ref(location.pathname)

/**
 * 路由
 */
const route = useRoute()

/**
 * 监听路由
 */
watch(
  () => route,
  // eslint-disable-next-line
  (newVal) => {
    // eslint-disable-next-line no-restricted-globals
    defaultMenu.value = newVal.path || location.pathname
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style lang="scss">
.menu-tree {
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  user-select: none;

  .is-opened {
    > .el-sub-menu__title {
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .el-sub-menu__title,
  .el-menu-item {
    height: 40px;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: var(--el-menu-hover-bg-color);
  }

  .el-menu-item.is-active {
    color: white;
    background-color: var(--btn-primary-color);
  }
}

.menu-tree .el-menu-item.is-active {
  position: relative;
  background: #f3f4f7 !important;
  color: #000 !important;
  &:before {
    content: '';
    position: relative;
    left: -10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--btn-primary-color);
    border: 0px;
  }
}

.menu-tree .el-menu-item {
  &:before {
    content: '';
    position: relative;
    left: -10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid #acacac;
    // background-color: #0463f6;
  }
}
</style>
