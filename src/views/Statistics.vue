<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
                <ol>
                    <router-link :to="`/record/${item.id}`" v-for="item in group.items" :key="item.id" class="record">
                        <Icon class="icon" :name="item.tags[0].name"/>
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="note">{{ item.notes }}</span>
                        <span>￥{{ item.amount }} </span>
                    </router-link>
                </ol>
            </li>
        </ol>
        <div class="noResult" v-else>目前没有相关记录</div>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import {clone} from '@/lib/clone';

@Component({
    components: {Tabs}
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        if (tags.length === 0) {
            return '无';
        } else {
            const [{name}] = tags;
            return name;
        }
    }

    beautify(string: string) {
        const day = dayjs(string);
        const now = dayjs();
        if (day.isSame(now, 'day')) {
            return '今天';
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天';
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天';
        } else if (day.isSame(now, 'year')) {
            return day.format('M月D日');
        } else {
            return day.format('YYYY年M月D日');
        }
    }

    get recordList() {
        return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
        const {recordList} = this;
        if (recordList.length === 0) {return [];}
        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        if (newList.length === 0) {return [] as Result;}
        //eslint-disable-next-line
        type Result = { title: string, total?: number, items: RecordItem[] }[]
        const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i];
            const last = result[result.length - 1];
            if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                last.items.push(current);
            } else {
                result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
            }
        }
        result.map(group => {
            group.total = group.items.reduce((sum, item) => {
                return sum + item.amount;
            }, 0);
        });
        return result;
    }

    beforeCreate() {
        this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult {
    padding: 16px;
    text-align: center;
}

::v-deep {
    .type-tabs-item {

        &.selected {
            background: white;

            &::after {
                display: none;
            }
        }
    }

    .interval-tabs-item {
        height: 48px;
    }
}

%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.title {
    @extend %item;
}

//ol {
//
//}
li {
    margin: 10px 5px 0;
    background: #FBFBFB;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .record {
        background: #FFFFFF;
        @extend %item;
        line-height: 30px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;

        .icon {
            width: 28px;
            height: 28px;
            color: #2b2e4a;
            margin-right: 10px;
        }

        .note {
            margin-right: auto;
            margin-left: 16px;
            color: #999;
        }
    }
}


</style>