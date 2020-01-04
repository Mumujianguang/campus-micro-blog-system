import React from 'react';
import UserButton from './userButton';
import './index.css';
import { Row, Col } from 'antd';

export default class Nav extends React.Component {
    constructor (prop) {
        super();
    }


    render () {
        return (
            <div className="navWrapper">
                <Row>
                    <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="logo">
                            logo
                        </div>
                    </Col>
                    <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="userEnter">
                            <UserButton type="login" />
                            <UserButton type="register" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
