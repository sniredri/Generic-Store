import React from "react";
import { Row, Col, Select, Slider, InputNumber } from 'antd';

const Option = Select.Option;

var Filterbar = (props) => {
    return (
        <div style={{ backgroundColor: "#F7F7F7" }}>
            <Row>
                <Col sm={4} md={6} lg={3} style={{ padding: "10px" }}>
                    <Select size="small" defaultValue="chp2exp" onChange={props.setSort} onSelect={props.onSelect}>
                        <Option value="chp2exp">From cheap to expensive</Option>
                        <Option value="exp2chp">From expensive to cheap</Option>
                    </Select>
                </Col>
                <Col sm={{ span: 3 }} md={{ span: 7, offset: 4 }} lg={{ span: 3, offset: 4 }} style={{ padding: "7px" }}>
                    Starting price: <InputNumber
                        min={props.min}
                        max={props.max}
                        style={{ marginRight: 16 }}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </Col>
                <Col sm={2} md={5} lg={8} style={{ padding: "3px" }}>
                    <Slider
                        min={props.min}
                        max={props.max}
                        onChange={props.onChange}
                        value={typeof props.value === 'number' ? props.value : 1}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Filterbar;