<template>
    <div id="nav" :class="classObj">
        <div class="route">
            <router-link to="/home">Home</router-link>
            <span class="split"></span>
            <router-link to="/">Posts</router-link>
        </div>
        <div class="phone-show-menu">
            <span class="menu">Menu</span>
            <ul class="phone-hide">
                <li><router-link to="/home">Home</router-link></li>
                <li><router-link to="/">Posts</router-link></li>
            </ul>
        </div>
        <div class="search">
            <input type="text" v-model="searchVal" @input="handleInput">
            <ul v-show="candidates.length > 0">
                <li v-for="val in candidates" 
                    :key="val.id"
                    @click="() => {jumpTo(`/post/${val.id}`); candidates.splice(0, candidates.length);}">
                    {{val.title}}
                </li>
            </ul>
        </div>
        <div class="dropdown" v-if="user">
            <div class="dropbtn">{{user?user.username:null}}</div>
            <div class="dropdown-content">
                <a href="javascript:" @click="jumpTo('/edit/0')">writing</a>
                <a href="javascript:" @click="jumpTo('/user/0')">setting</a>
                <a href="javascript:" @click="logout">logout</a>
            </div>
        </div>
        <div v-else>
            <router-link to="/auth">Login</router-link>
        </div>
    </div>    
</template>
<script>
import F from '@/util/frequency.js';
import { getPostListbyTitle } from '@/api/post.js';
export default {
    data() {
        return {
            prev: 0,
            searchVal: '',
            candidates: [],
            menuList: [
                {}
            ]
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
            console.log(this.searchVal);
            if (this.searchVal == '') return;
            getPostListbyTitle(this.searchVal).then(res => {
                console.log(res.post);
                this.candidates.splice(0, this.candidates.length, ...res.post);
            }).catch(err => console.log(err));
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
    .phone-hide {
        position: absolute;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border: 1px solid #ccc;
        min-width: 5em;
        padding: 0 1em;
        text-align: center;
    }
    ul {
        list-style: none;
    }
    .search {
        ul {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            margin-top: 10px;
            border: 1px solid #ccc;
            min-width: 5em;
            padding: 0 1em;
            text-align: center;
            &:hover {
                display: block;
            }
            li {
                margin: 0.5em 0;
            }
            li:hover {
                background-color: #e9e9e9;
                cursor: pointer;
            }
        }
        input:focus ~ ul{
            display: block;
        }
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
            &:hover .phone-hide {
                display: block;
                a {
                    display: inline-block;
                    position: relative;
                }
                li {
                    margin: 0.5em 0;
                }
                li:hover {
                    background-color: #e9e9e9;
                    cursor: pointer;
                }
            }
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
                    border-color: transparent transparent #42b983 transparent;
                }
                color: #42b983;
                transform: translateY(5px);
            }
        }
        .split {
            border-right: 1px solid;
            height: 1em;
            display: inline-block;
            width: 1em;
            margin-right: 1em;
        }
        .search {
            
        }
        
        .dropdown {
            min-width: 5em;
            text-align: center;
        }

        .dropdown-content {
            opacity: 0;
            position: absolute;
            background-color: #f9f9f9;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            margin-top: 10px;
            border: 1px solid #ccc;
            min-width: 5em;
            
            &::before {
                content: '';
                position: absolute;
                top: -20px;
                left: 50%;
                margin-left: -10px;
                border: 10px solid;
                border-color: transparent transparent black transparent;
            }
        }

        .dropdown-content a {
            display: block;
            padding: 12px 16px;
            text-decoration-line: none;
            color: #2c3e50;
        }

        .dropdown-content a:hover {background-color: #ccc}

        .dropdown:hover .dropdown-content {
            opacity: 1;
        }
    }
    
</style>
