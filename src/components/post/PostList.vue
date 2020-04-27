<template>
    <div class="container">
        <post-item v-for="item in items" 
                   :post="item" 
                   :key="item.id"/>
    </div>
</template>
<script>
import PostItem from './PostItem.vue';
export default {
    components: {
        PostItem
    },
    props: {
        items: Array
    },
    mounted() {
        console.log(this.items);
    },
}
</script>
<style scoped>

</style>

