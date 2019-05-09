import React, { Component } from 'react'
import { Col, Row, Icon } from 'antd'
import './aboutUs.css'
export class aboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            mapWidth: "600",
            mapHeight: "500",
            span: 12,
            justify: "space-around",
        };
    }

    componentDidMount() {
        if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.setState({ isMobile: true, mapHeight: "275", mapWidth: "275", span: 24, justify: "space-between" })
        }
        else if (/iPad/i.test(navigator.userAgent)) {
            this.setState({ isMobile: false, mapHeight: "400", mapWidth: "325", span: 12, justify: "space-around" })
        }
        else {
            this.setState({ isMobile: false })
        }
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col offset={2} span={22}>
                        <p className="title"><u><b>About us</b></u></p>
                    </Col>
                </Row>
                <Row>
                    <Col offset={2} span={21}>
                        <p className="paragraph">
                            We, As a GenericStore, believe in our products and customers.<br />
                            We always wanted to give the best exprience and make WEB stores much easier to use, our goal and values are deeply related to our beliefs.<br />
                            We want you to contact us, give us advises and we will guide your path to GLORY.<br /><br />
                            You, the customer, are the most important to our pockets, bank account and family (no money no wife).<br />
                            You, can be the shy one, who we love to milk the hell of your money and life force.<br />
                            You, are simply... STUPID for reading this shit.
                        </p>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <center>
                        <p className="mapTitle"><Icon type="global" /> <b><u>Our shop locations</u></b></p>
                    </center>
                </Row>

                <Row type="flex" justify={this.state.justify} align="middle">
                    <Col span={this.state.span}>
                        <span>
                            <center>
                                <p className="mapAdress"><Icon type="shop" /> Imber 21, Kefar Saba, zip: 444451</p>
                                <span className="mapouter">
                                    <span className="gmap_canvas">
                                        <iframe title={"KefarSaba"} className="mapBorder" width={this.state.mapWidth} height={this.state.mapHeight} id="gmap_canvas" src="https://maps.google.com/maps?q=kefar%20saba%20imber%2021&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                        </iframe>
                                    </span>
                                </span>
                            </center>
                        </span>
                    </Col>
                    <div style={{ display: this.state.isMobile ? "block" : "none", padding: "15px" }}></div>
                    <Col span={this.state.span}>
                        <center>
                            <p className="mapAdress"><Icon type="shop" /> Harzit 19, Modi'in, zip: 4388451</p>
                            <span className="mapouter">
                                <span className="gmap_canvas">
                                    <iframe title={"Modiin"} className="mapBorder" width={this.state.mapWidth} height={this.state.mapHeight} id="gmap_canvas" src="https://maps.google.com/maps?q=modiin%20hartsit%2019&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                    </iframe>
                                </span>
                            </span>
                        </center>
                    </Col>
                </Row>
                <div style={{ padding: "13px" }}></div>
            </div>
        )
    }
}

export default aboutUs
