<template>
    <div class="wrapper">
        <div class="container">
            <img src="../assets/logo.png" alt="">
            <div class="label-input">
                <input type="text" placeholder="name" v-model="username">
            </div>
            <div class="label-input">
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div v-if="!isLogin" class="label-input">
                <input type="password" placeholder="passwordConfirm" v-model="passwordConfirm">
            </div>
            <div>
                <a href="javascript:" @click="changeTab">
                    {{isLogin ? 'Don\'t have an account?' : 'Already have an account'}}
                </a>
            </div>
            <button v-if="isLogin" @click="handleLogin">Login</button>
            <button v-else-if="!isLogin" @click="reg">Register</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            username: '',
            password: '',
            passwordConfirm: '',
            isLogin: true
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        ...mapActions([
            'login','register'
        ]),
        changeTab() {
            this.isLogin = !this.isLogin;
            this.password = '';
            this.passwordConfirm = '';
            this.username = ''
        },
        handleLogin() {
            this.login({username:this.username, password:this.password})
            .then(() => this.jump());
        },
        reg() {
            if (this.password && (this.password === this.passwordConfirm)) {
                this.register({username:this.username, password:this.password})
                .then(() => this.jump());
            } else {
                alert('password not equal');
                this.passwordConfirm='';
            }
        },
        jump() {
            if (this.user != null) {
                this.$router.push('/');
            }
        }
    },
}
</script>

<style lang="less" scoped>
    a {
        color: #aaa;
        text-decoration-line: none;
    }
    .wrapper {
        background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container {
        padding: 3em;
        border-radius: 1em;
        box-shadow: 3px 3px 10px 0;
        text-align: left;
        max-width: 500px;
        background: white;
        text-align: center;
    }
    .label-input {
        display: flex;
        justify-content: space-between;
        margin: 1em 0;
        input {
            outline: none;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border: 0;
            border-bottom: 1px solid;
            padding: 3px 5px;
        }
    }
    button {
        background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
        border:0;
        border-radius: 0.3em;
        padding: 0.5em;
        outline: 0;
        transition: all 0.6s ease;
        cursor: pointer;
        &:hover {
            box-shadow:  2px 2px 2px 1px;
        }
    }
    img {
        width: 3em;
        height: 3em;
    }
</style>

