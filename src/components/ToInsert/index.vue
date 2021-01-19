<template>
  <div class="to-insert">
    <div class="shadow" @click="close"></div>
    <div class="content">
      <div class="input-item">
        <div class="title">
          <span>新增一条任务记录</span>
        </div>
        <div class="text df ac">
          <input v-model="text" class="f1" type="text" placeholder="text" />
        </div>
        <div class="date df">
          <div class="df ac">
            <span>日期</span>
            <input class="f1" v-model="date" type="text" />
          </div>
          <div class="df ac">
            <span>时间</span>
            <input class="f1" v-model="time" type="text" />
          </div>
        </div>
      </div>
      <div class="input-item">
        <div class="type">
          <span :class="type === 'date' ? 'select' : ''" @click="type = 'date'">日期</span>
          <span :class="type === 'normal' ? 'select' : ''" @click="type = 'normal'">一般</span>
          <span :class="type === 'important' ? 'select' : ''" @click="type = 'important'">紧急</span>
        </div>
        <div class="submit" @click="submit"><span>新建任务</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmit } from 'vue';
import validate from './validate';

const curDate = new Date();
const emit = defineEmit<{
  (e: 'insert', item: InputItem): void;
  (e: 'close'): void;
}>();
ref: text = '';
ref: date = `${curDate.getMonth() + 1}/${curDate.getDate()}`;
ref: time = `${curDate.getHours()}:${curDate.getMinutes()}`;
ref: type = 'date';
const close = () => {
  emit('close');
};
const submit = () => {
  if (!text) {
    return false;
  }
  const inputItem = { text, date, time, type };
  if (validate(inputItem)) {
    emit('insert', inputItem);
  }
};
</script>
<style scoped>
.to-insert .shadow,
.to-insert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.to-insert .shadow {
  background-color: #000;
  opacity: 0.5;
}
input {
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  outline: none;
  border: 0;
  font-size: 16px;
  background-color: #ddd;
  -webkit-appearance: none;
  appearance: none;
  box-shadow: inset 2px 2px 8px #888;
}
.content {
  position: absolute;
  left: 7vw;
  top: 22vh;
  border-radius: 5px;
  overflow: hidden;
  background: #333;
}
.input-item {
  box-shadow: 2px 2px 4px #888;
}
.input-item > div {
  width: 82vw;
  padding: 6px;
}
.input-item .title {
  color: #fff;
  padding-top: 20px;
  padding-bottom: 10px;
  font-size: 15px;
}
.input-item .type {
  background: #ddd;
}
.input-item .submit {
  left: 25px;
  top: 56vh;
  padding: 20px 6px;
  color: #ddd;
  text-align: center;
}
.title > span {
  margin-left: 10px;
}
.text > input {
  color: #333;
  background-color: #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 0;
  margin-left: 3vw;
  margin-right: 3vw;
}
.date > div {
  color: #ddd;
  padding: 10px;
  margin-bottom: 5px;
}
.date input {
  width: 70px;
}
.type span {
  display: inline-block;
  padding: 5px 11px;
  margin-right: 5px;
  border-radius: 5px;
  margin-left: 5px;
}
.type span.select {
  background-color: #333;
  color: #fff;
  box-shadow: 2px 2px 2px #888;
}
</style>
