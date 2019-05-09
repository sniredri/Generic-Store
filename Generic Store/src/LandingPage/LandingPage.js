import React, { Component } from "react";
import { Row, Col, Icon, Layout, message } from 'antd';
import Products from "../Products/Products"
import SideMenu from '../SideMenu/SideMenu'
import './LandingPage.css'
import Carousel from '../Carousel/Carousel'
import DataBase from '../DataBase/DataBase'
import Cart from '../CartIndex/CartStorage'
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
const { Sider } = Layout;

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isMobile: false,
            data: [],
            hotProd: [41, 12, 23, 24, 35, 46]
        };
    }

    componentDidMount() {
        this.setState({ data: DataBase.getDataBase() },
            () => {
                /*CALLBACK1 - Sorting and displaying the "hot" products by ID*/
                let tempHot = [];
                for (let i = 0; i < this.state.hotProd.length; i++) {
                    for (let j = 0; j < this.state.data.length; j++) {
                        if (this.state.hotProd[i] === this.state.data[j].serialNumber) {
                            tempHot[i] = this.state.data[j];
                        }
                    }
                }
                this.setState({ data: tempHot },
                    /*CALLBACK2 - This part is to check if the user using mobile device or tablet*/
                    () => {
                        if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            this.setState({ isMobile: true, loaded: true })
                        }
                        else {
                            this.setState({ loaded: true, isMobile: false })
                        }
                    })
            })
            window.scrollTo(0, 0)
    }

    onFavorHandler = () =>{
        message.error('This feature is not ready yet for production');
    }

    onCartHandler = (item) => {
        Cart.addItem(item)
        message.success('Successfully added to cart')
        this.props.history.push({
            pathname: "/Home"
        })
    }

    render() {
        let ProductsArr = []
        for (let key in this.state.data) {
            ProductsArr.push({
                title: this.state.data[key].productName,
                product: this.state.data[key].product,
                price: this.state.data[key].price,
                avatar: this.state.data[key].avatar,
                imageUrl: this.state.data[key].imageUrl,
                serialNumber: this.state.data[key].serialNumber,
                key: this.state.data[key].serialNumber,
                quantity: this.state.data[key].quantity
            })
        }
        let product = ProductsArr.map(item => {
            return (
                <Products
                    key={item.key}
                    title={item.title}
                    avatar={item.avatar}
                    imageUrl={item.imageUrl}
                    description={item.product}
                    price={item.price}
                    serialNumber={item.serialNumber}
                    clickFavor={(event) => this.onFavorHandler(item)}
                    clickCart={(event) => this.onCartHandler(item)}
                />
            )
        })

        return (
            <div>
                <div style={{ display: this.state.loaded ? "none" : "block" }}>
                    <center>
                        <Icon type="loading" style={{ fontSize: 200 }} spin />
                    </center>
                </div>
                <div style={{ display: this.state.loaded ? "block" : "none" }}>
                    <div>
                        <ScrollUpButton style={{ display: this.state.isMobile ? "none" : "block", zIndex: 1 }}
                            EasingType="linear"
                            AnimationDuration={150}
                        />
                    </div>
                    <Row>
                        <Col lg={23} m={23} xs={24}>
                            <div style={{ height: "30px" }}></div>
                            <Row>
                                <Col style={{ display: this.state.isMobile ? "none" : "block"}} lg={{ span: 4, offset: 0 }} xs={{ span: 12, offset: 6 }} md={{ span: 7, offset: 0 }}>
                                    <Sider style={{ backgroundColor: "#f0f2f5" }}><SideMenu /></Sider>
                                    <div style={{ height: "35px" }}></div>
                                </Col>

                                <Col lg={{ span: 17, offset: 1 }} xs={{ span: 22, offset: 1 }} md={{ span: 15, offset: 1 }}>
                                    <Carousel />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={{ span: 10, offset: 1 }} xs={{ span: 16, offset: 4 }} md={{ span: 10, offset: 1 }}>
                                    <div style={{ height: "0px" }}></div>
                                    <h3 style={{ fontSize: "35px", fontFamily: "Bangers" }}><Icon type="fire" /><u>Hot products</u></h3>
                                    <div style={{ height: "15px" }}></div>
                                </Col>
                            </Row>
                            <Row gutter={12}>
                                <Col xs={{ offset: 1 }} sm={{ offset: 3 }} md={{ offset: 1 }} lg={{ offset: 1 }}>
                                    {product}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Landingpage;