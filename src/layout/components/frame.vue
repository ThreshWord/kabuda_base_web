<template>
  <div class="frame">
    <div class="frame_main">
      <div v-if="!hideMenu" class="frame_left" :style="{ width: menuWidth + 'px' }">
        <div class="frame_logo">
          <slot name="logo">
            <span>基础框架</span>
          </slot>
        </div>
        <div v-loading="!menuList" class="frame_menu">
          <Menu v-if="menuList" :menu-list="menuList" :unique-opened="uniqueOpened" />
        </div>
      </div>
      <div class="frame_right">
        <div class="frame_header">
          <div class="frame_navigator">
            <slot name="navigator" />
          </div>
          <slot name="user" />
        </div>
        <div class="frame_content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import Menu from './menu/index.vue'
import { type IMenu } from '../../interface/IMenu'

defineProps({
  /**
   * # 左侧宽度
   */
  menuWidth: {
    type: Number,
    default: 250,
  },

  /**
   * # 菜单列表
   * ---
   * ### 💡 请确保传入的数组类型为 ```IMenu``` 的实现类
   */
  menuList: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },

  /**
   * # 是否只保持展开一个菜单
   */
  uniqueOpened: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏菜单
   */
  hideMenu: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.frame {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .frame_logo {
    word-break: keep-all;
    text-align: center;
    cursor: pointer;
    user-select: none;

    span {
      margin-left: 16px;
      font-size: 24px;
      font-weight: bold;
      color: var(--el-color-primary);
      user-select: none;
    }
  }
  .frame_main {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: row;
    background-color: #f3f5f9;

    .frame_header {
      padding: 0 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      min-height: 50px;
      border-bottom: 1px solid var(--el-color-primary-light-8);

      .frame_navigator {
        flex: 1;
        font-size: 14px;
        color: #aaa;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        width: 0;
        margin: 0 20px;
      }
    }
    .frame_left {
      display: flex;
      flex-direction: column;
      background: #fff;
      margin: 5px;
      border-radius: 4px;

      .frame_menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        height: 0;
        overflow: hidden;
        overflow-y: auto;
        padding: 10px;

        .item {
          padding: 5px 15px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          border-radius: 5px;
          color: var(--el-color-primary);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          i {
            margin-right: 3px;
            font-weight: bold;
          }
        }

        .item:hover {
          background-color: #f5f5f5;
        }
      }

      .frame_menu::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    .frame_right {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      background: #f3f5f9;
      margin: 5px 5px 5px 0;
      border-radius: 5px;
      .frame_content {
        margin-top: 5px;
        max-height: calc(100% - 50px);
        overflow: auto;
      }
    }
  }
}
</style>
