import React, { Fragment } from 'react';
import _ from "lodash";
import Scrollbars from 'react-custom-scrollbars';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

        const isNewTodo = props.todoList.length !== state.todoList.length;
    
        if (Array.isArray(props.todoList) && 
            (isNewTodo || !_.isEqual(props.todoList, state.todoList))){
                
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

    reorder = (list, dragIndex, dropIndex) => {
        
        const result = Array.from(list);
        const [removed] = result.splice(dragIndex, 1);
        result.splice(dropIndex, 0, removed);
        return result.map((item,index) => {
            if (item && result[index - 1]){
                const currentNum = Number(item.position);
                const prevNum = Number(result[index - 1].position);
                if (currentNum < prevNum){
                    item.position = prevNum + (prevNum - currentNum);
                }
            }
            return item;
        });
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
                        index = {index}
                        color = {color}
                        onChangeActiveTodo = {this.onChangeActiveTodo}
                        className = 'todo-item'
                     >
                            <p>{item.recordName}</p>
                    </TodoItem>
            );
        });
    }

    onDragEnd = (result) => {
        // dropped outside the list
        const { onSaveList = null } = this.props;
   
        if (!result.destination) {
          return;
        }

        const todoList = this.reorder(
           [...this.state.todoList],
            result.source.index,
            result.destination.index
          );
      
          if (onSaveList) onSaveList(todoList);

          
    }


    render(){
        const { popoverConfig = {}, todoList = [] } = this.state;
        const { onDelete = null, onEditField = null } = this.props;
        return (
            <Fragment>
                <section className = 'main'>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className = 'main-todoListBox'
                            >
                                <Scrollbars>
                                    {this.getTodos()}
                                </Scrollbars>
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </section>
                <TodoPopover 
                    popoverConfig = {popoverConfig}
                    todoList = {todoList}
                    clearConfig = {this.clearConfig}
                    onDelete = {onDelete}
                    onEditField = {onEditField}
                />
            </Fragment>
        );
    }
};

export default Main;