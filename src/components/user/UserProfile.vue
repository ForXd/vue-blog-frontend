<template>
    <div class="profile">
        <div class="basic">
            <img v-if="user && user.avatar_url" :src="user && '/api/' + user.avatar_url">
            <div v-else> no avatar </div>
            <div class="name"> {{ user && user.username }}</div>
            <div class="description"> {{ user && user.description }}</div>
        </div>
        <div class="expand">
            <div class="split">
                <i class="iconfont">&#xe622;</i>
                <span>xxx@qq.com</span>
            </div>
            <div class="split">
                <i class="iconfont">&#xe623;</i>
                <span>49874xxx</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>

<style scoped>
.profile {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 1px solid #ccc;
    background: white;
    border-radius: 1rem;
    overflow: hidden;
}
.name {
    font-size: 2rem;
}
.basic {
    background: #0a7bc530;
    padding: 2rem;
    border: none;
}
.basic img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.expand {
    padding: 1rem;
}
.split {
    display: flex;
    justify-content: space-between;
}
</style>