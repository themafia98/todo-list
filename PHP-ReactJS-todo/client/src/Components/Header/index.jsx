import React from 'react';

import Controllers from "../Controllers";

class Header extends React.Component {

    render(){
        const { onAdd = null } = this.props;
        return (
            <header>
                <h1>Todo-list (React / PHP)</h1>
                <Controllers onAdd = {onAdd} />
            </header>
        );
    }
};

export default Header;