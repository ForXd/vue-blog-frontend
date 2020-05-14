<template>
    <div id="nav" :class="classObj">
        <div class="route">
            <router-link to="/">Home</router-link>
            <span class="split"></span>
            <router-link to="/about">About</router-link>
            <span class="split"></span>
            <router-link to="/auth">Login</router-link>
        </div>
        <div class="search">
            <input type="text" v-model="searchVal" @input="handleInput" list="search-list">
            <button @click="search">tt</button>
            <datalist id="search-list">
                <option v-for="val in candidates" :value="val.title" :key="val.id"></option>
            </datalist>
        </div>
        <div class="dropdown" v-show="user">
            <a href="#" class="dropbtn">{{user?user.username:null}}</a>
            <div class="dropdown-content">
            <a href="javascript:" @click="writePost">write</a>
            <a href="javascript:" @click="logout">logout</a>
            </div>
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
            candidates: [{id: 1, title: 'sdfads'},{id: 2, title: 'sdfffffads'},{id: 3, title: 'sccecs'}]
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
        }, 300),
        search() {
            console.log('search: ' + this.searchVal);
            getPostListbyTitle(this.searchVal).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        },
        writePost() {
            this.$router.push('/edit/0');
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
    #nav {
        padding: 10px 0 20px 0;
        position: sticky;
        top: 0;left: 0;
        background: white;
        transition: all 0.6s ease;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        z-index: 10;
        .route {
        }
        a {
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
            text-decoration: none;
        }

        .dropdown-content a:hover {background-color: #ccc}

        .dropdown:hover .dropdown-content {
            opacity: 1;
        }
    }
    
</style>
