<template>
  <div class="content to-button-ripple" ref="buttonRef">
    <slot></slot>
    <div :class="['shadow', active ? 'active' : '']"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue';
import { ToTouch } from '../../Touch';
const emit = defineEmit(['focused']);
ref: buttonRef = null as HTMLElement | null;
defineProps({
  active: {
    type: Boolean,
    default: () => true,
  },
});
ToTouch.focused(buttonRef, () => {
  emit('focused');
});
</script>
<style scoped>
.content {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.shadow {
  position: absolute;
  top: calc(-100vw / 2 + 50%);
  left: 0;
  height: 100vw;
  width: 100%;
  border-radius: 100vw;
  background-color: #333;
  opacity: 0;
  transform: scale(0.1);
}
.content:active .shadow.active {
  opacity: 0.3;
  transition: transform 1s ease-in-out;
  transform: scale(1);
}
</style>
