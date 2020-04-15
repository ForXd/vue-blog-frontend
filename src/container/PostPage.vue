<template>
    <post :mdContent="test"/>
</template>
<script>
import Post from '@/components/post/Post.vue';
export default {
    props: {
        id: String
    },
    components: {
        Post
    },
    data() {
        return {
            test: '# test \n ## h1 \n ### h2 \n ## h3'
        }
    }
}
</script>
<style scoped>

</style>


