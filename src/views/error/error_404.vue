<template>
  <div class="error"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.error {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/404.png') no-repeat;
  background-size: cover;
}
.submit {
  cursor: pointer;
  position: absolute;
  top: 67%;
  left: 68%;
  padding: 6px 12px;
  color: #fff;
  background: linear-gradient(90deg, #1d56ee, #23a1fa);
  border-radius: 4px;
}
</style>
