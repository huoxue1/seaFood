import React, {Component} from "react";
import {WithProps} from "../utils/props";
import {Link} from "react-router-dom";
import {Button, Checkbox, Col, Form, FormInstance, Input, Layout, message, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import Api from "../utils/api"

class Login extends Component<WithProps, any> {

    componentDidMount() {
        let user = localStorage.getItem("sea_user")
        if (typeof user === "string") {

            this.formRef.current?.setFieldsValue(
                JSON.parse(user)
            )
        }

    }

    formRef = React.createRef<FormInstance>()

    onFinish = (values: any) => {

        Api.login(values.username, values.password).then(r => {
            console.log(r)
            if (r.code === 200) {

                if (values.remember){
                    localStorage.setItem("sea_user",JSON.stringify(values))
                }

                message.info("登录成功")
                sessionStorage.setItem("sea_user_id", String(r.data))
                this.props.navigate("/home")
            } else {
                message.error(r.error)
            }
        })
    }

    onFinishFailed = (err: any) => {

    }

    render() {
        return <>
            <Layout>
                <Content style={{height: window.innerHeight}}>
                    <Row style={{marginTop: 30}}>
                        <Col offset={10} span={8}>
                            <h1 style={{fontSize: 50, color: "blue"}}>海鲜管理系统</h1>
                        </Col>
                    </Row>
                    <Form
                        ref={this.formRef}
                        style={{marginTop: window.innerHeight * 0.1}}
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 8}}
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[{required: true, message: '请输入账号!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                            <Checkbox>记住密码</Checkbox>

                            <Link to={"/register"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册</Link>
                        </Form.Item>


                        <Form.Item wrapperCol={{offset: 11, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>


                    </Form>
                </Content>
            </Layout>


        </>;
    }
}


export default Login
