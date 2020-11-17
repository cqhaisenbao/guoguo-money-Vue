<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected:selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">{{tag.name}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component} from 'vue-property-decorator';
    import {mixins} from 'vue-class-component';
    import TagHelper from '@/mixins/TagHelper';

    @Component
    export default class Tags extends mixins(TagHelper) {
        // tagList = store.fetchTags();
        selectedTags: string[] = [];

        get tagList(){
            return this.$store.state.tagList;
        }

        created() {
            this.$store.commit('fetchTags');
        }

        toggle(tag: string) {
            const length = this.selectedTags.length;
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {
                this.selectedTags.splice(index, 1);
            } else {
                if (length > 0) {
                    this.selectedTags.pop();
                }
                this.selectedTags.push(tag);
            }
            //update:value叫x也没事，只要和父组件事件名一样就能触发
            this.$emit('update:value', this.selectedTags);
        }
    }

</script>

<style lang="scss" scoped>
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

            > li {
                $bg: #d9d9d9;
                background: $bg;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background: #2b2e4a;
                    color: white;
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