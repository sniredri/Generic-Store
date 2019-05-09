import React, { Component } from 'react'
import DataBase from '../DataBase/DataBase'
import { AutoComplete, Input, Icon, message } from 'antd'
import { withRouter } from 'react-router'
import './searchBar.css'
import Cart from '../CartIndex/CartStorage'

export class searchBar extends Component {
    state = {
        data: [],
        dataSource: [],
        width: "90%",
        isMobile: false,
        match: true,
        value: "",
    }

    componentDidMount() {
        this.setState({ data: DataBase.getDataBase() }, () => {
            let copyState = JSON.parse(JSON.stringify(this.state.data))
            var db = this.state.data
            var temp = []
            for (let index = 0; index < db.length; index++) {
                temp.push({ text: db[index].productName, value: "" + db[index].serialNumber })
                copyState[index].title = copyState[index].productName
                copyState[index].key = copyState[index].serialNumber
            }
            this.setState({ dataSource: temp, data: copyState }, () => {
                if (/Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    this.setState({ isMobile: true })
                }
                else {
                    this.setState({ isMobile: false })
                }
            })
        })
    }

    onSearchHandler = (productName) => {
        let match = false
        for (let index = 0; index < this.state.dataSource.length; index++) {
            if (this.state.dataSource[index].text.toLowerCase().includes(productName.toLowerCase())) {
                match = true
                break;
            }
        }
        if (match) {
            this.setState({ match: true })
        }
        else {
            this.setState({ match: false })
        }
    }

    onCartHandler = (item) => {
        let product = this.state.data.filter(index => index.serialNumber === item)
        Cart.addItem(product[0])
        message.success('Successfully added to cart')
        this.clearHandler()
        this.props.history.push({
            pathname: this.props.location.pathname
        })
    }

    onSelectHandler = (product) => {
        this.onCartHandler(parseInt(product))
    }


    onChangeHandler = (value) => {
        this.setState({ value: value });
    }

    clearHandler = () => {
        this.onChangeHandler("")
    }

    render() {
        return (

            <div className={this.state.match || this.state.isMobile ? "underSearch" : ""} style={{ padding: this.state.isMobile ? "15px" : "3px" }}>
                <AutoComplete
                    style={{ width: this.state.width }}
                    dataSource={this.state.dataSource}
                    placeholder="Search here for product"
                    onSelect={(value) => { this.onSelectHandler(value) }}
                    onSearch={(value) => { this.onSearchHandler(value) }}
                    value={this.state.value}
                    onChange={this.onChangeHandler}
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                >
                    <Input suffix={
                        <span>
                            <span style={{ display: this.state.value !== "" ? "block" : "none" }}><Icon onClick={()=>{this.setState({value: "", match: true})}} type="close" /></span>
                            <span style={{ display: this.state.value !== "" ? "none" : "block" }}><Icon type="search" /></span>
                        </span>
                    } />

                </AutoComplete>
                <div style={{ display: this.state.match ? "none" : "block", padding: this.state.isMobile ? "10px" : "5px" }}></div>
                <p className="blink" style={{ display: this.state.match ? "none" : "block" }}><b> <Icon type="warning" style={{ color: "red" }} /> No match found <Icon type="warning" style={{ color: "red" }} /></b></p>
            </div>
        )
    }
}

export default withRouter(searchBar)
