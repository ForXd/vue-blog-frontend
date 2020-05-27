<template>
    <div class="container">
        <div class="post-list">
            <post-list :items="posts"/>
            <pagination 
            :onChange="getPage" 
            :total="post_count" 
            :count="page_count"/>
        </div>

        <div class="user-info" v-show="user != null">
            <user-profile :user="user"/>
        </div>
    </div>
</template>
<script>
import { getPostList } from '@/api/post.js';
import Pagination from '@/components/general/Pagination.vue';
import PostList from '@/components/post/PostList.vue';
import UserProfile from '@/components/user/UserProfile.vue';
export default {
    components: {
        PostList,
        Pagination,
        UserProfile
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
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        getPage(page_num) {
            getPostList(page_num)
            .then(res => {
                // console.log(res);
                let post = res.post;
                this.post_count = res.postCount;
                this.posts.splice(0, this.page_count, ...post);
                this.post_page_num = page_num;
            });
        },
    },
    created() {
        this.getPage(this.post_page_num);
    },
}
</script>
<style lang="less" scoped>
.container {
    display: flex;
    justify-content: center;
}
.post-list {
}
.user-info {
    border: 1px solid #ccc;
    width: 200px;
    align-self: baseline;
    margin-top: 20px;
}
</style>


