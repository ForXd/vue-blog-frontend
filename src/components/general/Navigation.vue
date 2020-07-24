<template>
    <div id="nav" :class="classObj">
        <div class="route">
            <router-link to="/">Home</router-link>
            <span class="split"></span>
            <router-link to="/article">Posts</router-link>
        </div>
        <div class="phone-show-menu">
            <drop-down-menu :menu="routeMenu" :handler="handleRouteMenu" :prop="'name'">
                <template #title>
                    <i class="iconfont menu">&#xe64c;</i>
                </template>
            </drop-down-menu>
        </div>
        <div>
            <drop-down-menu :menu="candidates" :handler="handleAriticleMenu" :prop="'title'">
                <template #title>
                    <div>
                        <input type="text" v-model="searchVal" @input="handleInput" class="search">
                        <i class="iconfont">&#xe607;</i>
                    </div>
                </template>
            </drop-down-menu>
        </div>
        
        <div>
            <drop-down-menu :menu="userMenu" :handler="handleUserMenu" :prop="'name'"  v-if="user">
                <template #title>
                    <div>
                        <i class="iconfont">&#xe631;</i>
                    </div>
                </template>
            </drop-down-menu>
            <div v-else>
                <router-link to="/auth">Login</router-link>
            </div>
        </div>
    </div>    
</template>
<script>
import F from '@/util/frequency.js';
import { getPostListbyTitle } from '@/api/post.js';
import DropDownMenu from './DropDownMenu.vue';
export default {
    components: {
        DropDownMenu
    },
    data() {
        return {
            prev: 0,
            searchVal: '',
            candidates: [],
            userMenu: [{name:'writting'},{name:'setting'},{name:'logout'}],
            routeMenu:  [{name:'Home'},{name:'Post'}],
        }
    },
    computed: {
        show() {
            return this.$store.state.navFlag;
        },
        classObj() {
            return this.show ? '' : 'hidden';
        },
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        handleUserMenu(val) {
            switch(val) {
                case 0:
                    this.jumpTo('/edit/0/');
                    break;
                case 1:
                    this.jumpTo('/user/0/');
                    break;
                case 2:
                    this.logout();
                    break;
            }
        },
        handleAriticleMenu(index) {
            this.searchVal = '';
            this.jumpTo(`/post/${this.candidates[index].id}`); 
            this.candidates.splice(0, this.candidates.length);
        },
        handleRouteMenu(index) {
            switch(index) {
                case 0:
                    this.jumpTo('/')
                    break;
                case 1:
                    this.jumpTo('/article')
                    break;
            }
        },
        fn() {
            let cur = document.documentElement.scrollTop;
            if (cur - this.prev > 40) {
                this.$store.commit('hiddenNav');
            } else if (cur - this.prev < -10) {
                this.$store.commit('showNav');
            }
            this.prev = cur;
        },
        logout() {
            this.$store.commit('logout');
        },
        handleInput: F.debounce(function() {
            // console.log(this.searchVal);
            if (this.searchVal == '') return;
            getPostListbyTitle(this.searchVal).then(res => {
                // console.log(res.post);
                this.candidates.splice(0, this.candidates.length, ...res.post);
            }).catch(err => alert(err));
        }, 300),
        jumpTo(url) {
            this.$router.push(url);
        }
    },
    mounted() {
        window.addEventListener('scroll', this.fn, false);
    },
    destroyed() {
        window.removeEventListener('scroll', this.fn);
    },
}
</script>

<style lang="less">
    .hidden {
        transform: translateY(-100%);
    }
    .phone-show-menu, .phone-hide {
        display: none;
    }
    a {
        text-decoration-line: none;
        color: #2c3e50;
    }
    .menu {
        padding: 2em 0;
    }
    .search {
        border: none;
        outline: none;
        border-bottom: 1px solid;
    }
    .phone-hide {
        position: absolute;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border: 1px solid #ccc;
        min-width: 5em;
        padding: 0 1em;
        text-align: center;
        list-style: none;
    }
    
    @media screen and (max-width: 600px) {
        .route {
            display: none;
        }
        .phone-hide:hover {
            display: block;
        }
        .phone-show-menu {
            display: block;
        }
    }
    #nav {
        margin: 0;
        padding: 10px 0 20px 0;
        position: sticky;
        top: 0;left: 0;
        background: white;
        transition: all 0.6s ease;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 10;
        box-shadow: 0 0.01rem 0.5rem 0;
        .route a {
            display: inline-block;
            font-weight: bold;
            color: #2c3e50;
            text-decoration-line: none;
            transition: all .6s ease;
            position: relative;
            &.router-link-exact-active {
                &::before {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    margin-left: -5px;
                    border: 5px solid;
                    border-color: transparent transparent #000 transparent;
                }
                color: #000;
                transform: translateY(5px);
            }
        }
        .split {
            height: 1rem;
            border-left: 1px solid;
            margin: 0 1rem;
        }
    }
    
</style>
