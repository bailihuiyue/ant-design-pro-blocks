import React, {Component} from 'react';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { StateType } from './model';
import { Dispatch } from 'redux';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Alert, } from 'antd';
import LoginComponents from './components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = LoginComponents;
interface UserLoginProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
  submitting: boolean;
}
interface UserLoginState {
  type: any;
}
export interface FormDataType {
  userName: string;
  password: string;
}

@connect(
  ({userLogin,loading}: {userLogin: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/FElogin'],
  }),
)
class LoginPage extends Component<UserLoginProps,UserLoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: UserLoginState = {
    type: 'account',
  };
  onTabChange = (type: String) => {
    this.setState({ type });
  };

  handleSubmit = (err:any, values:FormDataType):void => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/FElogin',
        payload: {
          ...values,
        },
      });
    }
  };
  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render(): React.ReactNode {
    const { userLogin, submitting } = this.props;
    const { status } = userLogin;
    const { type } = this.state;
    return (
      <div className={styles.container}>
        <LoginComponents
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          {(status === 'error' &&
            !submitting) &&
            this.renderMessage(formatMessage({
              id: 'login.inputError'
            }))
          }
          <div className={styles.form__item}>
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit)}}
            />
            <Submit loading={submitting} className={styles.login__btn}>
              <FormattedMessage id="login.login" />
            </Submit>
            <div className={styles.bottom__tip}>
              <FormattedMessage id="login.tip" />
            </div>
          </div>


        </LoginComponents>
      </div>
    );
  }
}

export default LoginPage;
// export default connect(({ login, loading }: ConnectState) => ({
//   login,
//   submitting: loading.effects['login/login'],
// }))(LoginPage);
