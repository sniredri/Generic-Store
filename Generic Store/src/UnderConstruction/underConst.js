import React, { Component } from "react";
import { Row, Icon } from 'antd'
import { withRouter } from 'react-router'
import Countdown from 'react-countdown-now';

class underConst extends Component {

    redirectHandler = () => {
        this.props.history.push({
            pathname: "/Home"
        })
    }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                {this.setTimeout}
                <center>
                    <div style={{ height: "50px" }}></div>
                    <Row>
                        <Icon style={{ textAlign: "center", fontSize: "120px" }} type="warning" theme="filled" />
                    </Row>
                    <Row >
                        <h1 style={{ textAlign: "center", fontSize: "50px" }}>This feature is under construction</h1>
                    </Row>
                    <Row>
                        <div>
                            <p style={{ fontSize: 35 }}>Redirecting back to home in  
                            <span > <mark style={{fontSize: "30px"}}><Countdown  
                            date={Date.now() + 4150}
                            zeroPadTime={1}
                            onComplete={this.redirectHandler}
                            /></mark> </span>
                            Seconds
                            </p>
                            <Icon type="sync" style={{ fontSize: 70 }} spin />
                        </div>
                    </Row>
                    <div style={{ height: "50px" }}></div>
                </center>
            </div>
        )
    }
}

export default withRouter(underConst)