<template>
    <div>
        <div class="container">
            <div class="author-img">
            </div>
            <div class="inner-content">
                <div class="author">{{comment.author}}</div>
                <div class="time">{{new Date().toUTCString().slice(0, -4)}}</div>
                <div class="content">{{comment.content}}</div>
                <div class="reply">
                    <button>赞</button>
                    <button>踩</button>
                    <button @click="handleReply">回复</button>
                    <span v-if="hasChildren" @click="toggle" :class="isOpen ? 'up' : 'down'"></span>
                </div>
            </div>
        </div>
        <div class="editor" v-show="editComment">
            <textarea 
            rows="1" 
            @input="handleChange" 
            v-model="replyContent">
            </textarea>
            <button @click="addComment">回复</button>
        </div>
        
        <!-- 递归组件需要终止渲染条件，hasChildren -->
        <div class="children" v-if="hasChildren" v-show="isOpen">
            <comment-item v-for="item in comment.children" 
                          :key="item.id"
                          :comment="item"
                          :addChildren="addChildren"
                          :addItem="addItem"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CommentItem',
    props: {
        comment: Object,
        addChildren: Function,
        addItem: Function
    },
    data() {
        return {
            isOpen: false,
            replyContent: '',
            editComment: false,
            placeholder: `reply to ${this.comment.author}: `
        }
    },
    computed: {
        hasChildren() {
            return this.comment.children && this.comment.children.length;
        }
    },
    methods: {
        toggle() {
            if (this.hasChildren) {
                this.isOpen = !this.isOpen;
            }
        },
        addComment() {
            this.editComment = false;
            if (!this.hasChildren) {
                this.addChildren(this.comment, this.replyContent);  
            } else {
                this.addItem(this.comment, this.replyContent);
            }
            this.replyContent = '';
        },
        handleReply() {
            this.editComment = !this.editComment;
        },
        handleChange(e) {
            let elem = e.target;
            elem.style.height = 'auto';
            elem.scrollTop = 0;
            elem.style.height = elem.scrollHeight + 'px';
        },
    },
}
</script>
<style lang="less" scoped>
    button {
        background: #fff;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        opacity: 0;
        transition: all 0.6s ease-in-out;
    }
    .container {
        display: flex;
        margin: 1em 0;
    }
    .up {
        display: inline-block;
        border: 7px solid;
        border-color: transparent transparent black transparent;
    }
    .down {
        display: inline-block;
        border: 7px solid;
        border-color: black transparent transparent transparent;
    }
    .author-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #58a;
        flex-shrink: 0;
    }
    .inner-content {
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
        margin-left: 1em;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        &:hover {
            button {
                opacity: 1;
            }
        }
        .time {
            align-self: flex-start;
            font-size: 10px;
            font-family: 'Courier New', Courier, monospace;
            font-style: italic;
        }
        .author {
            align-self: flex-start;
        }
        .content {
            white-space: pre-line;
            text-indent: 2em;
            text-align: left;
            word-break: break-all;
        }
        .reply {
            align-self: flex-end;
        }
    }
    .editor {
        display: flex;
        textarea {
            width: 100%;
            padding: 0;
            resize: none;
            outline: none;
        }
        button {
            opacity: 1;
            align-self: flex-start;
            word-break: keep-all;
        }
    }
    .children {
        margin: 5px 0;
        padding-left: calc(30px + 1em);
    }
</style>


