import {Component} from "react";
import {WithProps} from "../utils/props";
import {Link} from "react-router-dom";
import {Button, Col, Form, Input, Layout, message, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import Api from "../utils/api"

class Register extends Component<WithProps, any> {
    constructor(props: WithProps) {
        super(props);
        this.state = {
            is_login: false
        }
    }

    componentDidMount() {
    }

    onFinish = (values: any) => {
        if (values.password !== values.repeatPassword) {
            message.error("密码不一致，请重新输入")
            return
        } else {
            Api.register(values.username, values.password).then(r => {
                if (r.code !== 200) {
                    message.error(r.error)
                } else {
                    message.info("注册成功")
                    this.props.navigate("/login")
                }
            })
        }
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
                            <Input placeholder={"请输入账号"}/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{required: true, message: '请输入密码!'}]}
                        >
                            <Input.Password placeholder={"请输入密码"}/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="repeatPassword"
                            rules={[{required: true, message: '请确认密码!'}]}
                        >
                            <Input.Password placeholder={"请确认密码"}/>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                            <Link to={"/login"}>返回登录</Link>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 11, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>


                    </Form>
                </Content>
            </Layout>


        </>;
    }
}


export default Register
