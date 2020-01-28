import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from "lodash";

import { 
    loadRecordList, 
    loadNewRecord, 
    editRecord, 
    clearStatus,
    deleteRecord,
    loginUser,
    regUser,
    loadingSession,
} from '../../Redux/appReducer/actions';

import LoginForm from '../LoginForm';
import ErrorShower from "../ErrorShower";
import Header from "../Header";
import Main from "../Main";

class App extends React.Component {

    state = {
        sorter: null,
        error: null,
        updateListInitial: false,
    }

    intervalUpdateList = null;

    componentDidMount =  () => {
       const { onLoadingSession = null, sessionLoading = false } = this.props;

       if (!sessionLoading){
        onLoadingSession();
       }
    }

    componentDidUpdate = (prevProps) => {
        const { onLoadRecordsList = null, sessionLoading = false } = this.props;
        const { updateListInitial = true } = this.state;


        if (sessionLoading && !updateListInitial && !this.intervalUpdateLis){
            const onLoadingRecord = () => {
                if (onLoadRecordsList){
                    onLoadRecordsList();
                    this.intervalUpdateList = setTimeout(onLoadingRecord, 20000);
                } else if (this.intervalUpdateList) clearInterval(this.intervalUpdateList);
            }
    
            this.setState({
                updateListInitial: true,
            }, () => {
            this.intervalUpdateList = setTimeout(onLoadingRecord, 0);
            });
        }
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

    onLogin = ({ username = "", password = "" }) => {

        const { onLoginUser = null } = this.props;
        if (username && password && onLoginUser){
            onLoginUser({
                username,
                password
            });
        }
    };

    onReg = ({ username = "", password = "", name = "" }) => {
        const { onRegistration = null } = this.props;
        if (username && password && name && onRegistration){
            onRegistration({
                username,
                password,
                name
            });
        }
    };

    onAdd = _.debounce(this.onAdd, 500);
    onReg = _.debounce(this.onReg, 500);
    onLogin = _.debounce(this.onLogin, 500);

    render(){
        const { status: message = "", sessionLoading = false, loadingApp = false } = this.props;

        const filteredList = this.getFilteredList();

        if (!loadingApp) return (
            <div className = "loader-wrapper">
                <img alt = 'loader' title = 'loader' src = "loader.gif" />
            </div>
        )

        return (
            <Fragment>
                {sessionLoading ? (
                    <Fragment>
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
                )
                : (
                    <LoginForm 
                        onLogin = {this.onLogin}
                        onReg = {this.onReg}
                    />
                )}
                <ErrorShower
                    cbClearError = {this.onClearError}
                    message = {message} 
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { 
        list = [], 
        status, 
        sessionLoading = false, 
        loadingApp = false 
    } = state.appReducer || {};

    return { list, status, sessionLoading, loadingApp };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadRecordsList: () => dispatch(loadRecordList()),
        onAddRecord: payload => dispatch(loadNewRecord(payload)),
        onEditRecord: payload => dispatch(editRecord(payload)),
        onClearStatus: () => dispatch(clearStatus()),
        onDeleteRecord: payload => dispatch(deleteRecord(payload)),
        onLoginUser: payload => dispatch(loginUser(payload)),
        onRegistration: payload => dispatch(regUser(payload)),
        onLoadingSession: () => dispatch(loadingSession())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);