<template>
    <Layout class-prefix="layout">
        <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
        <div class="notes">
            <FormItem :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注">
                <DataPick @timeupdate="onUpdateTime"/>
            </FormItem>
        </div>
        <Tags :value.sync="record.tags" :type="record.type"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
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
import DataPick from "@/components/datePick.vue";
import {Toast} from 'vant';

@Component({
    components: {Tabs, Tags, FormItem, NumberPad, DataPick},
})
export default class Money extends Vue {
    get recordList() {
        return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString(), id: 1
    };

    created() {
        this.$store.commit('fetchRecords');
        this.$store.commit('fetchTags');
    }

    onUpdateTime(value: string) {
        this.record.createdAt = value;
    }

    // onUpdateNotes(value: string) {
    //     this.record.notes = value;
    // }

    onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);
    }

    saveRecord() {
        if (!this.record.tags || this.record.tags.length === 0) {
            return window.alert('请选择一个标签');
        }
        const dateId = Date.parse(this.record.createdAt!);
        this.record.id = Math.random() + dateId;
        this.$store.commit('createRecord', this.record);
        console.log(this.record.id);
        Toast.success('已记一笔');
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