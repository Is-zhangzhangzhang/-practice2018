<template>
<div id="header-wrap">
    <div>
        <h1>Demo</h1>
        <a href="#">{{loginStatus}}</a>
    </div>

</div>
</template>
<script>
    export default{
        name:'login',
        computed:{
            loginStatus () {
                return  this.$store.state.loginStatus
            }
        }
    }
</script>
<style>
    #header-wrap{
        width: 100%;
        height: 56px;
        background-color: rgb(63,81,181);
        color:#fff;
    }
    #header-wrap div{
        width:80%;
        height:100%;
        margin: 0 auto;
    }
    #header-wrap h1{
        float: left;
        display: inline-block;
        font-size: 40px;
        text-shadow: 0 0 5px;
    }
    #header-wrap a{
        float:right;
        padding-top: 5px;
        line-height: 56px;
        color:#fff;
        font-size: 1.5em;
    }
    #header-wrap a:hover{
        text-shadow: 0 0 5px;
    }
</style>