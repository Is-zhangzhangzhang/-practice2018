<template>
  <div class="login-wrap">
    <top></top>
    <div class="login-box">
      <Form ref="loginData" v-bind:model="loginData">
        <FormItem prop="user">
          <Input type="text" v-model="loginData.user" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginData.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <span slot="label" v-bind:class="{remember:loginData.switch}">记住密码?</span>
          <i-switch v-model="loginData.switch">
            <span slot="open">On</span>
            <span slot="close">Off</span>
          </i-switch>
        </FormItem>
        <FormItem>
          <Button type="primary" long size="large" @click="handleSubmit(loginData)">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import top from './top'

  export default {
    name: 'login',
    components: {
      top
    },
    data: function () {
      return {
        loginData: {
          user: '',
          password: '',
          switch: false
        },
        //默认用户密码
        userMsg: {
          user: 'admin',
          password: '123456'
        }
      }
    },
    mounted: function () {
      // localStorage.setItem('user',JSON.stringify(this.loginData));
      // localStorage.removeItem('user');
      let userstore = JSON.parse(localStorage.getItem('user'));
      if (userstore == null) {
        return;
      }
      else {
        if (userstore.switch == true) {
          this.loginData = userstore;
          console.log(this.loginData);
        }
      }
    },
    methods: {
      handleSubmit(data) {
        //判断用户名密码是否正确
        if (this.loginData.user == this.userMsg.user && this.loginData.password == this.userMsg.password) {
          if (this.loginData.switch == true) {   //记住密码
            localStorage.setItem('user', JSON.stringify(this.loginData));
          }
          console.log(this.loginData);
          this.$store.commit('changeLoginStatus', this.loginData.user);
          this.$router.push({path: '/main'});
        }
        else {
          this.$Message.error('账号或密码输入错误！');
        }
      }
    }
  }
</script>

<style type="text/css" media="screen">
  .login-wrap {

  }

  .login-box {
    width: 33%;
    min-width: 430px;
    height: 300px;
    margin: 0 auto;
    margin-top: 8%;
    /*        border: 1px solid gray;
            box-sizing: border-box;
            border-radius:10px;
            box-shadow: 0 0 5px;*/
  }

  .login-wrap .ivu-input-group-prepend {
    font-size: 1.6rem;
    width: 10%;
    min-width: 20px;
  }

  .login-wrap .ivu-input {
    font-size: 1.2rem;
    padding: 20px;
  }

  .ivu-form-item-label span {
    color: gray;
    font-size: 0.9rem;
  }

  .remember {
    color: rgb(45, 140, 240) !important;
  }

  .login-wrap .ivu-btn-large {
    font-size: 1.2rem;
  }
</style>
