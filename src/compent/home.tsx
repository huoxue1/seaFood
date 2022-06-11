import React, {Component} from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    Form,
    FormInstance,
    Input,
    Layout,
    Menu,
    message,
    Pagination,
    Row,
    Select,
    Table,
    Upload
} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import APi from "../utils/api"
import {RcFile} from "antd/es/upload";
import {ColumnsType} from "antd/es/table";
import {WithProps} from "../utils/props";
import Column from "antd/es/table/Column";

class Home extends Component<WithProps, any> {

    items = [
        {
            label: '店铺管理', key: 'shop-manager', children: [
                {
                    label: "添加店铺",
                    key: "shop-add"
                }, {
                    label: "店铺查看",
                    key: "shop-show"
                }
            ]
        }, // 菜单项务必填写 key
        {
            label: '货物管理', key: 'goods-manager', children: [
                {
                    label: "添加货物",
                    key: "goods-add"
                }
            ]
        },
        {
            label: '用户管理',
            key: 'user-manager',
            children: [
                {label: "查看用户", key: "user-show"},
                {label: '退出登录', key: 'logout'},
            ],
        },
    ];

    constructor(props: WithProps) {
        super(props);
        this.state = {
            index: "shop-show",
            select_shop: 0
        }
    }

    setSelectShop = (id: any) => {
        this.setState({
            select_shop: id
        })
    }

    setIndex = (index: string) => {
        this.setState({
            index: index
        })

    }

    componentDidMount() {

    }

    menuCLick = (menuItem: any) => {
        if (menuItem.key === "logout") {
            sessionStorage.removeItem("sea_user_id")
            this.props.navigate("/login")
        }
        this.setState({
            index: menuItem.key
        })
    }

    render() {
        return <>
            <Layout style={{height: window.innerHeight}}>
                <Header style={{background: "#cdf3cd", paddingLeft: 10}}>
                    <h1>海鲜市场后台管理</h1>
                </Header>
                <Layout>
                    <Sider>
                        <Menu onClick={this.menuCLick} theme={"dark"} style={{}} items={this.items} mode={"inline"}/>
                    </Sider>
                    <Content>
                        <Rout methos_index={this.setIndex} select_shop={this.state.select_shop}
                              method_shop={this.setSelectShop} index={this.state.index}/>
                    </Content>
                </Layout>
            </Layout>
        </>
    }
}

class Rout extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {
        switch (this.props.index) {
            case "shop-show": {
                return <ShopShow methos_index={this.props.methos_index} method_shop={this.props.method_shop}/>
            }
            case "shop-add": {
                return <ShopAdd/>
            }
            case "shop-info": {
                return <ShopInfo select_shop={this.props.select_shop}/>
            }
            case "goods-add": {
                return <GoodsAdd/>
            }
            case "user-show":{
                return <UserShow />
            }
        }
    }
}


class UserShow extends Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            user_list: []
        }
    }

    componentDidMount() {
        APi.user_list().then(r => {
            this.setState({
                user_list: r.data
            })
        })
    }


    render() {
        return <>
            <Table dataSource={this.state.user_list}>
                <Column dataIndex={"id"} title={"用户id"} key={"id"}/>
                <Column dataIndex={"username"} title={"用户名"} key={"username"}/>
                <Column dataIndex={"password"} title={"password"} key={"password"} />
            </Table>
        </>;
    }

}

class GoodsAdd extends Component<any, any> {

    formRef = React.createRef<FormInstance>()

    constructor(props: any) {
        super(props);
        this.state = {
            shop_list: []
        }
    }

    componentDidMount() {
        // 获取店铺列表
        APi.shop_list().then(r => {
            if (r.code !== 200) {
                message.error("获取店铺信息错误")
                return
            } else {
                let shop_list = []
                for (let i = 0; i < r.data.length; i++) {
                    let shop = {
                        label: r.data[i].shop_name,
                        value: r.data[i].id
                    }
                    shop_list.push(shop)
                }
                this.setState({
                    shop_list: shop_list
                })
            }

        })
    }

    onFinish = (values: any) => {
        APi.goods_add(values).then(r => {
            message.info("添加成功")
            this.formRef.current?.setFieldsValue({
                shop_id: "",
                goods_name: "",
                count: "",
                price: ""
            })
        })
    }

