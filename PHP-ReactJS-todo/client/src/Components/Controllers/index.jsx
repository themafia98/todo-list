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
                <div className = 'sort-controllers'>
                  <input className = 'btn-sort past' type = 'button' value = 'past' />
                  <input className = 'btn-sort current' type = 'button' value = 'current' />
                  <input className = 'btn-sort future' type = 'button' value = 'future' />
                  <input className = 'btn-sort all' type = 'button' value = 'all' />
                </div>
            </div>
        )
    }
};

export default Controllers;