import React, { Component } from 'react';
import { Layout, Row, Col, Icon } from 'antd';
import { Link } from "react-router-dom";
import './Footer.css'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.setState({ isMobile: true })
    }
  }

  render() {

    const { Footer } = Layout

    return (
      <div className="footerBox">
        <div style={{ padding: "5px" }}></div>
        <Row>
          <Col lg={{ offset: "1", span: "23" }} md={{ offset: "1", span: "23" }} xs={{ offset: "1", span: "16" }}>
            <p className="touchLine">Stay in touch:</p>
          </Col>
          <Col xs={{ span: "7" }} style={{ display: this.state.isMobile ? "block" : "none" }}>
            <Link to="/aboutUs">
              <span className="aboutLine"> About us </span>
            </Link>
          </Col>
        </Row>

        <Row type="flex" justify="space-around">
          <Col lg={6} xs={24}>
            <a href="https://www.twitter.com">
              <Icon className="logo" type="twitter" />
              <span className="socialLine"> Follow us on twitter</span>
            </a>
          </Col>

          <Col lg={6} xs={24}>
            <a href="https://www.facebook.com">
              <Icon className="logo" type="facebook" />
              <span className="socialLine"> Visit our facebook page</span>
            </a>
          </Col>

          <Col lg={7} xs={24}>
            <a href="https://www.instagram.com">
              <Icon className="logo" type="instagram" />
              <span className="socialLine"> Follow our instagram page</span>
            </a>
          </Col>
        </Row>
        <div style={{ padding: "5px" }}></div>
        <Footer style={{ textAlign: 'center' }}>Wiederdri Design ©2019 Created by Daniel and Snir</Footer>
      </div >
    );
  }
}

export default Footer;
