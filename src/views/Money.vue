<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
        <div class="notes">
            <FormItem :value.sync="record.notes"
                      field-name="备注" placeholder="请在这里输入备注"/>
        </div>
        <Tags :value.sync="record.tags"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import recordTypeList from '@/constants/recordTypeList';
    import Tabs from '@/components/Tabs.vue';

    // const version = window.localStorage.getItem('version') || '0';
    // if (version === '0.0.1') {
    //     数据迁移 | 数据库升级
    //     recordList.forEach(record => {
    //         record.createdAt = new Date(2020, 0, 1);
    //     });
    //     升级完成，保存数据
    //     window.localStorage.setItem('recordList', JSON.stringify(recordList));
    // }
    // 升级版本
    // window.localStorage.setItem('version', '0.0.2');

    @Component({
        components: {Tabs, Tags, FormItem, NumberPad},
    })
    export default class Money extends Vue {

        recordTypeList = recordTypeList;

        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };

        // onUpdateNotes(value: string) {
        //     this.record.notes = value;
        // }

        // onUpdateAmount(value: string) {
        //     this.record.amount = parseFloat(value);
        // }

        saveRecord() {
            if (!this.record.tags || this.record.tags.length === 0) {
                return window.alert('请选择一个标签');
            }
            this.$store.commit('createRecord', this.record);
            console.log(this.record);
            this.record.notes = '';
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