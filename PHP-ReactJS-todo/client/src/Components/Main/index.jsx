import React, { Fragment } from 'react';
import uuid from 'uuid/v4';
import Scrollbars from 'react-custom-scrollbars';

import TodoPopover from "../TodoPopup";
import TodoItem from '../TodoItem';

class Main extends React.Component {

    state = {
        todoList: [],
        popoverConfig: {
            uuid: null,
            active: false
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        if (Array.isArray(props.todoList) && props.todoList.length !== state.todoList.length){
            return {
                ...state,
                todoList: [...props.todoList]
            }
        }

        return state;
    }

    clearConfig = () => {
        this.setState({
            popoverConfig: {
                uuid: null,
                active: false
            }
        });
    }

    onChangeActiveTodo = (uuid, active) => {
        const { popoverConfig = {} } = this.state;
        if (uuid !== popoverConfig.uuid){
            this.setState({
                popoverConfig: {
                    ...popoverConfig,
                    uuid,
                    active
                }
            });
        };
    };

    getTodos = () => {
        const { todoList = [] } = this.state;
        return todoList.map((item, index) => {
            return (
                <TodoItem 
                    key = {index + item} 
                    itemUuid = {uuid()}
                    onChangeActiveTodo = {this.onChangeActiveTodo}
                    className = 'todo-item'
                >
                    <p>{item}</p>
                </TodoItem>
            );
        });
    }

    render(){
        const { popoverConfig = {} } = this.state;
        return (
            <Fragment>
                <section className = 'main'>
                    <div className = 'main-todoListBox'>
                        <Scrollbars>
                            {this.getTodos()}
                        </Scrollbars>
                    </div>
                </section>
                <TodoPopover 
                    popoverConfig = {popoverConfig} 
                    clearConfig = {this.clearConfig}
                />
            </Fragment>
        )
    }
};

export default Main;