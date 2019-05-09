import React, { Component } from "react";
import { Row, Col, message, Pagination, Icon } from 'antd';
import Filterbar from '../FilterBar/FilterBar'
import Products from '../Products/Products'
import DataBase from '../DataBase/DataBase'
import Cart from '../CartIndex/CartStorage'
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import './mainTabsStyle.css'

class HeadPhones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataDisplay: [],
            currentPage: 0,
            chunk: 12,
            isMobile: false,
            loaded: false,
            Products: {
                inputValue: 1,
                min: 0,
                max: 1,
            },
        };
    }
    
    componentDidMount() {
        this.setState({ data: DataBase.getDataBase() },
            /*CALLBACK1 - This part is to set the init slider by product's lowest price and highest price and handle pagination*/
            () => {
                let maxi = 0, mini = parseInt(this.state.data[0].price, 10);
                for (let i = 0; i < this.state.data.length; i++) {
                    if (mini > parseInt(this.state.data[i].price, 10)) {
                        mini = this.state.data[i].price
                    }
                    if (maxi < parseInt(this.state.data[i].price, 10)) {
                        maxi = this.state.data[i].price
                    }
                }
                this.setState({ Products: { min: parseInt(mini, 10), max: parseInt(maxi, 10), inputValue: parseInt(mini, 10) } },
                    /*CALLBACK2 - This part is to check if the user using mobile device or tablet*/
                    () => {
                        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            this.setState({ chunk:6 ,isMobile: true, loaded: true })
                        }
                        else {
                            this.setState({loaded: true, isMobile: false })
                        }
                        this.chunkCutter()
                        this.onSortHandler("chp2exp")
                    })
            })
    }

    onFavorHandler = () =>{
        message.error('This feature is not ready yet for production');
    }

    onCartHandler = (item) => {
        Cart.addItem(item)
        message.success('Successfully added to cart')

        this.props.history.push({
            pathname: "/HeadPhones"
        })
    }

    /*This function cut the data to partitions*/
    chunkCutter = () =>{
        var i, j, temparray = {}, chunk = this.state.chunk, num = 0;
        for (i = 0, j = this.state.data.length; i < j; i += chunk) {
          temparray[num++] = this.state.data.slice(i, i + chunk);
        }
        this.setState({dataDisplay: temparray})
    }

    /*This function handle the page swapping by the user*/
    onChangePageHandler = (value) => {
        this.setState({currentPage: value-1}, ()=>{window.scrollTo(0, 0)})//value-1 because the array made by the chunk start at 0 and not 1.
    }

    /*This function is sorting products directly by input price or slider
    and sorting it from the wanted starting price to most expensive*/
    onChangeHandler = (value) => {
        this.setState({
            data: DataBase.getDataBase().filter((x) => { return x.price >= value }),
            currentPage: 0,
            Products: { min: this.state.Products.min, max: this.state.Products.max, inputValue: value }
        }, () => {
            this.onSortHandler("chp2exp")
        }
        );
    }

    /* onSortFromUptoDown && onSortFromDowntoUp sorting products by specific order*/
    onSortFromUptoDown = () => {
        let dataCopy = JSON.parse(JSON.stringify(this.state.data))
        let temp;
        for (let i = 0; i < dataCopy.length; i++) {
            for (let j = 0; j < dataCopy.length; j++)
                if (parseInt(dataCopy[i].price) > parseInt(dataCopy[j].price)) {
                    temp = dataCopy[i];
                    dataCopy[i] = dataCopy[j];
                    dataCopy[j] = temp;
                }
        }
        return dataCopy
    }

    /* onSortFromUptoDown && onSortFromDowntoUp sorting products by specific order*/
    onSortFromDowntoUp = () => {
        let dataCopy = JSON.parse(JSON.stringify(this.state.data))
        let temp;
        for (let i = 0; i < dataCopy.length; i++) {
            for (let j = 0; j < dataCopy.length; j++)
                if (parseInt(dataCopy[i].price) < parseInt(dataCopy[j].price)) {
                    temp = dataCopy[i];
                    dataCopy[i] = dataCopy[j];
                    dataCopy[j] = temp;
                }
        }
        return dataCopy
    }

    /*Handle the user request how to sort products */
    onSortHandler = (value) => {
        let dataCopy = []
        if (value === "exp2chp") {
            dataCopy = this.onSortFromUptoDown()
        }
        if (value === "chp2exp") {
            dataCopy = this.onSortFromDowntoUp()
        }
        this.setState({ data: dataCopy },()=>
        {
            this.chunkCutter()
        })
    }

    render() {
        let slidersArr = []

        slidersArr.push({
            value: this.state.Products.inputValue,
            min: this.state.Products.min,
            max: this.state.Products.max,
        })

        let slide = slidersArr.map(item => {
            return (
                <Filterbar
                    key={item.id}
                    value={item.value}
                    min={item.min}
                    max={item.max}
                    onChange={(event) => this.onChangeHandler(event)}
                    onSelect={(event) => this.onSortHandler(event)}
                />
            )
        })


        let ProductsArr = []
        for (let key in this.state.dataDisplay[this.state.currentPage])
            ProductsArr.push({
                title: this.state.dataDisplay[this.state.currentPage][key].productName,
                product: this.state.dataDisplay[this.state.currentPage][key].product,
                price: this.state.dataDisplay[this.state.currentPage][key].price,
                avatar: this.state.dataDisplay[this.state.currentPage][key].avatar,
                imageUrl: this.state.dataDisplay[this.state.currentPage][key].imageUrl,
                serialNumber: this.state.dataDisplay[this.state.currentPage][key].serialNumber,
                key:this.state.dataDisplay[this.state.currentPage][key].serialNumber,
                quantity:this.state.dataDisplay[this.state.currentPage][key].quantity
            })

        let product = ProductsArr.map(item => {
            return (
                <Products
                    key={item.key}
                    title={item.title}
                    avatar={item.avatar}
                    imageUrl={item.imageUrl}
                    description={item.product}
                    price={item.price}
                    serialNumber={item.serialNumber}
                    clickFavor={(item) => this.onFavorHandler(item)}
                    clickCart={(event) => this.onCartHandler(item)}
                />
            )
        })

        return (
            <div className="mainBackGround">
                <div>
                    <div style={{ display: this.state.loaded ? "none" : "block" }}>
                        <center>
                            <Icon type="loading" style={{ fontSize: 200 }} spin />
                        </center>
                    </div>
                    <div style={{ display: this.state.loaded ? "block" : "none" }}>
                        <div>
                            <ScrollUpButton style={{ display: this.state.isMobile ? "none" : "block", zIndex: 1 }}
                                EasingType="linear"
                                AnimationDuration={150}
                            />
                        </div>
                        <Row>
                            {slide}
                        </Row>
                        <Row>
                            <div className="frstLayerBckGrnd">
                                <div style={{ height: "1px", borderTop: "1px inset"}}></div>
                                <div style={{ height: "10px" }}></div>
                                <Col lg={{ offset: 10 }} xs={{ offset: 4 }} md={{ offset: 8 }}>
                                    <Pagination current={this.state.currentPage+1} defaultCurrent={1} total={this.state.data.length} pageSize={this.state.chunk} onChange={this.onChangePageHandler} />
                                </Col>
                                <div style={{ height: "10px", boxShadow: "0 5px 10px 0 rgba(0,0,0,0.16)" }}></div>
                            </div>
                            <div style={{ height: "17px" }}></div>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={{ offset: 1 }} sm={{ offset: 3 }} md={{ span: 22, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                                {product}
                            </Col>
                        </Row>
                        <Row style={{ display: this.state.isMobile ? "block": "none"}}>
                            <div className="frstLayerBckGrnd">
                                <div style={{ height: "1px", borderTop: "1px inset"}}></div>
                                <div style={{ height: "10px" }}></div>
                                <Col xs={{ offset: 4 }}>
                                    <Pagination current={this.state.currentPage+1} defaultCurrent={1} total={this.state.data.length} pageSize={this.state.chunk} onChange={this.onChangePageHandler} />
                                </Col>
                                <div style={{ height: "10px", boxShadow: "0 5px 10px 0 rgba(0,0,0,0.16)" }}></div>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeadPhones;