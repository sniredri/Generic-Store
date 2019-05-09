import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MainTab from '../MainTabs/MainTabs'
import { Layout } from 'antd';


const { Content } = Layout;

class Layout1 extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Header />
          <MainTab />
          <Layout>
            <Content>{this.props.children}</Content>
          </Layout>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default Layout1;
