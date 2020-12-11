<template>
    <Layout class-prefix="layout">
        <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
        <!--传给子组件的value的值是record.type，子组件要改的也是record.type，直接value.sync-->
        <div class="notes">
            <FormItem :value.sync="record.notes" field-name="备注" placeholder="请在这里输入备注"></FormItem>
        </div>
        <Tags :value.sync="record.tags"/>
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

@Component({
    components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
    get recordList() {
        return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0
    };

    created() {
        this.$store.commit('fetchRecords');
        this.$store.commit('fetchTags');
    }

    onUpdateNotes(value: string) {
        this.record.notes = value;
    }

    onUpdateAmount(value: string) {
        this.record.amount = parseFloat(value);
    }

    saveRecord() {
        if (!this.record.tags || this.record.tags.length === 0) {
            return window.alert('请选择一个标签');
        }
        this.$store.commit('createRecord', this.record);
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