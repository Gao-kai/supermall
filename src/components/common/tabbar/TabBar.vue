<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
.tabbar {
  width: 100%;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f7f5f7;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px;
}
</style>