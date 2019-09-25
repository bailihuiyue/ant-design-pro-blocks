import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getPageQuery, setAuthority, } from './utils/utils';
import { Example } from './services';
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
  };
  reducers: {
  };
}

const Model: ModelType = {
  namespace: 'example',

  state: {
    status: undefined,
    subCode: undefined,
  },

  effects: {
  },

  reducers: {
  },
};

export default Model;
