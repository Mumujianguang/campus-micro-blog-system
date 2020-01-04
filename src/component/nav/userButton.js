import React from 'react';
import { Button } from 'antd';

export default class UserButton extends React.Component {
    constructor (prop) {
        super();
        this.state = {
            type: prop.type
        };
    }

    render () {
        return (
            <>
                <Button type="primary">{ this.state.type }</Button>
            </>
        )
    }
}