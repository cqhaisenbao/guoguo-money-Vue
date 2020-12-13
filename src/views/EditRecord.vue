<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goBack"/>
            <span class="title">编辑记录</span>
            <span class="rightIcon"/>
        </div>
        <div class="content">
            <div class="line-1">
                <Icon class="recordIcon" :name="currentRecord.tags[0].name"/>
                <span>{{ currentRecord.tags[0].name }}</span>
            </div>
            <div class="money">{{ currentRecord.type + ' ' + parseFloat(currentRecord.amount).toFixed(2) }}</div>
            <div class="createdAt">
                <span>记录时间：</span>
                <span>{{ createdAt }}</span>
            </div>
            <footer>
                <span @click="remove"><Icon class="icon" name="垃圾桶"/>删除</span>
                <span class="span-line">|</span>
                <span><Icon class="icon" name="record-edit"/><PopEditRecord :popCurrentRecord="currentRecord"/></span>
            </footer>
        </div>

    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from "@/components/Button.vue";
import PopEditRecord from "@/components/PopEditRecord.vue";
import dayjs from 'dayjs';
import {Dialog} from 'vant';

@Component({
    components: {Button, PopEditRecord},
})
export default class EditRecord extends Vue {
    get currentRecord() {
        return this.$store.state.currentRecord;
    }

    createdAt = '';

    created() {
        const id = +this.$route.params.id;
        this.$store.commit('fetchRecords');
        this.$store.commit('setCurrentRecord', id);
        this.createdAt = dayjs(this.currentRecord.createdAt).format('YYYY年MM月DD日');
        if (!this.currentRecord) {
            this.$router.replace('/404');
        }
    }

    remove() {
        Dialog.confirm({
            title: '删除记录',
            message: '是否确认删除'
        }).then(() => {
            if (this.currentRecord) {
                this.$store.commit('removeRecord', this.currentRecord.id);
            }
        }).catch(() => {
            return;
        });

    }

    goBack() {
        this.$router.back();
    }
}
</script>

<style lang="scss" scoped>

%df {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    @extend %df;
    flex-direction: column;
    margin: 10px;
    background: #FBFBFB;
    border-radius: 15px;
    padding: 20px 10px 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .line-1 {
        @extend %df;

        .recordIcon {
            width: 25px;
            height: 25px;
            fill: #2b2e4a;
            margin-right: 5px;
        }
    }

    .money {
        font-size: 30px;
        font-weight: 600;
        margin-top: 10px;
    }

    .createdAt {
        margin-top: 20px;
        font-size: 14px;
        color: #666666;
    }

    footer {
        margin-top: 10px;
        padding: 17px;
        border-top: 1px solid #f2f2f2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        span {
            font-size: 18px;

            &.span-line {
                border-right:1px solid rgba(0, 0, 0, 0.1);
                margin-right: 1px;
                color:rgba(0,0,0,0) ;
            }

            &:first-child {
                width: 50%;
                @extend %df;
                color: red;
            }

            &:last-child {
                width: 50%;
                @extend %df;
                color: #333333;
            }

            .icon {
                width: 23px;
                height: 23px;
                padding-right: 8px;
            }
        }
    }
}


.card {
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

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