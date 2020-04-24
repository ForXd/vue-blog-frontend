<template>
    <div class="container">
        <div class="post-list">
            <post-list :items="posts"/>
        </div>
    </div>
</template>
<script>
import P from '@/api/post.js';
import PostList from '@/components/post/PostList.vue';
export default {
    components: {
        PostList
    },
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
    },
    mounted() {
        P.getPostList(this.post_page_num)
        .then(res => {
            this.posts.splice(0, 0, ...res);
        })
    },
}
</script>
<style lang="less" scoped>

</style>


