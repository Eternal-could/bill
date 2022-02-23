<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="请输入备注"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
// const version = window.localStorage.getItem('version')||'0';
const recordList = recordListModel.fetch();
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
  components: {Tags, FormItem, Types, NumberPad},
})
export default class Money extends Vue {
  tags = window.tagList;
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
    recordListModel.create(this.record);
  }
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save()
  }
}
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>
