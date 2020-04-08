<template>
    <div class="container">
        <div class="post-list">

        </div>
        <div class="category-list">

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            posts: [],
            post_page_num:1,
            post_count: 0,
            page_count: 10,

            categories: [],
        }
    },
    methods: {
        getPost(page_num, page_count) {
            
        }
    }
}
</script>
<style lang="less" scoped>

</style>


