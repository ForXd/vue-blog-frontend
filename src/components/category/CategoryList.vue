<template>
    <div>
        <category-item 
        v-for="(val, i) in category" 
        :key="i" 
        :name="val.name"/>
    </div>
</template>
<script>
import CategoryItem from './CategoryItem.vue';
export default {
    components: {
        CategoryItem
    },
    props: {
        category: Array
    },
}
</script>
<style scoped>
div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>