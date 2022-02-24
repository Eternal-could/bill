<template>
  <div>
    <ul class="types">
      <li
          :class="{selected: value==='-',[classPrefix + '-item']:classPrefix}"
          @click="selectType('-')"
      >支出
      </li>
      <li
          :class="{selected: value==='+',[classPrefix + '-item']:classPrefix}"
          @click="selectType('+')"
      >收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop,} from 'vue-property-decorator';
// 1 自动提示更智能
// 2 你不能随便写 .toString()
// 3 编译报错， 无法变成js  严谨

@Component
export default class Types extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  //type = '-';  // - 代表支出 + 代表收入 相当于js的data（）{return {type:'-'}}
  //@Prop(Number) xxx: number | undefined;
  // Prop 告诉Vue.xxx 不是data而是prop
  // Number 告诉Vue.xxx 运行时 是个Number
  // xxx是属性名
  // number | undefined 告诉 TS xxx的 编译时 类型
  // 左侧Number是运行时， 右侧number和undefined是编译时
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type)
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
}
</style>