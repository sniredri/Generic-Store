import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout } from 'antd';
import Login from '../login/login'
import {withRouter} from 'react-router'
import Cart from '../CartIndex/Cart/Cart'
import { Row, Col,Icon } from 'antd';
import './Header.css'

class Header extends Component {
state=({
count: 0,
reload: false
})
  render() {

    const { Header } = Layout;
    
    return (
      <div>
        {/*Login section*/}
        <Row>
          <Col span={24}>
            <Login />
          </Col>
        </Row>
        {/*Header section*/}
        <div style={{backgroundColor:"#001529"}}>
        <Row>
       
          <Header className="mainHeaderBG">
            <Col lg={22} md={22} xs={18}>
              <a style={{ color: "white" }} href="/"><span><Icon type="shop" />GenericStore</span> </a>
            </Col>
            <Col lg={1} md={1} xs={1}>
           <Link to="/CartIndex"><Cart/></Link>
           </Col>
           
          </Header>
        
        </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)
