<template>
    <div class="layout-wrapper" >
        <div class="content">
            <Types class="types" :value.sync="record.type"/>
            <div class="notes">
                <FormItem field-name="备注" placeholder="请在这里输入备注" @update:value="onUpdateNotes"/>
            </div>
            <Tags :value.sync="record.tags"/>
            <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
        </div>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {store} from '@/store/index2';


    @Component({
        components: {Tags, FormItem, Types, NumberPad}
    })
    export default class Money extends Vue {
        recordList = store.recordList;
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            store.createRecord(this.record);
            console.log(this.record);
        }
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        flex-direction: column;
    }

    .content {
        overflow: scroll;
    }

    .layout-content {
        display: flex;
        flex-direction: column-reverse;
        border: 1px solid red;
    }

    .notes {
        padding: 12px 0;
    }
    .types{
        height: 40px;
    }
</style>