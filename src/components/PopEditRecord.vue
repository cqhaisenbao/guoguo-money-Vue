<template>
    <div>
        <span @click="showPopup" class="iconWrapper">编辑</span>
        <Popup position="bottom" round v-model="show" :style="{ height: '85%' }">
            <div class="editWrapper">
                <div class="topWrapper-record">
                    <ul class="record-tabs">
                        <li v-for="item in recordTypeList" :class="liClass(item)" :key="item.value" class="record-tabs-item" @click="select(item)">
                            {{ item.text }}
                        </li>
                    </ul>
                    <DataPick @timeupdate="onUpdateTime"/>
                </div>
                <Tags :selectedTag="currentRecord.tags[0]" :value.sync="currentRecord.tags"/>
                <div class="notes">
                    <FormItem field-name="备注" :placeholder="currentRecord.notes" :value.sync="currentRecord.notes"/>
                </div>
                <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" :popOutput="currentRecord.amount.toString()"/>
            </div>
        </Popup>
    </div>
</template>

<script lang="ts">
import {Popup} from 'vant';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import DataPick from "@/components/datePick.vue";
import Tags from '@/components/Money/Tags.vue';
import recordTypeList from '@/constants/recordTypeList';
import Vue from "vue";
import {Component} from 'vue-property-decorator';
import {Toast} from 'vant';

@Component({
    components: {Popup, NumberPad, FormItem, DataPick, Tags},
})

export default class EditLabel extends Vue {

    get currentRecord() {
        return this.$store.state.currentRecord;
    }

    record: RecordItem = {
        tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString(), id: 1
    };

    saveRecord() {
        this.$store.commit('updateRecord', this.currentRecord);
        Toast.success('修改成功');
        this.showPopup();
    }

    onUpdateAmount(value: string) {
        this.currentRecord.amount = parseFloat(value);
    }

    onUpdateTime(value: string) {
        this.currentRecord.createdAt = value;
    }

    show = false;
    recordTypeList = recordTypeList;
    selected = '';

    showPopup() {
        this.show = !this.show;
    }

    select(item: DataSourceItem) {
        this.selected = item.value;
        this.currentRecord.type = item.value;
    }

    liClass(item: DataSourceItem) {
        return {
            selected: item.value === this.currentRecord.type
        };
    }
}
</script>

<style lang="scss" scoped>
.editWrapper {
    height: 100%;
    padding-top: 10px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    .tags {
        flex-shrink: 0;
    }

    .numberPad {
        flex-shrink: 1;
    }
}

.topWrapper-record {
    display: flex;
    padding: 10px 20px;

    .record-tabs {
        flex-grow: 1;

        .record-tabs-item {
            display: inline-block;
            background: #e8e8e8;
            padding: 3px 15px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-right: 10px;
            flex-grow: 1;

            &.selected {
                background: #2b2e4a;
                color: white;
            }
        }
    }
}

.dateWrapper {
    background: #e8e8e8;
    display: inline-block;
    padding: 3px 15px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    margin-right: 10px;

    span {
        color: #bfbdbd;
    }
}

</style>
