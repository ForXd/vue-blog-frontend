<template>
    <div id="container">
        <div :class="focusId == link.id ? 'cur-link' : 'other-link'"
            @click="jump" ref="cur">
            {{link.title}}
        </div>
        <div class="children" v-if="hasChildren" v-show="focusChildren || focusId == link.id">
            <tree-link v-for="item in link.children"
            :link="item"
            :key="item.id"
            :focusId="focusId"
            :focusTo="focusTo" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'TreeLink',
    props: {
        link: Object,
        focusId: Number,
        focusTo: Function
    },
    watch: {
        focusId(val) {
            if (val == this.link.id) {
                this.focusTo(val, this.$refs.cur.offsetTop);
            }
        }
    },
    methods: {
        jump() {
            this.focusTo(this.link.id, this.$refs.cur.offsetTop);
            // 在此处跳转，因为Post组件尚未完成更新，所以会出现null
            let obj = document.getElementById(this.link.id);
            // 为什么另一个post不行？
            obj.scrollIntoView();
        }
    },
    computed: {
        hasChildren() {
            return this.link.children && this.link.children.length;
        },
        focusChildren() {
            let id = this.focusId;
            // dfs 判断后代中是否存在focusId
            function inChild(children) {
                if (children) {
                    let flag = false;
                    for (let i = 0; i < children.length; ++i) {
                        if (children[i].id == id) {
                            return true;
                        } else {
                            flag = flag || inChild(children[i].children);
                        }
                    }
                    return flag;
                }
                return false;
            }
            return inChild(this.link.children);
        }
    },
}
</script>

<style scoped>
.cur-link {
    background: #ccc;
    color: black;
    width: 500px;
    text-overflow:ellipsis; 
    white-space: nowrap;
    overflow: hidden;
}
.other-link {
    background: white;
}
.children {
    padding-left: 1em;
}
#container {
    display: block;
}
</style>

