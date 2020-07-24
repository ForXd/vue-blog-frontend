<template>
    <div class="container" @click="showPost">
        <div class="title">
            {{post.title}}
        </div>
        <div class="description">
            {{post.description}}
        </div>
        <div class="info">
            <div>
                <i class="iconfont">&#xe74d;</i>
                <span>{{post.praise_num}}</span>
            </div>
            <div>
                {{post.create_time | formatDate}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: Object
    },
    methods: {
        showPost() {
            this.$router.push('/post/' + this.post.id);
        }
    },
    filters: {
        formatDate:function (val) {
            const padDate = function(val) {
                val = val < 10 ? '0' + val : val;
                return val;
            }
            let value=new Date(val);
            let year=value.getFullYear();
            let month=padDate(value.getMonth()+1);
            let day=padDate(value.getDate());
            let hour=padDate(value.getHours());
            let minutes=padDate(value.getMinutes());
            let seconds=padDate(value.getSeconds());
            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    &:hover {
        transform: scale(1.05);
        transition: all 0.6s ease;
        cursor: pointer;
    }
    width: 80%;
    border: 1px solid #ccc;
    margin: 1em auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    background: white;
}
.title {
    font-size: 24px;
    text-align: left;
    padding: 0 1em;
}
.description {
    text-align: left;
    padding: 1em;
}
.info {
    display: flex;
    justify-content: space-between;
    padding: 1em;
}
</style>


