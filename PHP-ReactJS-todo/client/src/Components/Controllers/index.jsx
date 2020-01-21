import React from 'react';
import DatePicker from "react-date-picker";

class Controllers extends React.Component {

    state = {
		value: "",
		isValid: false,
        date: new Date()
      };
     
      handleChange = date => {
		const { value = "" } = this.state;
		const isValid = value && date;

        this.setState({ date, isValid });
      };

      onChange = event => {
		const { date = null } = this.state;
		const { target: { value = "" } = {} } = event || {};
		const isValid = value && date;
        this.setState({ value, isValid });
      }

    render(){
        const { date = new Date(), value, isValid = false } = this.state;
        const { onAdd = null } = this.props;
        return(
            <div className = 'controllers'>
				<input 
					value = {value} 
					type = 'text' 
					placeholder = 'What should you do?' 
					onChange = {this.onChange} 
				/>
                <DatePicker
                        value={date}
                        format={"d-M-yyyy"}
                        onChange={this.handleChange}
                />
				<input 
					disabled = {!onAdd || !isValid} 
					onClick = {onAdd ? onAdd.bind(this, this.state) : null} 
					type = 'button'
					value = 'add' 
				/>
                <div className = 'sort-controllers'>
				 	<input 
						className = 'btn-sort past' 
						type = 'button' 
						value = 'past' 
					/>
				  	<input 
						  className = 'btn-sort current' 
						  type = 'button' 
						  value = 'current' 
					/>
				  	<input 
						  className = 'btn-sort future' 
						  type = 'button' 
						  value = 'future' 
					/>
					<input 
						className = 'btn-sort all' 
						type = 'button' 
						value = 'all' 
					/>
                </div>
            </div>
        );
    }
};

export default Controllers;