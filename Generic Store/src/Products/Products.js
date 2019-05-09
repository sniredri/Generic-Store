import React from "react";
import { Col, Card, Icon, Avatar } from 'antd';
import './Products.css'
const { Meta } = Card;
const Products = (props) => {
    return (
        <div>
        <Col xs={23} sm={15} md={8} lg={8}>
            <Card
                cover={<img alt={props.title} src={props.imageUrl} />}
                actions={[<Icon style={{fontSize: "25px"}}type="heart" title="Add to your wishlist" onClick={props.clickFavor} />, <Icon style={{fontSize: "25px"}} title="Add to your cart" type="shopping-cart" onClick={props.clickCart} />]}
            >
                <Meta style={{fontFamily: "Asap"}}
                    avatar={<Avatar src={props.avatar} />}
                    title={props.title}
                    description={props.description}
                    
                />
               <Col xs={{offset: 15}} sm={{offset: 5}}  md={{offset:18}} lg={{offset: 20}}>
               <b>{props.price}$</b>
               </Col>
            </Card>
            <div style={{ height: "15px" }}></div>
        </Col>
        </div>
    )
}
export default Products;