import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

class UserLogin extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    // console.log(values)//values就是获取到用户名和密码
    if (!err) {
      const { dispatch } = this.props;
      //如果没有错误就dispatch到login,将values传过去
      dispatch({
        type: 'userLogin/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'userLogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账号登录">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('userlogin.login.message-invalid-credentials')}
            <UserName
              name="username"
              placeholder="admin"
              rules={[
                {
                  required: true,
                  message: '用户名必须输入admin',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码:123456"
              rules={[
                {
                  required: true,
                  message: '密码必须输入',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="mobile" tab="手机登录">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('userlogin.login.message-invalid-verification-code')}
            <Mobile
              name="mobile"
              placeholder="userlogin.phone-number.placeholder"
              rules={[
                {
                  required: true,
                  message: 'userlogin.phone-number.required',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: 'userlogin.phone-number.wrong-format',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="userlogin.verification-code.placeholder"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="userlogin.form.get-captcha"
              getCaptchaSecondText="userlogin.captcha.second"
              rules={[
                {
                  required: true,
                  message: 'userlogin.verification-code.required',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              记住密码
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login'],
}))(UserLogin);
