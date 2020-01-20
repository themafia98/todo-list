import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

class Main extends React.Component {

    state = {
        todoList: [],
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

    getTodos = () => {
        const { todoList = [] } = this.state;
        return todoList.map((item, index) => {
        return <div key = {index} className = 'todo-item'><p>{item}</p></div>;
        });
    }

    render(){
        return (
            <section className = 'main'>
                <div className = 'main-todoListBox'>
                    <Scrollbars>
                        {this.getTodos()}
                    </Scrollbars>
                </div>
            </section>
        )
    }
};

export default Main;