import React, { Component } from "react";
import { Icon, Col, Badge} from 'antd';
import CartData from '../CartStorage'
class Cart extends Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            show: true,
        }
    };
    render() {

        return (
            <Col offset={23}>
                <Badge count={CartData.CartData.length}>
                    <span style={{ fontSize: "50px" }} className="head-example"><Icon type="shopping-cart" /></span>
                </Badge>
            </Col>
        )
    }
}

export default Cart;