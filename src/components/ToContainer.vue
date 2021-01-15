<template>
  <div>
    <slot></slot>
  </div>
</template>
<style>
.df {
  display: flex;
}
.f1 {
  flex: 1;
}
.ac {
  align-items: center;
}
.full-screen {
  position: absolute;
  width: 100vw;
  height: 85vh;
  overflow: hidden;
  left: 0;
  right: 0;
}
</style>
