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
        filteredList: [],
        sorter: null,
        error: null,
    }

    intervalUpdateList = null;

    componentDidMount = async () => {

        const handleActionList = async () => {
            try {
                const body = JSON.stringify({"ACTION": "list", "TYPE": "all" });

                const request = new Request();
                const res = await request.sendRequest(body);
                    
                if (!res || !res.ok) {
                throw new Error("Invalid loading data");
                }
        
                const resJson = await res.json();
        
                if (!resJson) throw new Error("Invalid parse json.");
        
                const list = resJson.response ? this.sortList(resJson.response)  : [];
        
                const isAll = !this.state.sorter || this.state.sorter === "all";

                this.setState({ 
                    todoList: list,
                    filteredList: isAll ? [...list] : list.filter(it => {
                        if (!this.state.sorter || this.state.sorter === "all"){
                            return true;
                        }
                        return this.state.sorter === this.getColorRecord(it.time)
                    }),
                });

                this.intervalUpdateList = setTimeout(handleActionList, 30000);

            } catch (err){
                console.error(err);
                this.setState({
                    error: err.message
                });

                this.intervalUpdateList = setTimeout(handleActionList, 10000);
            }
        }


        this.intervalUpdateList = setTimeout(handleActionList, 0);
    }

    componentWillUnmount = () => {
        if (this.intervalUpdateList){
            clearTimeout(this.intervalUpdateList);
        }
    }

    sortList = (list = []) => {
        const { filteredList = [] } = this.state;
        if (!Array.isArray(list)) return filteredList;

        return list.sort((a,b) => {
            if ((a.num && b.num) || (a.num === "0" && b.num === "0")){
                return Number(a.num) - Number(b.num);
            }
            return a - b;
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { sorter = null, todoList = [] } = this.state;
        if (prevState.sorter !== sorter){
  
            if (!sorter || sorter === "all"){
                return this.setState({
                    filteredList: this.sortList([...todoList])
                })
            }

            const records = [...todoList];
            return this.setState({
                filteredList: records.filter(it => {
                    return this.state.sorter === this.getColorRecord(it.time)
                })
            })
        }
    };

    getColorRecord = (recordDate) => {
        if (!_.isString(recordDate)) return null;

        const recordTimeString = recordDate.trim();
        const recordTime = moment(recordTimeString,"DD-M-YYYY");
        const now = moment();

        const currentTimeString = now.format("DD-M-YYYY").trim();
       
        if (currentTimeString === recordTimeString){
            return "current";
        }

        if (now.isBefore(recordTime)){
           return "future";
        }

        if (now.isAfter(recordTime)){
            return "past";
        }

        return null;
    }

    onSort = event => {
        const { currentTarget: { value = null } = {} } = event;
        this.setState({
            sorter: value
        })
        event.stopPropagation();
    }
    

    onClearError = () => {
        const { error = null } = this.state;

        if (error) this.setState({ error: null });
    }

    onAdd = async (controllersState) => {

        try {

            const { todoList: todoListState = [] } = this.state;
            const { isValid = false, date = null, value = "" } = controllersState;
            const dateParse = moment(date);
    
            if (!isValid || !dateParse.isValid() || !value){
                throw new Error("Date or record name is not valid");
            }
    
            const dateFormat = dateParse.format("DD-M-YYYY");

            const body = JSON.stringify({
                "ACTION": "add",
                 "TYPE": "single_record" ,
                 "DATA": { time: dateFormat, recordName: value }
            });

            const request = new Request();
            const res = await request.sendRequest(body, "PUT");

            if (!res || !res.ok) return;

            const resJson = await res.json();

            if (!resJson || !resJson.response){
                 throw new Error("Invalid parse json.");
            }

            const todoList = Array.isArray(resJson.response) ? 
                    this.sortList([...resJson.response]) : [...todoListState];

            const isAll = !this.state.sorter || this.state.sorter === "all";

            this.setState({ 
                todoList,
                filteredList: isAll ? [...todoList] : todoList.filter(it => {
                    if (!this.state.sorter || this.state.sorter === "all"){
                        return true;
                    }
                    return this.state.sorter === this.getColorRecord(it.time)
                }),
                error: "Новая запись успешно добавлена"
             });

        } catch (err){
            console.error(err);
            this.setState({
                error: err.message
            });
        }
    }

    onEditField = async (additionalNote, id) => {
        try {
            const { todoList: todoListState = [] } = this.state;

            if (!additionalNote || !id){
                throw new Error("Invalid popup data");
            }

            const body = JSON.stringify({
                "ACTION": "edit",
                 "TYPE": "single_record__additionalNote" ,
                 "DATA": { additionalNote, id }
            });

            const request = new Request();
            const res = await request.sendRequest(body);

            if (!res || !res.ok) {
                throw new Error("Ошибка обновления.");
            }

            const resJson = await res.json();

            if (!resJson || !resJson.response){
                 throw new Error("Invalid parse json.");
            }

            
            const todoList = Array.isArray(resJson.response) ? 
                    this.sortList([...resJson.response]) : [...todoListState];

            const isAll = !this.state.sorter || this.state.sorter === "all";

            this.setState({ 
                todoList,
                filteredList: isAll ? [...todoList] : todoList.filter(it => {
                    if (!this.state.sorter || this.state.sorter === "all"){
                        return true;
                    }
                    return this.state.sorter === this.getColorRecord(it.time)
                }),
                error: "Запись успешно обновлена"
             });

        } catch (err){
            console.error(err);
            this.setState({
                error: err.message
            });
        }
    }

    onDeleteTodo = async (id = "") => {
        try {

            const { todoList: todoListState = [] } = this.state;

            if (!id){
                throw new Error("Invalid delete id");
            }

            const body = JSON.stringify({
                "ACTION": "delete",
                 "TYPE": "single_record" ,
                 "DATA": { id }
            });

            const request = new Request();
            const res = await request.sendRequest(body, "DELETE");

            if (!res || !res.ok) return;

            const resJson = await res.json();

            if (!resJson || !resJson.response){
                 throw new Error("Invalid parse json.");
            }

            const todoList = Array.isArray(resJson.response) ? 
                    this.sortList([...resJson.response]) : [...todoListState];

            const isAll = !this.state.sorter || this.state.sorter === "all";

            this.setState({ 
                todoList,
                filteredList: isAll ? [...todoList] : todoList.filter(it => {
                    if (!this.state.sorter || this.state.sorter === "all"){
                        return true;
                    }
                    return this.state.sorter === this.getColorRecord(it.time)
                }),
                error: "Запись успешно удалена"
             });

        } catch (err){
            console.error(err);
            this.setState({
                error: err.message
            });
        }
    }

    onAdd = _.debounce(this.onAdd, 500);

    render(){
        const { filteredList = [], error: message = "" } = this.state;
        return (
            <Fragment>
                <ErrorShower
                    cbClearError = {this.onClearError}
                    message = {message} 
                />
                <Header 
                    onSort = {this.onSort} 
                    onAdd = {this.onAdd} 
                />
                <Main
                    getColorRecord = {this.getColorRecord} 
                    todoList = {filteredList} 
                    onDelete = {this.onDeleteTodo}
                    onEditField = {this.onEditField}
                />
            </Fragment>
        );
    }
}

export default App;