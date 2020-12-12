<template>
    <Layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goBack"/>
            <span class="title">编辑记录</span>
            <span class="rightIcon"/>
        </div>
        {{ currentRecord }}
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
            <Button>编辑记录</Button>
        </div>
        <PopEditRecord/>
    </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from "@/components/Button.vue";
import PopEditRecord from "@/components/PopEditRecord.vue";

@Component({
    components: {Button, PopEditRecord},
})
export default class EditRecord extends Vue {
    get currentRecord() {
        return this.$store.state.currentRecord;
    }

    created() {
        const id = +this.$route.params.id;
        this.$store.commit('fetchRecords');
        this.$store.commit('setCurrentRecord', id);
        if (!this.currentRecord) {
            console.log(this.currentRecord);
            //重定向
            this.$router.replace('/404');
        }
    }

    //
    // update(name: string) {
    //     if (this.currentTag) {
    //         this.$store.commit('updateTag', {
    //             id: this.currentTag.id, name:name
    //         });
    //     }
    // }
    //
    remove() {
        if (this.currentRecord) {
            this.$store.commit('removeRecord', this.currentRecord.id);
        }
    }

    goBack() {
        this.$router.back();
    }
}
</script>

<style lang="scss" scoped>

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