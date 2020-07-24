<template>
    <div class="container">
        <aside>
            <div class="avatar" @click="open">
                <img :src="user && '/api/' + user.avatar_url" v-if="user && user.avatar_url">
                <i class="iconfont" v-else>&#xe632;</i>
            </div>
            <div class="link">
                <i class="iconfont">&#xe631;</i>
                <a @click="goto('info')" :class="isActive('info') ? 'active' : ''">个人信息</a>
            </div>
            <div class="link">
                <i class="iconfont">&#xe67a;</i>
                <a @click="goto('collect')" :class="isActive('collect') ? 'active' : ''">个人收藏</a>
            </div>
            <div class="link">
                <i class="iconfont">&#xe63c;</i>
                <a @click="goto('activity')" :class="isActive('activity') ? 'active' : ''">个人动态</a>
            </div>
        </aside>
        <div class="content">
            <router-view></router-view>
        </div>
        <dialog-window ref="dialog">
            <template #content>

                <input type="file" id="" ref="file">
                <button @click="upload">submit</button>
            </template>
        </dialog-window>
    </div>
</template>
<script>
import DialogWindow from '../components/general/DialogWindow.vue';
import { uploadAvatar } from '@/api/user.js';
import { mapMutations } from 'vuex';
export default {
    components: {
        DialogWindow
    },
    props: {
        id: String
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        ...mapMutations(['login']),
        goto(str) {
            this.$router.push('/user/' + this.id + '/' +  str);
        },
        open() {
            console.log('?')
            this.$refs.dialog.open();
        },
        isActive(str) {
            let path = this.$router.history.current.fullPath;
            let current = path.split('/').slice(-1)[0];
            if (str == current) return true;
            return false;
        },
        upload() {
            let file = this.$refs.file.files;
            uploadAvatar(this.user.id, file).then(res => {
                this.login(res);
                this.$refs.dialog.close();
            })
        }
    },
    mounted() {
        this.goto('info');
    }
}
</script>
<style scoped>
.container {
    display: flex;
    height: 80vh;
    overflow: hidden;
    align-items: stretch;
    margin: 2rem 5rem;
    background: white;
    position: relative;
}
.active {
    color: #ccc;
    border-bottom: 1px solid;
}
.avatar {
    margin: 1rem 0;
    cursor: pointer;
}
.avatar i {
    font-size: 7rem;
}
.avatar img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
}
.iconfont {
    font-size: 1.5rem;
    font-style: normal;
}
aside {
    border: 1px solid;
    flex-basis: 300px;
}
.link {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
}
.content {
    flex-grow: 1;
}
</style>