<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
          :value="currentTag.name"
          @update:value="update"
          field-name="标签名"
          placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get currentTag() {
    return this.$store.state.currentTag
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    const id = this.$route.params.id
    this.$store.commit('fetchTags')
    this.$store.commit('setCurrentTag',id)
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  update(name: string) {
    if (this.currentTag) {
      // TODO
      this.$store.commit('updateTag',{
        id: this.currentTag.id, name
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag',this.currentTag.id);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>