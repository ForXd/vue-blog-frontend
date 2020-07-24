<template>
    <slide-menu :menu="menu">
        <template #0>
            <h1>1</h1>
        </template>
        <template #1>
            <h1>2</h1>
        </template>
    </slide-menu>
</template>
<script>
import SlideMenu from './SlideMenu';
export default {
    components: {
        SlideMenu
    },
    props: {
        id:String,
    },
    data() {
        return {
            menu: [
                '收藏文章','关注作者'
            ]
        }
    },
    mounted() {
        console.log(this.id);
    }
}
</script>
<style scoped>

</style>