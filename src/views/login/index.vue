<template>
  <div class="login">
    <div class="header_background">
      <!-- <el-image :src="imgSrc"></el-image> -->
      <span>基础框架</span>
    </div>
    <div class="content_background">
      <div class="content"></div>
      <div class="login_from">
        <div class="login_back" />
        <div class="login_content">
          <el-form ref="loginForm" :model="form" :rules="loginRules" @keydown.enter="submitLogin">
            <div class="login_title">登录账号</div>
            <el-form-item prop="username">
              <div class="user_name">
                <div class="type_info">登录账号</div>
                <el-input v-model="form.username" placeholder="请输入登录账号" />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="password">
                <div class="type_info">登录密码</div>
                <el-input v-model="form.password" type="password" placeholder="请输入登录密码" />
              </div>
            </el-form-item>
            <el-form-item prop="captcha">
              <div class="verification_code">
                <div class="password">
                  <div class="type_info">验证码</div>
                  <el-row :gutter="10">
                    <el-col :span="16">
                      <el-input v-model="form.captcha" placeholder="请输入图形验证码" />
                    </el-col>
                    <el-col :span="8">
                      <div class="code_img" @click="getCaptchaCode">
                        <el-image :src="captchaCodeImg"></el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div class="submit" @click="submitLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import { LoginService } from '@/api/login'

defineComponent({
  name: 'LoginView',
})

const form = reactive({
  username: '',
  password: '',
  captchaId: '',
  captcha: '',
})

const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请验证码', trigger: 'blur' }],
})

const captchaCodeImg = ref('')
const loginServe = new LoginService()

const getCaptchaCode = async () => {
  const { data } = await loginServe.getCaptcha()
  captchaCodeImg.value = data.captcha
  form.captchaId = data.captchaId
  // todo
}

getCaptchaCode()
const submitLogin = async () => {
  const res = await loginServe.login(form)
  console.log(res)
}
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header_background {
    padding-left: 1vw;
    height: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    > span {
      font-family: 'ObjectLogo';
      font-size: 24px;
      letter-spacing: 4px;
      font-style: italic;
    }
  }
  .content_background {
    position: relative;
    flex: 1;
    width: 100%;
    background: url('../../assets/images/login/background.png') no-repeat;
    background-size: cover;
    .content {
      position: absolute;
      left: 5vw;
      top: 12vh;
      width: 47.6vw;
      height: 75vh;
      // background: url('../../assets/images/login/content.png') no-repeat;
      background-size: cover;
    }
    .login_from {
      position: absolute;
      left: 63vw;
      top: 19vh;
      width: 22vw;
      height: 52vh;
      > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .login_back {
        background: #ffffff;
        box-shadow: 0px 0px 24px 0px #d4def0;
        border-radius: 8px;
        opacity: 0.6;
        z-index: 1;
      }
      .login_content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 7% 9%;
        z-index: 2;
        .login_title {
          font-weight: bold;
          font-size: 26px;
          color: #000;
        }
        .type_info {
          font-size: 14px;
          margin-bottom: 2%;
        }
        .code_img {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          background: #ffffff;
          border-radius: 6px;
          border: 1px solid #eaf0f4;
        }
        .submit {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 9%;
          color: #fff;
          background: linear-gradient(90deg, #1d56ee, #23a1fa);
          border-radius: 6px;
        }
      }
    }
  }
}
:deep(.el-input__inner) {
  height: 47px;
}
:deep(.el-form-item__content) {
  display: block;
}
</style>
