import React, { Fragment } from 'react';

import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        todoListArray: [],
    }

    componentDidMount = async () => {
        const body = JSON.stringify({"ACTION": "$list", "TYPE": "all" });

        const res = await fetch("/api/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body
        });
        
        if (!res || !res.ok) return;

        const { response } = await res.json();
        if (response) this.setState({
            todoList: response
        });
    }
    
    onAdd = event => {
        const { todoList = [] } = this.state;
        this.setState({
            todoList: [...todoList, ++todoList[todoList.length - 1]]
        })
    }

    render(){
        const { todoList = [] } = this.state;
        return (
            <Fragment>
                <Header onAdd = {this.onAdd} />
                <Main todoList = {todoList} />
            </Fragment>
        );
    }
}

export default App;