<template>
    <div class="login-wrap">
         <top></top>
         <div class="login-box">
            <div class="loginDiv">
                
            </div>
         </div>
    </div>
</template>

<script>
    import top from './top'
    export default{
        name:'login',
        components:{
            top
        }
    }
</script>

<style type="text/css" media="screen">
    .login-wrap{
        background-image: url('../assets/bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;
    }
    .login-box{
        width: 100%;
    }
    .loginDiv{
        width:30%;
        height: 300px;
        margin:0 auto;
        margin-top: 8%;
        background-color: rgba(39,40,34,0.6);
    }
    
</style>