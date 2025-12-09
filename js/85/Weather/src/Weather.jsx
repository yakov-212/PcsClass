import { Component } from "react";
import './Weather.css'
export default class Weather extends Component{
    state = {
        weatherData: '',
        icon: null
    }
    
    
     componentDidMount = async ()=>{
        try{
            const weather = await (await fetch('https://api.weather.gov/gridpoints/TOP/32,81/forecast/hourly')).json()
            this.setState({
                weatherData: weather.properties.periods[0].shortForecast,
                icon: weather.properties.periods[0].icon
            })
            console.log(weather)
        }
        catch{console.log('hey')}
    }
    render(){
        return (
            <>
                <div>Weather</div>
                <img src={this.state?.icon}></img>
                <div>{this.state.weatherData}</div>
                {console.log(this.state)}
            </>
        )
    }
}