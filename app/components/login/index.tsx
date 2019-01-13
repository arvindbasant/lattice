import * as React from 'react';
// import { DispatchProps } from '../../store/utils/dispatch-props';
// import { LoginActions } from '../../store/login/login-actions';
// import { LoginState } from '../../store/login/login-types';
// import { connect } from 'react-redux';
// import { ApplicationState } from '../../store/types';
// import { AnyAction } from 'redux';
import { Row, Col, Input, Button, Drawer, Icon } from 'antd';
const styles = require('./login.scss');
// type LoginProps = LoginState & DispatchProps<AnyAction>;

export interface StateProps {
  visible: boolean;
  placement: 'top' | 'right' | 'bottom' | 'left';
}
export default class Login extends React.Component<any, StateProps> {

  constructor(props: any) {
    super(props);
    this.state = { placement: 'right', visible: false };
  }
  public render() {
    return (
      <div className={styles.login}>
        <Row>
          <Col span={16}>lattice</Col>

          <Col span={8} style={{ height: '100vh' }}>
            <div className={styles.loginBox}>
              <Row>
                <Col span={24}>
                  <Icon type="setting" style={{ float: 'right', fontSize: '1.5rem', margin: '10px' }} onClick={this.showDrawer} />
                </Col>
              </Row>
              <Row>
                <Col span={20} offset={2}>
                  <Input placeholder="username" />
                </Col>
              </Row>
              <Row>
                <Col span={20} offset={2}>
                  <Input placeholder="password" />
                </Col>
              </Row>
              <Row>
                <Col span={20} offset={2}>
                  <Button type="primary" title="Hello">Sign in</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Drawer
          title="Cofigure database connection"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={'30rem'}
        >
          <Row>
            <Col span={20} offset={2}>
              <Input placeholder="server path" />
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Input placeholder="username" />
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Input placeholder="password" />
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2}>
              <Button type="default" title="Hello">Test Connection</Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  public onClose = () => {
    this.setState({
      visible: false,
    });
  };

  public onChange = (e: any) => {
    this.setState({
      placement: e.target.value,
    });
  }

}

// export default connect<LoginState, DispatchProps<LoginActions>>(
//   (state: ApplicationState): LoginState => ({
//     userName: state.login.userName,
//     password: state.login.password,
//     fullname: state.login.fullname
//   })
// )(Login);