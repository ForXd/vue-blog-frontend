<template>
    <slide-menu :menu="menu">
        <template #0>
            <h1>1</h1>
        </template>
        <template #1>
            <h1>2</h1>
        </template>
        <template #2>
            <h1>3</h1>
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
                '我的动态','最新信息', '浏览记录'
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