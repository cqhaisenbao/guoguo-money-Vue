<template>
    <div>
        <Layout>
            编辑标签
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {tagListModel} from '@/models/tagListModel';

    @Component
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id;
            tagListModel.fetch;
            const tags = tagListModel.data;
            console.log(tags);
            const tag = tags.filter(t => t.id === id)[0];
            if (tag){
            console.log(tag);
            }else {
                //重定向
                this.$router.replace('/404')
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>