<template>
    <div class="formWrapper">
        <div class="formItem">
            <label>
                <span class="name">{{ this.fieldName }}</span>
                <input type="text" :value="value" @change="onValueChanged($event.target.value)"
                       :placeholder="placeholder">
            </label>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import DataPick from "@/components/datePick.vue";

@Component({
    components: {DataPick}
})
export default class FormItem extends Vue {
    @Prop({default: ''}) value!: string;

    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;

    onValueChanged(value: string) {
        //叫x:value也可以
        this.$emit('update:value', value);
    }
}
</script>

<style lang="scss" scoped>

.formItem {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    label{
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    > div {
        flex-shrink: 0;
    }

    .name {
    }

    input {
        height: 40px;
        flex-grow: 1;
        background: transparent;
        border: none;
        margin-left: 10px;
    }
}
</style>