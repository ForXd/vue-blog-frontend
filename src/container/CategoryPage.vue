<template>
    <div>
        <category-list  :category="category"/>
    </div>
</template>
<script>
import CategoryList from '@/components/category/CategoryList.vue';
import { getCategory } from '@/api/post.js';
export default {
    components: {
        CategoryList,
    },
    data() {
        return {
            category: []
        }
    },
    created() {
        getCategory()
        .then(res => {
            this.category.splice(0, ...res.category);
        })
    }
}
</script>
<style scoped>
div {
    width: 80%;
    margin: 0 auto;
}
</style>