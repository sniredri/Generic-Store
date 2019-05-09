import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Form from './Form/Form'
import Layout from "./Layout/Layout";
import Landingpage from './LandingPage/LandingPage';
import noMatch from './noMatch/noMatch'
import desktop from './MainTabsData/Desktops'
import Moblies from "./MainTabsData/Moblies"
import Tablets from "./MainTabsData/Tablets"
import HeadPhones from "./MainTabsData/HeadPhones"
import CartIndex from './CartIndex/CartIndex'
import Cart from './CartIndex/Cart/Cart'
import DataBase from './DataBase/DataBase'
import AboutUs from './AboutUs/aboutUs'
import UnderConst from './UnderConstruction/underConst'
import './App.css';

class App extends Component {
  
  //this function purpose is to start the database
  componentDidMount() {
    DataBase.getDataBase()
  }

  render() {
    let route = (
      <Switch>
        <Route path="/register" component={Form} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/Desktop" component={desktop} />
        <Route path="/Mobiles" component={Moblies} />
        <Route path="/Tablets" component={Tablets} />
        <Route path="/CartIndex" component={CartIndex} />
        <Route path="/Cart" component={Cart} />
        <Route path="/HeadPhones" component={HeadPhones} />
        <Route path="/UnderConstruction" component={UnderConst} />
        <Route path="/Home" component={Landingpage} />
        <Redirect from="/" exact to="/Home" />
        <Route component={noMatch}></Route>
      </Switch>
    );

   
    return (
      <Layout>
        {route}
      </Layout>
    )
  }
}

export default App;