import React from 'react';
import classnames from 'classnames';
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
	  
	  onAdd = event => {
		  const { isValid = false } = this.state;
		  const { onAdd = null } = this.props;
		  if (!isValid) return;
		  if (onAdd) onAdd(this.state);

		  this.setState({
			  value: "",
			  isValid: false,
			  date: new Date()
		  });
	  }

      onChange = event => {
		const { date = null } = this.state;
		const { target: { value = "" } = {} } = event || {};
		const isValid = value && date;
        this.setState({ value, isValid });
      }

    render(){
        const { date = new Date(), value, isValid = false } = this.state;
		const { onAdd = null, onSort = null } = this.props;

        return(
            <div className = 'controllers'>
				<input 
					className = 'controllers__btn'
					value = {value} 
					type = 'text' 
					placeholder = 'What should you do?' 
					onChange = {this.onChange} 
				/>
                <DatePicker
						className = 'controllers__btn'
                        value={date}
                        format={"d-M-yyyy"}
                        onChange={this.handleChange}
                />
				<input 
					className = 'controllers__btn'
					disabled = {!onAdd || !isValid} 
					onClick = {onAdd ? this.onAdd : null} 
					type = 'button'
					value = 'add' 
				/>
                <div className = 'sort-controllers'>
				 	<input 
						className = {classnames('controllers__btn', 'btn-sort', 'past')} 
						type = 'button' 
						value = 'past'
						onClick = {onSort}
					/>
				  	<input 
						  className = 'btn-sort current' 
						  type = 'button' 
						  value = 'current' 
						  onClick = {onSort}
					/>
				  	<input 
						  className = 'btn-sort future' 
						  type = 'button' 
						  value = 'future' 
						  onClick = {onSort}
					/>
					<input 
						className = 'btn-sort all' 
						type = 'button' 
						value = 'all' 
						onClick = {onSort}
					/>
                </div>
            </div>
        );
    }
};

export default Controllers;