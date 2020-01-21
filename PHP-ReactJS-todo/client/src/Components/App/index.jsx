import React, { Fragment } from 'react';
import moment from 'moment';

import Requst from "../../Request";

import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        todoList: [],
    }

    componentDidMount = async () => {

        try {
            const body = JSON.stringify({"ACTION": "list", "TYPE": "all" });

            const request = new Requst();
            const res = await request.sendRequest(body);
            
            if (!res || !res.ok) return;

            const resJson = await res.json();

            if (!resJson) throw new Error("Invalid parse json.");

            this.setState({
                todoList: resJson.response ?  resJson.response : [],
            });
        } catch (err){
            console.error(err);
        }
    }
    
    onAdd = async (controllersState) => {
        debugger;
        const { todoList: todoListState = [] } = this.state;
        const { isValid = false, date = null, value = "" } = controllersState;
        const dateParse = moment(date);

        if (!isValid || !dateParse.isValid() || !value) return;

        const dateFormat = dateParse.format("DD-M-YYYY");

        try {

            const body = JSON.stringify({"ACTION": "add", "TYPE": "single_record" });

            const request = new Requst();
            const res = await request.sendRequest(body);

            if (!res || !res.ok) return;

            const resJson = await res.json();

            if (!resJson) throw new Error("Invalid parse json.");

            const todoList = [...todoListState, resJson];

            this.setState({ todoList });

        } catch (err){
            console.err(err);
        }
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