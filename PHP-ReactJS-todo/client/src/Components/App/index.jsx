import React, { Fragment } from 'react';
import moment from 'moment';
import _ from "lodash";

import Request from "../../Request";

import ErrorShower from "../ErrorShower";
import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        todoList: [],
        error: null,
    }

    componentDidMount = async () => {

        try {
            const body = JSON.stringify({"ACTION": "list", "TYPE": "all" });

            const request = new Request();
            const res = await request.sendRequest(body);
            
            if (!res || !res.ok) {
               throw new Error("Invalid loading data");
            }

            const resJson = await res.json();

            if (!resJson) throw new Error("Invalid parse json.");

            this.setState({
                todoList: resJson.response ?  resJson.response : [],
            });
        } catch (err){
            console.error(err);
            this.setState({
                error: err.message
            });
        }
    }
    

    onClearError = () => {
        const { error = null } = this.state;

        if (error) this.setState({ error: null });
    }

    onAdd = async (controllersState) => {
        debugger;
        const { todoList: todoListState = [] } = this.state;
        const { isValid = false, date = null, value = "" } = controllersState;
        const dateParse = moment(date);

        if (!isValid || !dateParse.isValid() || !value){
            throw new Error("Date or record name is not valid");
        }

        const dateFormat = dateParse.format("DD-M-YYYY");

        try {

            const body = JSON.stringify({
                "ACTION": "add",
                 "TYPE": "single_record" ,
                 "data": { time: dateFormat, recordName: value }
            });

            const request = new Request();
            const res = await request.sendRequest(body);

            if (!res || !res.ok) return;

            const resJson = await res.json();

            if (!resJson || !resJson.response){
                 throw new Error("Invalid parse json.");
            }

            const todoList = [...todoListState, resJson];

            this.setState({ todoList });

        } catch (err){
            console.error(err);
            this.setState({
                error: err.message
            });
        }
    }

    onAdd = _.debounce(this.onAdd, 500);

    render(){
        const { todoList = [], error: message = "" } = this.state;
        return (
            <Fragment>
                <ErrorShower
                    cbClearError = {this.onClearError}
                    message = {message} 
                />
                <Header onAdd = {this.onAdd} />
                <Main todoList = {todoList} />
            </Fragment>
        );
    }
}

export default App;