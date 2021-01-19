<template>
  <ToContainer class="container full-screen" @click="onclick">
    <ToHeader></ToHeader>
    <div class="home">
      <div class="comment">“双击新增计划，左右滑动切换任务类型”</div>
      <div class="comment">“拖动计划，可重新分组”</div>
      <div class="title df ac">
        <span class="name">日常普通任务</span>
        <div class="date df">
          <div class="item month">
            <div class="value">{{ month }}</div>
            <div class="key">MONTH</div>
          </div>
          <div class="item day">
            <div class="value">{{ day }}</div>
            <div class="key">DAYS</div>
          </div>
        </div>
      </div>
      <ul class="items">
        <li class="item df ac" v-for="(item, index) in todoItems" :key="index">
          <span>{{ index + 1 }}.</span>
          <ToButtonRipple :active="123123" @focused="completeItem(item)">
            <div class="f1 text">
              <div class="complete-shadow" v-show="item.complete"></div>
              <div class="complete-text" v-show="item.complete">complete</div>
              {{ item.text }}
            </div>
          </ToButtonRipple>
        </li>
      </ul>
    </div>
    <ToInsert @insert="insertItem" @close="closeLayer" v-if="onInsert"></ToInsert>
  </ToContainer>
</template>

<script lang="ts" setup>
import ToContainer from '../../components/ToContainer.vue';
import ToHeader from '../../components/ToHeader.vue';
import ToInsert from '../../components/ToInsert/index.vue';
import ToButtonRipple from '../../components/ToButtonRipple/index.vue';
import { ToTouch } from '../touch/index';
import { createIssue, getIssues } from '../api';
import { onMounted } from 'vue';

const date = new Date();
ref: onInsert = false;
ref: onPrevent = false;
ref: todoItems = [] as Array<InsetItem>;
ref: month = (date.getMonth() + 1) as number;
ref: day = date.getDate();
ref: timeStamp = 0;
const onclick = (event: Event) => {
  if (onPrevent) {
    onPrevent = false;
    return false;
  }
  if (onInsert) {
    return false;
  }
  if (ToTouch.double(event)) {
    if ((event.target as HTMLElement).className.indexOf('full-screen') !== -1) {
      onInsert = true;
    }
  }
};
const closeLayer = () => {
  if (onInsert) {
    onInsert = false;
    onPrevent = true;
  }
};
const completeItem = (item: InsetItem) => {
  item.complete = true;
  console.log(123123);
};
const insertItem = <T extends InputItem | any>(item: T & InputItem) => {
  const [month, day] = item.date.split('/');
  const inputItem: InsetItem = {
    type: item.type,
    text: item.text,
    month,
    day,
    time: item.time,
    complete: false,
  };
  createIssue(inputItem).then((res) => {
    if (res.status === 200) {
      todoItems.push(inputItem);
    }
  });
  onInsert = false;
  onMounted(() => {
    getIssues().then((res) => {
      const issues = res.data;
      for (let i = 0; i < issues.length; i++) {
        const { title, body } = issues[i];
        switch (title) {
          case 'todoItem':
            todoItems.push(JSON.parse(body));
            break;
          default:
            break;
        }
      }
    });
  });
};
</script>
<style scoped>
.container {
  background: linear-gradient(#ccc, 5vh, #fff);
}
.home {
  padding: 1vw;
}
.comment {
  padding-left: 20px;
  font-size: 14px;
}
.title {
  position: relative;
  background-color: #333;
  box-shadow: 1px 1px 3px #888;
  height: 40px;
  padding-left: 20px;
  margin-top: 10px;
  border-radius: 3px;
  color: #fff;
}
.name {
  position: absolute;
  height: 40px;
  background: linear-gradient(to right, #7c0403, #333);
  display: flex;
  align-items: center;
  width: 180px;
  left: 0;
  border-radius: 3px;
  padding-left: 20px;
}
.title .date {
  position: absolute;
  right: 10px;
  top: -25px;
}
.title .date .value {
  position: absolute;
  font-size: 25px;
  background-color: #7c0403;
  padding: 5px 0;
  width: 69px;
  border-radius: 3px;
  text-align: center;
  box-shadow: 2px 2px 2px #000;
}
.title .date .key {
  background-color: #444;
  font-size: 12px;
  border-radius: 2px;
  box-shadow: 0 2px 8px #000;
  padding: 0 12px;
  padding-top: 3px;
  width: 45px;
  text-align: center;
  margin-top: 42px;
}
.title .date .month {
  margin-right: 5px;
}
.title .date .day .value {
  background-color: #fff;
  color: #000;
}
.items {
  padding: 0;
}
.items .item {
  padding: 0;
  list-style: none;
  margin-bottom: 12px;
  margin-right: 30px;
  padding-left: 20px;
  position: relative;
}
.items .item .text {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.items .item .complete-text,
.items .item .complete-shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #999;
  opacity: 0.9;
}
.items .item .complete-text {
  opacity: 1;
  color: #333;
  font-size: 25px;
  display: flex;
  align-items: center;
  background: transparent;
  justify-content: flex-end;
  padding-right: 30px;
  box-sizing: border-box;
}
.item > span {
  margin-right: 10px;
}
.item .to-button-ripple {
  background-color: #ddd;
  border: 1px solid #d9d9d9;
  box-shadow: 2px 2px 2px #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  color: #333;
}
</style>
