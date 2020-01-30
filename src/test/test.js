import React from 'react';

export default class Test extends React.Component {
    constructor (props) {
        super();
        this.state = {
            n: 1
        }
    }
    render () {
        return (
            <div>
                { this.state.n }
            </div>
        )
    }
}