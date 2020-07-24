<template>
    <div class="container" :style="{width: width, height: height}">
        <div class="toolbars">
            <i @click="splitMode" class="iconfont" title="split mode">&#xe624;</i>
            <i @click="tongleMode" class="iconfont" title="change mode">&#xe736;</i>
        </div>
        <textarea 
            class="raw" @input="update" :value="rawContent"
            :style="editStyle" @keydown="handleTab">
        </textarea>
        <div class="preview" v-html="compiledMarkdown"
            :style="previewStyle" v-highlight></div>
    </div>
</template>
<script>
import marked from 'marked';
import F from '@/util/frequency.js';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
});
export default {
    props: {
        width:String,
        height:String,
        getContent: Function,
    },
    data() {
        return {
            rawContent: '',
            indent: 2,
            editStyle: {
                'flex-basis': '47.5%'
            },
            previewStyle: {
                'flex-basis': '47.5%'
            }
        }
    },
    computed: {
        compiledMarkdown() {
            return marked(this.rawContent);
        }
    },
    methods: {
        handleTab(e) {
            if(e.keyCode == 9) {
                e.preventDefault();
                let prefix = ' '.repeat(this.indent);
                let startPos = e.target.selectionStart,
                    cursorPos = startPos,
                    endPos = e.target.selectionEnd,
                    tmpStr = e.target.value;
                this.rawContent = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(endPos, tmpStr.length);
                cursorPos += prefix.length;
                // 先失去焦点，并且完成内容的更新
                // 如果不失去焦点，焦点会在内容更新完成之后先移动到最后，
                // 然后在移动，会跳一下
                e.target.blur();
                // 需要下一次事件循环执行，可能因为vue会将视图更新的代码统一执行，
                // 因此先设置光标位置之后，textarea整体插入内容后会自动移动光标到最后
                
                // 在内容更新完成之后移动焦点，防止焦点的移动被内容更新所覆盖
                this.$nextTick(() => {
                    e.target.selectionStart = e.target.selectionEnd = cursorPos;
                    e.target.focus();
                })
            }
        },
        tongleMode() {
            this.previewStyle['flex-basis'] = `${this.previewStyle['flex-basis'] == '95%' ? '0' : '95%'}`;
            this.editStyle['flex-basis'] = `${this.editStyle['flex-basis'] == '0' ? '95%' : '0'}`;
        },
        splitMode() {
            this.previewStyle['flex-basis'] = '47.5%';
            this.editStyle['flex-basis'] = '47.5%';
        },
        update: F.debounce(function(e) {
            this.rawContent = e.target.value;
            this.getContent(this.rawContent);
        }, 300),
    },
}
</script>
<style lang="less" scoped>
    .container {
        display: flex;
        margin: 0 auto;
    }
    .toolbars {
        display: flex;
        flex-basis: 5%;
        flex-flow: column;
        border: 1px solid #ccc;
        [class^="icon-"] {
            font-size: 2em;
        }
        i {
            margin: 5px;
            cursor: pointer;
        }
    }
    .raw {
        transition: all 0.6s ease;
        padding: 0;
        background: #eee;
        outline: none;
        overflow-x: hidden;
        overflow-y: scroll;
        border: none;
        resize:none;
    }
    .preview {
        transition: all 0.6s ease;
        border-left: 1px solid #ccc;   
        overflow-x: hidden;
        overflow-y: auto;
        text-align: left;
        white-space: pre-line;
    }
</style>
