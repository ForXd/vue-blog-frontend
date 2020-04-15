<template>
    <div id="container">
        <div class="left-right">
            <div class="left">
                title
            </div>
            <div class="right">
                <input type="text" v-model="title">
            </div>
        </div>
        <div class="left-right">
            <div class="left">
                category
            </div>
            <div class="right">
                <input type="text" v-model="category">
            </div>
        </div>
        <div class="content-edit">
            <mark-down-editor 
            :width="'100%'"
            :height="'100%'"
            :getContent="getContent"
            />
        </div>
        <div class="function-area">
            <button @click="create">submit</button>
        </div>
    </div>
</template>
<script>
import MarkDownEditor from '@/components/general/MarkDownEditor.vue';
export default {
    components: {
        MarkDownEditor
    },
    props: {
        submitPost: Function,
    },
    data() {
        return {
            title:'',
            category: '',
            content: ''
        }
    },
    methods: {
        getContent(content) {
            this.content = content;
        },
        create() {
            let post = {};
            post.title = this.title;
            post.category = this.category;
            post.content = this.content;
            this.submitPost(post);
        },
    },
}
</script>
<style scoped>
    .left-right {
        display:flex;
        justify-content: space-between;
        width: 70%;
        margin: 0 auto;
    }
    .left {
    }
    .right {
    }
    .content-edit {
        width: 70%;
        height: 70vh;
        margin: 0 auto;
    }
</style>

