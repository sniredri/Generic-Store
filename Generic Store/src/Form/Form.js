import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button,message
} from 'antd';

const { Option } = Select;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        iconLoading: false,
        buttonShow: true,
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
        setTimeout(this.buttonShowHandler, 850);
      }

    buttonShowHandler = () =>{
        this.setState({buttonShow: false})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err && value.agreement) {
                /*we dont have database so it just printing the results...
                 in real life it will insert into database*/
                console.log('Received values of form: ', value);
                this.props.history.push({
                    pathname:"/",
                    state:{
                        details:value,
                    }
                });
            }
            if(!value.agreement){
                message.warning('Please read and agree the agreement.');
            }
        });
    }

    handleCaptcha = (rule, value, callback) => {
        if (value !== "10") {
            callback('Please enter the right answer');
        } else {
            callback();
        }
    }

    handleConfrimPhone = (rule, value, callback) => {
        if (value.length !== 7) {
            callback('You must enter 7 digits!');
        } else {
            callback();
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 1 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 12,
                    offset: 6,
                },
                sm: {
                    span: 8,
                    offset: 4,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '050',
        })(
            <Select style={{ width: 85 }}>
                <Option value="050">050</Option>
                <Option value="052">052</Option>
                <Option value="053">053</Option>
                <Option value="055">055</Option>
                <Option value="056">056</Option>
                <Option value="057">057</Option>
            </Select>
        );


        return (
            <div>
            <Row>
             <Col span={18} offset={4}>
           <h3 style={{fontSize:"30px"}}><Icon type="user-add" /> <u>Registration Form</u></h3>
            </Col> 
            </Row>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label={(
                        <span>
                            Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Full Adress"
                >
                    {getFieldDecorator('Adress', {
                        initialValue: "",
                        rules: [{ type: 'string', required: true, message: 'Please fill your FULL adress including zip code' }],
                    })(
                        <Input placeholder = "Ben Gurion 54, Apartment 4, Tel Aviv 4445128"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }, {
                            validator: this.handleConfrimPhone,
                        }],
                    })(
                        <Input type="number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Captcha"
                    extra="We have to make sure you're a human."
                >
                    <Row>
                        <Col span={10}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' },{
                                    validator: this.handleCaptcha,
                                }],
                            })(
                                <Input />
                            )}
                        </Col>
                        <Col style={{display:this.state.buttonShow?  "block": "none" }} span={6} offset={1}>
                            <Button loading={this.state.iconLoading} onClick={this.enterIconLoading}>Get captcha</Button>
                        </Col>
                        <Col span={6} offset={1} style={{display:this.state.buttonShow? "none":"block"}}>
                                <span>5 + 5 = ?</span>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read theagreement</Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register now!</Button>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

export default (Form.create()(RegistrationForm))
