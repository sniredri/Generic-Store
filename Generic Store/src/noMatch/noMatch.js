import React, { Component } from "react";
import { Row, Icon, Button } from 'antd'
import {withRouter} from 'react-router'

class Nomatch extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            redirect: false
        })
        }

        redirectHandler=()=>{
            this.props.history.push({
                pathname: "/Home"
            })
            this.setState({redirect: false})
        }

        //This function handle the redirecting request
        onClickHandler=()=>{
            this.setState({redirect: true})
            setTimeout(this.redirectHandler, 850);
        }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                {this.setTimeout}
                <center>
                    <div style={{ height: "50px" }}></div>
                    <Row>
                        <Icon style={{ textAlign: "center", fontSize: "180px" }} type="file-unknown" theme="filled" />
                    </Row>
                    <Row >
                        <h1 style={{ textAlign: "center", fontSize: "80px" }}>404 NOT FOUND</h1>
                    </Row>
                    <Row>
                        <Button style={{display: this.state.redirect? "none":"block"}} onClick={this.onClickHandler} type="primary">Take me back to home</Button>
                        <div></div>
                        <div style={{display: this.state.redirect? "block":"none"}}>
                        <p style={{ fontSize: 50 }}>Redirecting back to home</p>
                        <Icon type="loading" style={{ fontSize: 65 }} spin />
                        </div>
                    </Row>
                    <div style={{ height: "50px" }}></div>
                </center>
            </div>
        )
    }
}

export default withRouter(Nomatch)