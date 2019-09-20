import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getPageQuery, setAuthority, } from './utils/utils';
import { setToken, setUserInfo } from '@/utils/authority';
import { FElogin } from './services';
import { routerRedux } from 'dva/router';


export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  subCode?:Number
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    FElogin: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
    subCode: undefined,
  },

  effects: {
    *FElogin({ payload }, { call, put }){
       const response = yield call(FElogin, payload);
       if (response) {
        response.status = 'ok';
        response.roleArr = response.roleInfoList.map((role:any) => role.title)
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        yield put({
          type: 'user/saveCurrentUser',
          payload: response,
        });
        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
       }else{
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            roleArr: null
          },
        });
       }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { token, status, roleArr } = payload;
      if (roleArr){
        setToken(token)
        setUserInfo(payload)
        setAuthority(roleArr);
      }
      return {
        ...state,
        status: status,
        type: roleArr
      };
    },
  },
};

export default Model;
