import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './login.css'
import { Form, Icon, Input, Button, Col } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
  state = {
    data: {
      userName: "",
      password: "",
    },
    valid: false,
    isRegister: false
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    if (localStorage.getItem("userInfo")) {
      let tempUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      let userDataCopy = JSON.parse(JSON.stringify(this.state.data))
      userDataCopy.userName = tempUserInfo.name
      userDataCopy.password = tempUserInfo.password
      this.setState({ data: userDataCopy, isRegister: true });
    }
    if (!this.state.isRegister) {
      this.props.form.validateFields();
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState({ data: { userName: values.userName, password: values.password }, valid: true }, () => {
        if (!err) {
          let userinfo = {
            name: this.state.data.userName,
            password: this.state.data.password
          }
          localStorage.setItem("userInfo", JSON.stringify(userinfo))
          window.location.reload(true);
        }
      });
    })
  }
  onclickhandler = () => {
    localStorage.clear();
    window.location.reload(true);
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div>
        <span style={{ display: this.state.isRegister ? "none" : "block" }}>
          <Col lg={2} xs={1} sm={1}>
            <div style={{ padding: "7px" }}>
              <Link to="/register"><Button size="small" type="primary" icon="user-add">Register</Button></Link>
            </div>
          </Col>
          <Col lg={{ span: 8, offset: 13 }} xs={{ span: 15, offset: 8 }} sm={{ span: 16, offset: 7 }} md={{ span: 16, offset: 5 }}>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError || ''}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Log in
          </Button>
              </Form.Item>
            </Form>
          </Col>
        </span>
        <span style={{ display: this.state.isRegister ? "block" : "none" }}>

          <Col lg={6} md={6} xs={24}>
            <span style={{ fontSize: "25px", padding: "10px",margin:"2px", fontFamily: "ZCOOL QingKe HuangYou" }}>Welcome back <u>{this.state.data.userName}</u></span>
          </Col>
          <Col lg={{ offset: 16, span: 2 }} md={{ offset: 14, span: 2 }} xs={1} style={{ padding: "7px" }}>
            <Button size="small" type="primary" icon="poweroff" onClick={this.onclickhandler}>Logout</Button>
          </Col>

        </span>

      </div>
    );
  }
}
export default Form.create()(HorizontalLoginForm);

