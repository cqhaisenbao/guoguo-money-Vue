<template>
    <div>
        {{currentRecord}}
        <div @click="showPopup" class="iconWrapper">点我</div>
        <Popup position="bottom" round v-model="show" :style="{ height: '85%' }">
            <div class="editWrapper">
                <div class="topWrapper-record">
                    <ul class="record-tabs">
                        <li v-for="item in recordTypeList" :class="liClass(item)" :key="item.value" class="record-tabs-item" @click="select(item)">
                            {{ item.text }}
                        </li>
                    </ul>
                    <DataPick/>
                </div>
                <Tags/>
                <div class="notes">
                    <FormItem field-name="备注" placeholder="请在这里输入备注"/>
                </div>
                <NumberPad/>
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
import {Component, Prop} from 'vue-property-decorator';
// import Button from "@/components/Button";

@Component({
    components: {Popup, NumberPad, FormItem, DataPick, Tags},
})

export default class EditLabel extends Vue {
    // @Prop({type: Object})
    // popCurrentRecord: RecordItem | undefined;

    get currentRecord() {
        return this.$store.state.currentRecord;
    }

    created() {
        // const id = this.popCurrentRecord!.id;
        // console.log(id);
    }

    show = false;
    recordTypeList = recordTypeList;
    selected = '';

    showPopup() {
        this.show = !this.show;
    }

    select(item: DataSourceItem) {
        this.selected = item.value;
        console.log(this.selected);
        // this.$emit('update:value', item.value);
    }

    liClass(item: DataSourceItem) {
        return {
            selected: item.value === this.selected
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
