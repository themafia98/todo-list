import React, { Fragment } from 'react';

import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        todoList: [],
    }

    componentDidMount = async () => {
        const body = JSON.stringify({"ACTION": "$list", "TYPE": "all" });

        const response = await fetch("/api/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body
        });
        
        if (!response.ok) return;

        const resJson = await response.json();
        if (resJson);
        this.setState({
            todoList: resJson
        });
    }

    render(){
        return (
            <Fragment>
                <Header />
                <Main />
            </Fragment>
        );
    }
}

export default App;