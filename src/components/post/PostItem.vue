<template>
    <div class="container">
        <img :src="post.imgUrl">
        <div class="title">
            {{post.title}}
        </div>
        <div class="description">
            {{post.description}}
        </div>
        <div class="time">
            {{post.createTime}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: Object
    },
    methods: {
        praise() {

        },
    },
    mounted() {
    },
}
</script>
<style scoped>
.container {
    width: 80%;
    border: 1px solid #ccc;
    margin: 1em auto;
}
.title {
    font-size: 24px;
    text-align: left;
    padding: 0 1em;
}
.description {
    text-align: left;
    padding: 1em;
}
.time {
    text-align: left;
    padding: 1em;
}
</style>


