<template>
    <div>
        <div class="basic">
            <img v-if="user && user.avatar_url" :src="user && user.avatar_url">
            <div v-else> no avatar </div>
            <div class="name"> {{ user && user.username }}</div>
            <div class="description"> {{ user && user.description }}</div>
        </div>
        <div class="profile">
            <div>email: xxxx@qq.com</div>
            <div>phone: 188xxxxxxxx</div>
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

</style>