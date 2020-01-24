import React, { Fragment } from 'react';
import _ from 'lodash';

class TodoPopup extends React.Component {

    state = {
        uuidTodo: null,
        visible: false,
        editMode: false,
        currentRecordData: {} // container for popup data
    }

    static getDerivedStateFromProps = (props, state) => {
        const { popoverConfig: { uuid = null } = {} } = props;

        if (uuid !== state.uuidTodo){
            return {
                ...state,
                uuidTodo: uuid
            };
        }

        return state;
    };

    componentDidMount = () => {
        const { popoverConfig: { active = false, uuid = null } = {} } = this.props;
        const { visible = false, uuidTodo = "" } = this.state;

        if (active !== visible && !_.isNull(uuid) && uuid === uuidTodo){
            this.setState({
                visible: active
            });
        };
    };

    componentDidUpdate = () => {
        const { popoverConfig: { active = false, uuid = null } = {}, todoList = [] } = this.props;
        const { visible = false, uuidTodo = "", currentRecordData: currentRecordDataState = {} } = this.state;

        if (active !== visible && !_.isNull(uuid) && uuid === uuidTodo){

            this.setState({
                visible: active,
                currentRecordData: currentRecordDataState
            });
        };

        if (!uuid && visible){
            return this.setState({
                visible: false,
                wasChange: false,
                currentRecordData: {}
            });
        }

        if (visible && active){
            const currentRecordData = _.isEmpty(currentRecordDataState) && todoList && todoList.length ?
            todoList.find(record => record && record.id === uuid) : currentRecordDataState;

            if (!_.isEmpty(currentRecordData) && currentRecordDataState.id !== currentRecordData.id)
            this.setState({
                currentRecordData
            })
        }
    };

    onDelete = event => {
        const { onDelete = null, clearConfig = null } = this.props;
        const {  uuidTodo: id = "" } = this.state;
        if (!onDelete) return;
        onDelete(id);

        this.setState({
            visible: false,
            editMode: false,
            wasChange: false,
        }, () => {
            if (clearConfig) clearConfig();
          });
    };

    onEditNoteField = event => {
        const { 
            editMode = false, 
            wasChange: wasChangeState = false,
            uuidTodo = "",
            currentRecordData: { additionalNote = "" } = {}, 
        } = this.state;

        const { onEditField = null } = this.props;
        let wasChange = wasChangeState;

        if (!editMode || !additionalNote || !wasChange){
            return this.setState({ editMode: false });
        }

        if (onEditField && uuidTodo && wasChange){
            wasChange = false;
             onEditField(additionalNote, uuidTodo);
        }

        this.setState({ editMode: false, wasChange });
    }

    onChangeNoteField = event => {
        const { target: { value = "" } = {} } = event;
        const { 
            currentRecordData: { additionalNote = "" } = {}, 
            currentRecordData = {}
        } = this.state;

        if (additionalNote === value){
            return;
        }

        this.setState({
            currentRecordData: {
                ...currentRecordData,
                additionalNote: value,
            },
            wasChange: true,
        });
    }

    onChangeVisible = event => {
        const { 
            target: { 
                className: classNameTarget = null 
            } = {}, 
            currentTarget: { 
                className = null } = {} 
        } = event;

        const { 
            visible = false, 
            editMode = false, 
            wasChange: wasChangeState = false,
            uuidTodo = "",
            currentRecordData: { additionalNote = "" } = {}
         } = this.state;
        const {  clearConfig = null, onEditField = null } = this.props;
        let wasChange = wasChangeState;

        const isTruthyClassName = !_.isNull(classNameTarget) || !_.isNull(className);

        const isCloseButton = classNameTarget === "popup-close-button";

        if ((!isTruthyClassName || classNameTarget !== className) && !isCloseButton){
            return;
        }

        const visibility = !visible;

        if (!visibility && uuidTodo && wasChange && onEditField && additionalNote){
            wasChange = false;
            onEditField(additionalNote, uuidTodo);
        }

        this.setState({
            visible: visibility,
            wasChange,
            editMode: !visibility ? false : editMode
        }, () => {
            if (clearConfig && !this.state.visible){
                clearConfig();
            }
        });

        event.stopPropagation();
    };

    onEditNote = event => {
        const { editMode = false } = this.state;

        if (editMode) return;

        this.setState({
            editMode: true,
        });

        event.stopPropagation();
    }

    onViewMode = event => {
        const { target: { className = '' } = {} } = event || {};
        const { 
            editMode = false, 
            wasChange: wasChangeState = false, 
            uuidTodo = "",
            currentRecordData: { additionalNote = "" } = {} 
        } = this.state;

        const { onEditField = null } = this.props;

        let wasChange = wasChangeState;

        if (!editMode || className.includes('edit-mode') || 
            className.includes("popup-save-btn")){
                return;
        }

        if (wasChange && uuidTodo && onEditField && additionalNote){
            wasChange = false;
            onEditField(additionalNote, uuidTodo);
        }

        this.setState({
            editMode: false,
            wasChange
        });
    }

    render(){
        const { visible = false, editMode = false, currentRecordData: {
            additionalNote = "",
            recordName = "",
            time = ""
        } = {} } = this.state;


        if (!visible) return null;

        return (
            <div onClick = {this.onChangeVisible} className = 'popover-wrapper'>
                <div className = "todo-popup-wrapper">
                    <div onClick = {this.onViewMode} className = 'todo-popup'>
                        <div 
                            onClick = {this.onChangeVisible} 
                            className = 'popup-close-button'>
                        </div>
                        <div className = 'todo-popup-header'>
                            <p className = 'todo-popup-date'>{time ? time : "No data"}</p>
                            <input onClick = {this.onDelete} type = "button" value = "delete todo" />
                        </div>
                        <div className = 'todo-popup-main'>
                        <p className = 'todo-popup-title'>{recordName ? recordName : "No title"}</p>
                            <p className = 'todo-popup-additionalTitle'>additional notes</p>
                            {!editMode ?
                            <div 
                                onClick = {this.onEditNote} 
                                className = 'additionalNote-field'
                            >
                               <p> {additionalNote ? additionalNote : "click for add note"}</p>
                            </div>
                            : 
                                <Fragment>
                                    <textarea 
                                        onChange = {this.onChangeNoteField}
                                        value = {additionalNote ? additionalNote : ""}
                                        className = 'additionalNote-field edit-mode'
                                    />
                                    <input 
                                        onClick = {this.onEditNoteField}
                                        className = 'popup-save-btn' 
                                        type = 'button' 
                                        value = "edit" 
                                    />
                                </Fragment>
                            }
                        </div>
                        <div className = 'todo-popup-footer'></div>
                    </div>
                </div>
            </div>
        )
    }
};

export default TodoPopup;