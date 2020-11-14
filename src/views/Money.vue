<template>
    <Layout class-prefix="layout">
        <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
        <!--<Types :value="record.type" @update:value="onUpdateType"/>-->
        <!--传给子组件的value的值是record.type，子组件要改的也是record.type，直接value.sync-->
        <Types :value.sync="record.type"/>
        <div class="notes">
        <FormItem field-name="备注" placeholder="请在这里输入备注" @update:value="onUpdateNotes"/>
        </div>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {recordListModel} from '@/models/recordListModel';
    import {tagListModel} from '@/models/tagListModel';

    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch();

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
        components: {Tags, FormItem, Types, NumberPad}
    })
    export default class Money extends Vue {
        tags = tagList;
        recordList: RecordItem[] = recordList;
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
            console.log(this.record.notes);
        }

        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            // 深拷贝：先变成字符串，再变成对象，这样就不是同一个内存地址了
            const record2: RecordItem = recordListModel.clone(this.record);
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }

        @Watch('recordList')
        onRecordListChange() {
            recordListModel.save(this.recordList);
            console.log(recordList);
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }
</style>