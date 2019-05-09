import React, { Component } from "react";
import { Row, Col, Tabs, Icon } from 'antd';
import { withRouter } from 'react-router'
import Search from '../SearchBar/searchBar'
class MainTabs extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isMobile: false,
            tabsInfo: {
                main: {
                    title: "Home",
                    link: "/",
                    icon: "",
                    key: "Home",
                },
                desktop: {
                    title: "Desktops",
                    icon: "desktop",
                    key: "Desktop",
                },
                Mobile: {
                    title: "Mobiles",
                    icon: "mobile",
                    key: "Mobiles",
                },
                Tablet: {
                    title: "Tablets",
                    icon: "tablet",
                    key: "Tablets",
                },
                Headphone: {
                    title: "Headphones",
                    icon: "customer-service",
                    key: "Headphones",
                }
            }
        })
    };

    componentDidMount(){
        if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.setState({ isMobile: true})
        }
        else {
            this.setState({ isMobile: false })
        }
    }

    //this fucntion handle the user request for specific tab
    onTabClickHandler = (value) => {
        this.props.history.push({
            pathname: "/" + value
        })
    }

    render() {
        const TabPane = Tabs.TabPane;

        let tabsArr = [];
        for (let key in this.state.tabsInfo) {
            tabsArr.push({
                title: this.state.tabsInfo[key].title,
                link: this.state.tabsInfo[key].link,
                icon: this.state.tabsInfo[key].icon,
                key: this.state.tabsInfo[key].key
            });

        }
        let tabs = tabsArr.map(item => {
            let title = item.title
            let icon = item.icon
            let key = item.key

            return (
                <TabPane tab={<span><Icon type={icon} />{title}</span>} key={key}></TabPane>
            );
        });
        return (
            <div>
                <div style={{ height: "7px" }}></div>
                <Row>
                    <Col lg={18} md={18} xs={24}>
                        <Tabs defaultActiveKey="Home" onTabClick={(TabPane) => this.onTabClickHandler(TabPane)} type="card">
                            {tabs}
                        </Tabs>
                    </Col>
                    <Col lg={6} md={6} xs={24}>
                        <center >
                            <Search />
                        </center>
                    </Col>
                </Row>
            </div >
        )
    }
}


export default withRouter(MainTabs)