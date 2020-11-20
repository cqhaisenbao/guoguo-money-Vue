<template>
    <div>
        <div class="block">
            <el-date-picker
                    type="date"
                    :editable="false"
                    v-model="value"
                    :placeholder="now">
            </el-date-picker>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import dayjs from 'dayjs';

    @Component
    export default class SelectedDate extends Vue {
        drawer = false;
        now = dayjs().format('YYYY-MM-DD');
        value = '';
    }
</script>

<style lang="scss" scoped>
    .day {
        background: #c6c6c6;
        padding: 3px 6px;
        border-radius: 20px;
        display: inline-block;
        color: #333333;

        .icon {
            fill: #999999;
        }
    }

    .is-selected {
        color: #1989FA;
    }
</style>