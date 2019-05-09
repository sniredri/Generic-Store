import { Menu, Icon, Row, Col } from 'antd';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SideMenu.css'
const SubMenu = Menu.SubMenu;

class Sider extends Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    return (
      <Row>
        <Col>
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={{ width: 200 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="idcard" theme="filled" style={{fontSize:"20px"}}/><span style={{ fontFamily: "Baloo", fontSize:"18px" }}>Profile</span></span>}>
              <Menu.Item key="1" ><Link to="/UnderConstruction"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>My profile</span></Link></Menu.Item>
              <Menu.Item key="2"><Link to="/UnderConstruction"><span style={{ fontFamily: "Forum", fontSize:"17px" }}>Message box</span></Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="gift" theme="filled" style={{fontSize:"20px"}}/><span style={{ fontFamily: "Baloo", fontSize:"18px" }}>Gifts</span></span>}>
              <Menu.Item key="3" ><Link to="/desktop"><span style={{ fontFamily: "Forum", fontSize:"17px" }}>Mens</span></Link></Menu.Item>
              <Menu.Item key="4"><Link to ="/Moblies"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Womens</span></Link></Menu.Item>
              <Menu.Item key="5"><Link to="/tablets"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Students</span></Link></Menu.Item>
              <Menu.Item key="6"><Link to="/HeadPhones"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Kids</span></Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="like" theme="filled" style={{fontSize:"20px"}}/><span style={{ fontFamily: "Baloo", fontSize:"18px" }}>About us</span></span>}>
              <Menu.Item key="7" ><Link to="/AboutUs"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Who are we?</span></Link></Menu.Item>
              <Menu.Item key="8"><a href="mailto:webmaster@example.com"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Contact us</span></a></Menu.Item>
              <Menu.Item key="9"><Link to="/register"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>Join us!</span></Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" theme="filled" style={{fontSize:"20px"}}/><span style={{ fontFamily: "Baloo", fontSize:"18px" }}>Options</span></span>}>
              <Menu.Item key="10" ><Link to="/UnderConstruction"><span style={{ fontFamily: "Forum", fontSize:"17px" }}>Theme</span></Link></Menu.Item>
              <Menu.Item key="11"><Link to="/UnderConstruction"><span style={{ fontFamily: "Forum" , fontSize:"17px"}}>FAQ</span></Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    );
  }
}

export default Sider;