import React from 'react';
import DatePicker from "react-date-picker";


class Controllers extends React.Component {

    state = {
        date: new Date()
      };
     
      handleChange = date => {
          console.log(date);
        this.setState({
          date
        });
      };

    render(){
        const { date = new Date() } = this.state;
        const { onAdd = null } = this.props;
        return(
            <div className = 'controllers'>
                <input type = 'text' placeholder = 'What should you do?' />
                <DatePicker
                        value={date}
                        onChange={this.handleChange}
                />
                <input disabled = {!onAdd} onClick = {onAdd} type = 'button' value = 'add' />
            </div>
        )
    }
};

export default Controllers;