    render() {
        return <>
            <Form
                ref={this.formRef}
                name="basic"
                style={{marginTop: 40}}
                labelCol={{span: 2}}
                wrapperCol={{span: 8}}
                onFinish={this.onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name={"shop_id"}
                    label={"店铺选择"}
                    rules={[{required: true, message: '请选择店铺！'}]}
                >
                    <Select options={this.state.shop_list}>

                    </Select>
                </Form.Item>

                <Form.Item
                    label="货物名称"
                    name="goods_name"
                    rules={[{required: true, message: '请输入货物名称！'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="货物数量"
                    name="count"
                    rules={[{required: true, message: '请输入货物数量'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="货物单价"
                    name="price"
                    rules={[{required: true, message: '请输入货物单价'}]}
                >
                    <Input/>
                </Form.Item>


                <Form.Item wrapperCol={{offset: 5, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>;
    }
}

interface DataType {
    key: React.Key;
    id: number;
    goods_name: string;
    count: number;
    price: number;
}

// 展示店铺详细信息
class ShopInfo extends Component<any, any> {

    columns: ColumnsType<DataType> = [
        {
            title: '货物id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '货物名称',
            dataIndex: 'goods_name',
            key: 'goods_name',
        },
        {
            title: '货物数量',
            dataIndex: 'count',
            key: 'count',
        }, {
            title: "货物单价",
            dataIndex: "price",
            key: "price"
        }, {
            dataIndex: "id",
            key: "action",
            render: text => <Button>{"删除" + text}</Button>,
        }
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            goods_list: [],
            shop: {}
        }
    }

    render() {
        return <>
            <Table dataSource={this.state.goods_list} columns={this.columns}>


            </Table>
        </>;
    }

    componentDidMount() {
        APi.query_goods_by_shop_id(this.props.select_shop).then(r => {
            this.setState({
                goods_list: r.data
            })
        })
        APi.shop_query_by_id(this.props.select_shop).then(r => {
            this.setState({
                shop: r.data
            })
        })
    }

}

// 展示所有店铺
class ShopShow extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            shop_list: [],
            page_list: [],
            page: {
                current_page: 1,
                total: 0,
                page_size: 6
            }
        }
    }

    componentDidMount() {
        APi.shop_list().then(r => {
            let page_list = r.data.slice(0, 6)
            this.setState({
                page_list: page_list
            })
            if (r.code !== 200) {
                message.error("获取店铺信息错误")
                return
            } else {
                this.setState({
                    shop_list: r.data,
                    page: {
                        current_page: 1,
                        total: r.data.length,
                        page_size: 6
                    }
                })
            }

        })

    }

    onPageChange = (page: number, page_size: number) => {
        console.log(page, page_size)
        let page_list = this.state.shop_list.slice((page - 1) * page_size, page * page_size)
        this.setState({
            page_list: page_list,


    })
    }

    get_item = () => {

    }

    onCardButtonClick = (id: number) => {
        console.log(this.props)
        this.props.method_shop(id)
        this.props.methos_index("shop-info")
    }

    render() {
        return <>
            <Card bordered={true} style={{width: "100%"}}>
                {this.state.page_list.map((data: any) => (

                    <Card.Grid
                        key={data.id}
                        style={{
                            width: "30%",
                            marginRight: "1.6%",
                            marginLeft: "1.6%",
                            border: "red",
                            marginTop: 20,
                            marginBottom: 20,
                            textAlign: "left"
                        }}
                    >
                        <Row>
                            <Col span={10}>
                                <Avatar size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}} src={data.avatar}/>
                            </Col>
                            <Col style={{textAlign: "left"}} span={12}>
                                <h2 style={{color: "red"}}>{data.shop_name}</h2>
                                <p>{data.introduction}</p>
                                <Button onClick={this.onCardButtonClick.bind(this, data.id)} style={{textAlign: "left"}}
                                        type={"primary"}>进店看看</Button>
                            </Col>
                        </Row>


                    </Card.Grid>
                ))}
            </Card>
            <Pagination
                defaultPageSize={this.state.page.page_size}
                total={this.state.page.total}
                pageSizeOptions={[3, 6, 9, 12]}
                showSizeChanger={true}
                onChange={this.onPageChange}
            />
        </>;
    }
}

class ShopAdd extends Component<any, any> {


    formRef = React.createRef<FormInstance>()

    constructor(props: any) {
        super(props);
        this.state = {
            avatar: ""
        }
    }

    getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    onFinish = (values: any) => {
        if (this.state.avatar === "") {
            message.error("请上传头像")
            return
        }
        APi.shop_add(values.shop_name, values.introduction, this.state.avatar).then(r => {
            console.log(r)
            if (r.code === 200) {
                message.info("添加店铺成功")
                this.formRef.current?.setFieldsValue({
                    "shop_name": "",
                    "introduction": ""
                })
                this.setState({
                    "avatar": ""
                })
            }
        })
    }

    beforeUpload = (file: RcFile) => {
        this.getBase64(file, (data) => {
            this.setState({
                "avatar": data
            })
        })
        return false
    }

    render() {
        return <>
            <Form
                ref={this.formRef}
                name="basic"
                style={{marginTop: 40}}
                labelCol={{span: 2}}
                wrapperCol={{span: 8}}
                onFinish={this.onFinish}
                autoComplete="off"
            >

                <Form.Item
                    label={"头像上传"}
                >
                    <Upload beforeUpload={this.beforeUpload} showUploadList={false}>
                        <Button>点击上传</Button>
                    </Upload>
                    <Avatar src={this.state.avatar} shape={"circle"}/>
                </Form.Item>
                <Form.Item
                    label="店铺名称"
                    name="shop_name"
                    rules={[{required: true, message: '请输入店铺名称！'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="店铺简介"
                    name="introduction"
                    rules={[{required: true, message: '请输入店铺简介'}]}
                >
                    <Input.TextArea/>
                </Form.Item>


                <Form.Item wrapperCol={{offset: 5, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </>;
    }
}

export default Home
