import React from 'react';

import Controllers from "../Controllers";

class Header extends React.Component {

    render(){
        return (
            <header>
                <h1>My todo-list (PHP backend)</h1>
                <Controllers />
            </header>
        );
    }
};

export default Header;