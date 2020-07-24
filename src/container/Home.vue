<template>
    <div class="container">
        <section>
            <h2>Category</h2>
            <category-list  :category="category"/>
        </section>
        <section>
            <h2>Author</h2>
        </section>
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
            category: [],
            authors: []
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
<style scoped lang="less">
.container {
    section {
        max-width: 50rem;
        margin: 1rem auto;
        h2 {
            text-align: left;
        }
    }
}
</style>