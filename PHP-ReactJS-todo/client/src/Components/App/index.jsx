import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from "lodash";

import { 
    loadRecordList, 
    loadNewRecord, 
    editRecord, 
    clearStatus,
    deleteRecord 
} from '../../Redux/appReducer/actions';

import ErrorShower from "../ErrorShower";
import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        sorter: null,
        error: null,
    }

    intervalUpdateList = null;

    componentDidMount =  () => {
       const { onLoadRecordsList = null } = this.props;

       const onLoadingRecord = () => {
            if (onLoadRecordsList){
                onLoadRecordsList();
                this.intervalUpdateList = setTimeout(onLoadingRecord, 20000);
            } else if (this.intervalUpdateList) clearInterval(this.intervalUpdateList);
        }

        this.intervalUpdateList = setTimeout(onLoadingRecord, 0);
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

    getFilteredList = () => {
        const { list = [] } = this.props;
        const isAll = !this.state.sorter || this.state.sorter === "all";
        const filteredList = isAll ? [...list] : list.filter(it => {
            if (!this.state.sorter || this.state.sorter === "all"){
                return true;
            }
            return this.state.sorter === this.getColorRecord(it.time)
        });

        return filteredList;
    }

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
        const { status = null, onClearStatus = null } = this.props;

        if (status && onClearStatus){
            onClearStatus();
        }
    }

    onAdd = async (controllersState) => {
        const { onAddRecord = null } = this.props;

        if (onAddRecord){
            onAddRecord(controllersState);
        }
    }

    onEditField = async (additionalNote, id) => {
        const { onEditRecord = null } = this.props;
        if (id && onEditRecord){
            onEditRecord({additionalNote, id});
        }
    }

    onDeleteTodo = async (id = "") => {
        const { onDeleteRecord = null } = this.props;
        if (id && onDeleteRecord){
            onDeleteRecord({ id });
        }
    }

    onAdd = _.debounce(this.onAdd, 500);

    render(){
        const { status: message = "" } = this.props;

        const filteredList = this.getFilteredList();

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

const mapStateToProps = state => {
    const { list = [], status } = state.appReducer || {};

    return { list, status };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadRecordsList: () => dispatch(loadRecordList()),
        onAddRecord: payload => dispatch(loadNewRecord(payload)),
        onEditRecord: payload => dispatch(editRecord(payload)),
        onClearStatus: () => dispatch(clearStatus()),
        onDeleteRecord: payload => dispatch(deleteRecord(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);