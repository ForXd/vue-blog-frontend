<template>
    <div class="container" @click="showPost">
        <div class="title">
            {{post.title}}
        </div>
        <div class="description">
            {{post.description}}
        </div>
        <div class="time">
            {{post.create_time}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: Object
    },
    methods: {
        showPost() {
            this.$router.push('/post/' + this.post.id);
        }
    },
}
</script>
<style lang="less" scoped>
.container {
    &:hover {
        transform: scale(1.1);
        transition: all 0.6s ease;
        cursor: pointer;
    }
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


