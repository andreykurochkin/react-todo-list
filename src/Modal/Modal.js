import React, { Component } from 'react';
import './Modal.css';

// const state = { show: false };
export default class Modal extends Component {
    state = {show: false};
    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({show: true})}>Open</button>
                {this.state.show && <div className='modal'>
                    <div className='modal-body'>
                        <h1>Star</h1>
                        <div>
                            <a href='https://github.com/andreykurochkin/react-todo-list'>Github ... link</a>
                        </div>
                        <button onClick={() => this.setState({show: false})} style={{marginTop: '2rem'}}>Close</button>
                    </div>
                </div>}
            </React.Fragment>);
    }
}