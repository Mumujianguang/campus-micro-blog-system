import React from 'react';
import UserButton from './userButton';
import './nav.less';
import { Row, Col } from 'antd';

// 导航条
export default class Nav extends React.Component {
    constructor (prop) {
        super();
    }


    render () {
        return (
            <div className="navWrapper">
                <Row >
                    <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                        <div className="title">微校园</div>
                    </Col>
                    <Col xs={{ span: 8, offset: 4 }} md={{ span: 6, offset: 6 }} lg={{ span: 5, offset: 7 }}>
                        <div className="userEnter">
                            <div className="position_center">
                                <UserButton type="登录" />
                                <UserButton type="注册" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
