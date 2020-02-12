import React, { useState } from "react";
import classnames from "classnames";
import Scrollbars from 'react-custom-scrollbars';

const LoginForm = ({ onLogin = null, onReg = null }) => {

    const [username, setUsername] = useState("");
    const [nameState, setName] = useState("");
    const [password, setPassword] = useState("");

    const [mode, changeMode] = useState("");

    const [isValid, setValid] = useState(true);
   
    const onChangeMode = event => {
        changeMode(mode === "newUser" ? "loginMode" : "newUser");
    };

    const onChange = event => {
        const { currentTarget: { name, value = "" } = {} } = event || {};

        if (name === "username"){
            setUsername(value);
        } else if (name === "name"){
            setName(value);
        } else if (name === "password"){
            setPassword(value);
        }

        const regExpVarChar = /[A-Za-z0-9_]{4,}/i;

        const isValidUsername = regExpVarChar.test(username,
            name === "username" ? value : username);

        const isValidPassword = regExpVarChar.test(
            name === "password" ? value : password);

        const isValidName = regExpVarChar.test(
            name === "name" ? value : nameState);

        if (isValidPassword && isValidUsername){
            if (!isValidName && mode === "newUser"){
                return setValid(false);
            }
            setValid(true);
        } else if (isValid) setValid(false);

    }

    const onSubmit = event => {
        
        const regExpVarChar = /[A-Za-z0-9_]{4,}/i;

        const isValidUsername = regExpVarChar.test(username);
        const isValidPassword = regExpVarChar.test(password);

        if (mode === "newUser"){

            const isValidName = regExpVarChar.test(nameState);

            if (isValidPassword && isValidUsername && isValidName){
                if (onReg) onReg({ username, password, name: nameState });
            } else setValid(false);

        } else {
            
            if (isValidPassword && isValidUsername){
                if (onLogin) onLogin({ username, password });
            } else setValid(false);
        }
    }

    return (
        <div className = "popover-wrapper">
            <div className="login-popup-wrapper">
                <Scrollbars>
                    <div className = "login-popup">
                        <div className = "login-popup-header">
                            <p className = "title-login-popup">
                                {mode === "newUser" ? "Registration" : "Login"}
                            </p>
                        </div>
                        <form 
                            autoComplete="off"
                            className = {classnames("login-popup-main", mode)}
                        >
                            <p 
                                className = 'validation-msg'
                            >
                                {!isValid ? "Поля должны содержать больше 4-х знаков" : null}
                            </p>
                            {mode === "newUser" ? (
                                <React.Fragment>
                                    <label>username:</label>
                                    <input
                                        onChange = {onChange}
                                        value = {username}
                                        type = "text" 
                                        name = "username" 
                                        className = "username-field" 
                                    />
                                    <label>name:</label>
                                    <input 
                                        onChange = {onChange}
                                        value = {nameState}
                                        type = "text" 
                                        name = "name" 
                                        className = "name-field" 
                                    />
                                    <label>password:</label>
                                    <input
                                        onChange = {onChange}
                                        value = {password}
                                        type = "password"
                                        name = "password" 
                                        className = "password-field" 
                                    />
                                    <input 
                                        type = "button" 
                                        value = "submit"
                                        onClick = {onSubmit} 
                                        disabled = {!isValid}
                                    />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <label>username:</label>
                                    <input
                                        onChange = {onChange}
                                        value = {username}
                                        type = "text" 
                                        name = "username" 
                                        className = "username-field" 
                                    />
                                    <label>password:</label>
                                    <input 
                                        onChange = {onChange}
                                        value = {password}
                                        type = "password" 
                                        name = "password" 
                                        className = "password-field" 
                                    />
                                    <input 
                                        type = "button" 
                                        value = "enter" 
                                        onClick = {onSubmit} 
                                        disabled = {!isValid} 
                                    />
                                </React.Fragment>
                            )}
                            <p 
                                onClick = {onChangeMode} 
                                className = 'login-change-mode'
                            >
                                {mode === "newUser" ? "Login" : "Registration"}
                            </p>
                        </form>
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
};

export default LoginForm;