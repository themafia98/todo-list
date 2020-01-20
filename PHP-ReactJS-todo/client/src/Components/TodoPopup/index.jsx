import React, { Fragment } from 'react';
import _ from 'lodash';

class TodoPopup extends React.Component {

    state = {
        uuidTodo: null,
        visible: false,
        editMode: false,
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
        const { popoverConfig: { active = false, uuid = null } = {} } = this.props;
        const { visible = false, uuidTodo = "" } = this.state;

        if (active !== visible && !_.isNull(uuid) && uuid === uuidTodo){
            this.setState({
                visible: active
            });
        };

        if (!uuid && visible){
            return this.setState({
                visible: false
            });
        }
    };

    onChangeVisible = event => {
        const { 
            target: { 
                className: classNameTarget = null 
            } = {}, 
            currentTarget: { 
                className = null } = {} 
        } = event;

        const { visible = false, editMode = false } = this.state;
        const {  clearConfig = null } = this.props;

        const isTruthyClassName = !_.isNull(classNameTarget) || !_.isNull(className);

        const isCloseButton = classNameTarget === "popup-close-button";

        if ((!isTruthyClassName || classNameTarget !== className) && !isCloseButton){
            return;
        }

        const visibility = !visible;

        this.setState({
            visible: visibility,
            editMode: !visibility ? false : editMode
        }, () => {
            if (clearConfig && !this.state.visible) clearConfig();
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
        const { editMode = false } = this.state;

        if (!editMode || className.includes('edit-mode') || 
            className.includes("popup-save-btn")){
                return;
        }

        this.setState({
            editMode: false
        });
    }

    render(){
        const { visible = false, editMode = false } = this.state;
        const { additionalField = "" } = this.props;

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
                            <p className = 'todo-popup-date'>01.01.2019</p>
                            <input type = "button" value = "delete todo" />
                        </div>
                        <div className = 'todo-popup-main'>
                            <p className = 'todo-popup-title'></p>
                            <p className = 'todo-popup-additionalTitle'>additional notes</p>
                            {!editMode ?
                            <div 
                                onClick = {this.onEditNote} 
                                className = 'additionalNote-field'
                            >
                                {additionalField ? additionalField : "click for add note"}
                            </div>
                            : 
                                <Fragment>
                                    <textarea className = 'additionalNote-field edit-mode' />
                                    <input 
                                        className = 'popup-save-btn' 
                                        type = 'button' 
                                        value = "edit" 
                                    />
                                </Fragment>
                            }
                        </div>
                        <div className = 'todo-popup-footer'>Whether not found</div>
                    </div>
                </div>
            </div>
        )
    }
};

export default TodoPopup;