import React, { Component } from "react";
import { withRouter } from 'react-router'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import Hyerpx from './Hyperx.jpg'
import Nvidia from './Nvidia.jpg'
import SteelSeries from './SteelSeries.jpg'

class Carousel1 extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            primeProducts: {
                product0: {
                    image: Hyerpx,
                    link: "https://www.hyperxgaming.com/us",
                },
                product1: {
                    image: Nvidia,
                    link: "https://www.nvidia.com/en-us/geforce/graphics-cards/rtx-2080-ti/",

                },
                product2: {
                    image: SteelSeries,
                    link: "https://steelseries.com/gaming-headsets/arctis-pro-gamedac",
                }
            }
        })
    };
    onClickItem = (num) => {
        if (num === 0) {
            window.location.href = this.state.primeProducts.product0.link;
        }
        if (num === 1) {
            window.location.href = this.state.primeProducts.product1.link;
        }
        if (num === 2) {
            window.location.href = this.state.primeProducts.product2.link;
        }
    }

    render() {
        let primeProductsArr = [];
        for (let key in this.state.primeProducts) {
            primeProductsArr.push({
                image: this.state.primeProducts[key].image,
                title: this.state.primeProducts[key].title,
            });
        }
        let Carousel1 = primeProductsArr.map(item => {
            let image = item.image
            let title = item.title
            return (
                <div key><img alt={title} className="responsive" src={image} /></div>
            );
        });
        return (
            <Carousel autoPlay infiniteLoop onClickItem={this.onClickItem} >
                {Carousel1}
            </Carousel>
        )
    }
}


export default withRouter(Carousel1)