<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes field-name="备注" @update:value="onUpdateNotes" placeholder="请输入备注"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
// const version = window.localStorage.getItem('version')||'0';
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
//
//
// if (version === '0.0.1') {
//   // 数据库升级，数据迁移
//   recordList.forEach(record=>{
//     record.createAt = new Date(2022,1,21);
//   })
//   window.localStorage.setItem('recordList', JSON.stringify(recordList)); //保存数据
// } else if (version === '0.0.2') {
//   // 可以复用
// }
//
// window.localStorage.setItem('version','0.0.2');



@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = tagList;
  record: RecordItem = {tags: [], notes: '', type:'-', amount: 0 };
  recordList: RecordItem[] = recordList;

  onUpdateTags(value:string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    // 深拷贝
    const deepClone: RecordItem = recordListModel.clone(this.record)
    deepClone.createAt = new Date();
    this.recordList.push(deepClone);
  }
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList)
  }
}
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
