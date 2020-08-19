<template>
    <slide-menu :menu="menu">
        <!-- 用户名，邮箱，用户简介， -->
        <template #0>
            <div class="info-container">
                <edit-info 
                    :name="'用户名'" 
                    :value="user.username" 
                    :updateValue="updateEmail">
                </edit-info>
                <edit-info 
                    :name="'邮箱'" 
                    :value="email" 
                    :updateValue="updateEmail">
                </edit-info>
                <edit-info 
                    :name="'个人简介'" 
                    :value="email" 
                    :updateValue="updateEmail">
                </edit-info>
            </div>
        </template>
        <template #1>
            <div class="password">
                <input type="text" placeholder="originPassword" v-model="originPassword">
                <input type="text" placeholder="newPassword" v-model="newPassword">
                <input type="text" placeholder="newPasswordConfirm" v-model="newPasswordConfirm">
            </div>
        </template>
    </slide-menu>
</template>
<script>
import SlideMenu from './SlideMenu';
import EditInfo from './EditableInfo';
export default {
    components: {
        SlideMenu, EditInfo
    },
    props: {
        id:String,
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    data() {
        return {
            menu: [
                '基本信息','安全信息'
            ],
            originPassword:'',
            newPassword: '',
            newPasswordConfirm: '',
            email: 'jsidj@qq.com'           
        }
    },
    methods: {
        updateEmail(v) {
            console.log(v);
            this.email = v;
        }
    },
    mounted() {
        console.log(this.id);
    }
}
</script>
<style scoped>
.test {
    width: 200px;
    height: 2000px;
    background: chocolate;
}
.password input {
    display: block;
    margin: 1rem;
}
.info-container {
    padding: 1rem;
}
</style>