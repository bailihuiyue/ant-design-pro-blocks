import React, { Component } from 'react';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
//import {  } from './model';
import { Dispatch } from 'redux';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

@connect()
export default class ExamplePage extends Component<any> {

  state = {
  };

  render(): React.ReactNode {
    // const {  } = this.props;
    // const {  } = this.state;
    return (
      <div>This is a new block!</div>
    );
  }
}