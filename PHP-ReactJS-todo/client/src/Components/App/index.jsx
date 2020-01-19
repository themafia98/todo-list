import React from 'react';


class App extends React.Component {

    state = {
        testData: [],
    }

    componentDidMount = async () => {
        const body = JSON.stringify({"ACTION": "$list", "TYPE": "all" });
        const response = await fetch("/api/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body
        });
        
        if (!response.ok) return;

        const resJson = await response.json();
       console.log(resJson);
        this.setState({
            testData: resJson
        })
    }

    render(){
    return <div>Todo-list{`${this.state.testData.res ? this.state.testData.res : null}`}</div>;
    }
}

export default App;