import React, { Component } from "react";
import { Table, Row, Col, Button, Icon, Avatar, Popconfirm, message, Input } from 'antd';
import './CartIndex.css'
import Cart from './CartStorage'


class CartIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataToDelete: [],
            totalSum: 0,
            isMobile: false,
            span: 0,
            offset: 0,
            selectedRowKeys: [],
            disabled: true,
            disabledPayment: true,
            indexData: 0,
            isLoading: false
        }
    };
    componentDidMount() {
        this.setState({ data: Cart.getCart() },
            () => {
                if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    this.setState({ isMobile: true, span: 24, offset: 0 })
                }
                else if (/iPad/i.test(navigator.userAgent)) {
                    this.setState({ isMobile: false, span: 20, offset: 2 })
                }
                else {
                    this.setState({ isMobile: false, span: 20, offset: 2 })
                }
                this.onTotalPriceHandler()
                this.onDisabledButtonHandler(0, "checkout")
            });

    }
    onTotalPriceHandler = () => {
        var tempSum = 0;
        var CartData = Cart.getCart()
        for (let index = 0; index < CartData.length; index++) {
            tempSum += parseInt(CartData[index].price * CartData[index].quantity);
        }
        this.setState({ totalSum: tempSum })
    }

    initQuantity = (id, type) => {
        let copyData = JSON.parse(JSON.stringify(this.state.data))
        for (let index = 0; index < copyData.length; index++) {
            if (id == copyData[index].serialNumber) {
                if (type === "dec") {
                    if (copyData[index].quantity <= 1) {
                        copyData[index].quantity = 1;
                        message.warning('You cannot set quantity lower then 1');
                        break;
                    }
                    copyData[index].quantity -= 1;
                    break;
                }
                else if (type === "inc") {
                    if (copyData[index].quantity >= 99) {
                        copyData[index].quantity = 99
                        message.warning('You cannot set quantity higher then 99');
                        break;
                    }
                    copyData[index].quantity += 1;
                    break;
                }
                else if (type === "set") {
                    copyData[index].quantity = id.target.value
                    break;
                }
                else {
                    console.log("ERR:TYPE NOT FOUND")
                }
            }
        }
        Cart.upDateCart(copyData)
        this.onTotalPriceHandler()
        this.setState({ data: Cart.getCart() })
        this.onDisabledButtonHandler(0, "checkout")

    }
    onQuantityHandler = (event, type) => {
        if (type === "inc") {
            this.initQuantity(event.target.id, "inc");
        }
        else if (type === "dec") {
            this.initQuantity(event.target.id, "dec");
        }
        else {
            this.initQuantity(event, "set");
        }
    }

    onDeleteHandler = () => {
        for (let index = 0; index < this.state.dataToDelete.length; index++) {
            Cart.deletItem(this.state.dataToDelete[index])
        }
        this.setState({ dataToDelete: [], selectedRowKeys: [], data: Cart.getCart() },
            () => {
                this.onTotalPriceHandler()
                this.onDisabledButtonHandler([], "delete")//Resseting the button to be disabled
                this.onDisabledButtonHandler(0, "checkout")
            })
        this.props.history.push({
            pathname: "/CartIndex"
        })
    }

    onSelectedItems = (selectedRowKeys) => {
        this.setState({ dataToDelete: selectedRowKeys, selectedRowKeys: selectedRowKeys })
        this.onDisabledButtonHandler(selectedRowKeys, "delete")
    }

    onConfirmHandler = () => {
        this.onDeleteHandler()
        message.success('Succesfly deleted from cart');
    }

    onDeleteButtonHandler = (value) => {
        if (value.length) {
            this.setState({ disabled: false })
        }
        else {
            this.setState({ disabled: true })
        }
    }

    onCheckoutButtonHandler = () => {
        if (this.state.data.length) {
            this.setState({ disabledPayment: false })
        }
        else {
            this.setState({ disabledPayment: true })
        }
    }

    redirectHandler=()=>{
        window.location.href = "https://www.paypal.com/us/signin"
    }

    checkOutHandler= () =>{
        this.setState({isLoading: true})
        setTimeout(this.redirectHandler, 850);
    }

    onDisabledButtonHandler = (value, type) => {
        if (type === "delete") {
            this.onDeleteButtonHandler(value);
        }
        else if (type === "checkout") {
            this.onCheckoutButtonHandler();
        }
    }

    render() {
        var indexData = 0;

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectedItems,
        }

        const columns = [
            { title: '', dataIndex: 'avatar', key: 'avatar', render: () => <Avatar style={{ display: this.state.isMobile ? "none" : "block" }} src={this.state.data[indexData].avatar} /> },
            { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            {
                title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: () =>

                    <div>
                        <Row type="flex" justify="space-between" style={{ display: this.state.isMobile ? "none" : "block" }}>
                            <span style={{}}>
                                <Button type="primary" shape="circle" id={this.state.data[indexData].serialNumber} onClick={(event) => this.onQuantityHandler(event, "inc")} >
                                    <Icon style={{ fontSize: "30px" }} type="plus-circle" theme="twoTone" />
                                </Button>
                            </span>
                            <Input
                                size="large"
                                style={{ textAlign: "center", width: '17%' }}
                                disabled={false}
                                id={this.state.data[indexData].serialNumber}
                                value={this.state.data[indexData].quantity}
                            />
                            <span style={{}}>
                                <Button type="primary" shape="circle" id={this.state.data[indexData].serialNumber} onClick={(event) => this.onQuantityHandler(event, "dec")} >
                                    <Icon style={{ fontSize: "30px" }} type="minus-circle" theme="twoTone" />
                                </Button>
                            </span>
                        </Row>

                        <Row style={{ display: this.state.isMobile ? "block" : "none" }}>
                            <Row>
                                <center>
                                    <Button type="primary" shape="circle" id={this.state.data[indexData].serialNumber} onClick={(event) => this.onQuantityHandler(event, "inc")} >
                                        <Icon style={{ fontSize: "30px" }} type="plus-circle" theme="twoTone" />
                                    </Button>
                                </center>
                            </Row>
                            <Row>
                                <center>
                                    <Col span={20}>
                                        <Input
                                            style={{ textAlign: "center" }}
                                            disabled={true}
                                            id={this.state.data[indexData].serialNumber}
                                            value={this.state.data[indexData].quantity}
                                        />
                                    </Col>
                                </center>
                            </Row>
                            <Row>
                                <center>
                                    <Button type="primary" shape="circle" id={this.state.data[indexData++].serialNumber} onClick={(event) => this.onQuantityHandler(event, "dec")} >
                                        <Icon style={{ fontSize: "30px" }} type="minus-circle" theme="twoTone" />
                                    </Button>
                                </center>
                            </Row>
                        </Row>

                    </div>
            },
        ];
        return (
            <div className="firstLayer">
                <div style={{ height: "20px", backgroundColor: "white" }} />
                <Row>
                    <Col xs={{}} md={{ span: "", offset: "" }} lg={{ span: "16", offset: "4" }} >
                        <p style={{ fontFamily: "Bree Serif", fontSize: "30px" }}><center>Your Cart</center></p>
                    </Col>
                </Row>
                <Row>
                    <Col span={this.state.span} offset={this.state.offset} style={{ backgroundColor: "white", boxShadow: "0 5px 10px 0 rgba(0,0,0,0.16)" }}>
                        <Table
                            pagination={false}
                            columns={columns}
                            footer={() =>
                                <Row type="flex" justify="space-around">
                                    <Col xs={{ span: "", offset: "" }} md={{ span: "15" }} lg={{ span: "12", offset: "3" }}>
                                        <Button disabled={this.state.disabled} size="large" shape="circle" style={{ fontSize: "25px" }}>
                                            <Popconfirm title="Are you sure you want to delete the selected items from your cart?" onConfirm={this.onConfirmHandler} okText="Yes" cancelText="No">
                                                <div><Icon type="delete" theme="twoTone" /></div>
                                            </Popconfirm>
                                        </Button>
                                    </Col>
                                    <Col style={{ fontSize: "25px" }} xs={{ span: "", offset: "" }} md={{ span: "8" }} lg={{ span: "8" }}>
                                        <Icon style={{ fontSize: "30px" }} type="dollar" /> <span style={{ fontFamily: "Righteous" }}><u><b>Total price:</b></u> {this.state.totalSum}</span>
                                    </Col>
                                </Row>
                            }
                            dataSource={this.state.data ? this.state.data : null}
                            rowSelection={rowSelection}
                        />
                    </Col>
                </Row>
                <div style={{ height: "15px" }} ></div>
                <Row>
                    <Col xs={{ span: "4", offset: "15" }} md={{ span: "2", offset: "17" }} lg={{ span: "2", offset: "19" }}>
                        <Button type="primary" loading={this.state.isLoading} disabled={this.state.disabledPayment} onClick={this.checkOutHandler} icon="check-circle" theme="twoTone"> Check Out</Button>
                    </Col>
                </Row>
                <div style={{ height: "20px" }} />
            </div >
        )
    }
}

export default CartIndex;