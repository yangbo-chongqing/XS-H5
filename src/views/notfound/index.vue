<template>
    <div class="not-found">
        <img src="@/assets/images/login.png" alt="">
        <p>该页面放假回家咯~</p>
    </div>
</template>
<script>
export default {
    name:'notfound'
}
</script>
<style lang="scss" scoped>
    .not-found{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        font-size: 0.36rem;
        color: #ccc;
        img{
            width: 2.5rem;
        }
        p{
            width: 100%;
            text-align: center;
            margin-top: 0.4rem;
        }
    }
</style>