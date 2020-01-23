import React, { Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';
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
        const { getColorRecord = null } = this.props;
        return todoList.map((item, index) => {
            const time = item.time ? item.time : null;

            const color = getColorRecord ? getColorRecord(time) : null;

            return (
                <TodoItem 
                    key = {index + item.recordName + item.id} 
                    itemUuid = {item.id}
                    color = {color}
                    onChangeActiveTodo = {this.onChangeActiveTodo}
                    className = 'todo-item'
                >
                    <p>{item.recordName}</p>
                </TodoItem>
            );
        });
    }

    render(){
        const { popoverConfig = {}, todoList = [] } = this.state;
        const { onDelete = null } = this.props;
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
                    todoList = {todoList}
                    clearConfig = {this.clearConfig}
                    onDelete = {onDelete}
                />
            </Fragment>
        );
    }
};

export default Main;