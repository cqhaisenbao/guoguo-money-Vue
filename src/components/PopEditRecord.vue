<template>
    <div>
        <div @click="showPopup" class="iconWrapper">
            点我
        </div>
        <Popup position="bottom" round v-model="show" :style="{ height: '80%' }">
            <div>
                <div class="topWrapper-record">
                    <ul class="record-tabs">
                        <li v-for="item in recordTypeList" :class="liClass(item)" :key="item.value" class="record-tabs-item" @click="select(item)">
                            {{ item.text }}
                        </li>
                    </ul>
                    <DataPick/>
                </div>
                <!--<Tabs :data-source="recordTypeList"/>-->
                <Tags/>
                <div class="notes">
                    <FormItem field-name="备注" placeholder="请在这里输入备注">
                    </FormItem>
                </div>
                <NumberPad/>
            </div>
        </Popup>
    </div>
</template>

<script>
import {Popup} from 'vant';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import DataPick from "@/components/datePick.vue";
import Tags from '@/components/Money/Tags.vue';
// import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


export default {
    components: {Popup, NumberPad, FormItem, DataPick, Tags},

    data: () => {
        return {
            show: false,
            recordTypeList: recordTypeList,
            selected: '',
        };
    },
    methods: {
        // check(value) {
        //     this.show = false;
        //     this.$emit('timeupdate', value.toISOString());
        // },
        showPopup() {
            this.show = !this.show;
        },
        select(item) {
            this.selected = item.value
            console.log(this.selected);
            // this.$emit('update:value', item.value);
        },
        liClass(item) {
            return {
                selected: item.value === this.selected
            };
        }
    }
};
</script>

<style lang="scss" scoped>

.topWrapper-record {
    margin-top: 20px;
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
