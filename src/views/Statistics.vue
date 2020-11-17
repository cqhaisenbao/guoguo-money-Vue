<template>
    <Layout>
        <div class="iconWrapper">
            <el-button class="icon" @click="drawer = true" type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <el-drawer class="el-drawer" @click="drawer = true"
                   title="记一笔"
                   direction="btt"
                   size="80%"
                   :wrapperClosable="true"
                   :withHeader='true'
                   :show-close='true'
                   :visible.sync="drawer"
                   :with-header="false">
            <EditMoney/>
        </el-drawer>

    </Layout>
</template>

<script>
    import EditMoney from "@/views/EditMoney";

    export default {
        name: "Statistics",
        components: {EditMoney},
        data() {
            return {
                drawer: false,
            }
        }
    }
</script>

<style>
    .iconWrapper {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 20px;
        bottom: 100px;
    }

    .iconWrapper > .icon {
        background: #364f6b;
        border: #364f6b;
    }

</style>