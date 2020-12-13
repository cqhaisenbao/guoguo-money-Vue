<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="记账本"/>
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="统计" class="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
export default {
    name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    padding-top: 5px;

    > .item {
        padding: 2px 0;
        width: 33.33333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;


        .icon {
            width: 28px;
            height: 28px;

            &.statistics {
                width: 22px;
                height: 22px;
            }
        }
    }

    > .item.selected {
        color: $color-highlight;
    }
}
</style>