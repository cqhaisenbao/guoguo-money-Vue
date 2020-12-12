<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected:selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">
                <div>
                    <Icon :name="setName(tag)"/>
                </div>
                {{ tag.name }}
            </li>
            <li>
                <div>
                    <router-link to="/labels">
                        <Icon name="编辑"/>
                    </router-link>
                </div>
                编辑标签
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import EditLabel from '@/views/EditLabel.vue';
import Labels from '@/views/Labels.vue';

@Component({
    components: {Labels, EditLabel}
})
export default class Tags extends mixins(TagHelper) {
    // @Prop(String)
    // readonly type!: string;
    //
    selectedTags: string[] = [];
    // currentLabel = true;

    // @Watch('type')
    // changeLabel() {
    //     this.currentLabel = this.type === '-';
    // }

    get tagList() {
        return this.$store.state.tagList;
    }

    get tagIncome() {
        return this.$store.state.tagIncome;
    }

    setName(tag: Tag) {
        if (tag.name.toString().indexOf('吃') >= 0) {
            return '吃饭';
        } else if (tag.name.toString().indexOf('衣') >= 0) {
            return '衣服';
        } else if (tag.name.toString().indexOf('交通') >= 0) {
            return '交通';
        } else if (tag.name.toString().indexOf('日用品') >= 0) {
            return '日用品';
        } else if (tag.name.toString().indexOf('住房') >= 0) {
            return '住';
        } else if (tag.name.toString().indexOf('水') >= 0) {
            return '水电气';
        } else if (tag.name.toString().indexOf('娱乐') >= 0) {
            return '娱乐';
        } else if (tag.name.toString().indexOf('人情往来') >= 0) {
            return '人情往来';
        } else if (tag.name.toString().indexOf('编辑标签') >= 0) {
            return '编辑';
        } else {
            return '自定义';
        }
    }

    created() {this.$store.commit('fetchTags');}

    toggle(tag: string) {
        const length = this.selectedTags.length;
        if (length > 0) {
            this.selectedTags.pop();
        }
        this.selectedTags.push(tag);
        this.$emit('update:value', this.selectedTags);
    }
}

</script>

<style lang="scss" scoped>
.router {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.current::-webkit-scrollbar {
    display: none
}

.tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;

    > .current {
        display: flex;
        flex-wrap: wrap;
        flex-flow: row nowrap;
        overflow-x: auto;
        list-style: none;
        margin-left: -6px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        > li {
            align-items: center;
            display: flex;
            flex-direction: column;
            white-space: nowrap;
            padding: 0 8px;
            margin-right: 6px;
            margin-top: 4px;
            color: gray;
            font-size: 12px;

            .icon {
                width: 28px;
                height: 28px;
                fill: #c4c4c4;
                display: block;
                margin-bottom: 3px;

            }

            &.selected {
                color: #333333;

                .icon {
                    fill: #e84545;
                }
            }
        }
    }

    > .new {
        padding-top: 16px;

        button {
            background: transparent;
            border: none;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px;
        }
    }
}
</style>