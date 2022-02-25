<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList"
      :value.sync="record.type"
    />
    <div class="notes">
      <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="请输入备注"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from "@/constants/recordTypeList";
// const version = window.localStorage.getItem('version')||'0';
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
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList(){
    return store.state.recordList;
  }
  record: RecordItem = {tags: [], notes: '', type:'-', amount: 0 };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit('fetchRecords')
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    // 深拷贝
    this.$store.commit('createRecord',this.record);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes {
    padding: 12px 0;
  }
</style>
