
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import ToggleSwitch from "toggle-switch-react-native";

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = {
      isDate: true,
      isTime:true,
      istimeofDay:true,
      date: "",
      time:"",
      timeOfday :""
    };
     
  }

  
  componentDidMount() {
    console.log("componentDidMount  " );
    json=this.getTimes()
   
  
  }

   getTimes (){

    
    //console.log( 'http://13.53.184.93:3000/current_day?date='+this.state.isDate+'&time='+this.state.isTime+'&timeOfday='+this.state.istimeofDay)

    return fetch('http://13.53.184.93:3000/current_day?date='+this.state.isDate+'&time='+this.state.isTime+'&timeOfday='+this.state.istimeofDay)
      .then((response) => response.json())
      .then((json) => {
       
        this.setState({
          date: json.date,
          time: json.time,
          timeOfday:json.timeofDay
        });
      //  console.log(json.date +" "+json.time+" "+json.timeofDay)
     // console.log("from servr is Datechanged to : ", this.state.isDate)
     //console.log("from servr is TImechanged to : ", this.state.isTime)
     //console.log("from servr is timeofchanged to : ", this.state.istimeofDay)
         return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidUpdate()
  {
    console.log("componentDidUpdate  " );
  }
  onToggleD(isOn) {
  
   this.setState({ isDate: isOn}, function () {
    this.getTimes()
    this.render()
})

  }

  onToggleT(isOn) {
    
    this.setState({ isTime: isOn}, function () {
     this.getTimes()
     this.render()
 })
   
   }

  onToggleTO(isOn) {
   
    this.setState({ istimeofDay: isOn}, function () {
      this.getTimes()
      this.render()
  })
    
  }

  render() {
    return (
      <View style={[styles.container,  {flexDirection: "column" }]}>
      <Text style={styles.bigBlack}>Дата на сервере: {this.state.date}</Text>
      <Text style={styles.bigBlack}>Время на сервере: {this.state.time} </Text>
      <Text style={styles.bigBlack}>Время суток на сервере: {this.state.timeOfday}</Text>
      

        <ToggleSwitch
           label="Показывать Дату"
          size="large"
          isOn={this.state.isDate}
          labelStyle={{ color: "black",fontSize: 20, fontWeight: "900" }}
          onToggle={isDate => {
            this.setState({ isDate });
            this.onToggleD(isDate);
          }}
        />
        <ToggleSwitch
           label="Показывать время"
           labelStyle={{ color: "black",fontSize: 20, fontWeight: "900" }}
          size="large"
          isOn={this.state.isTime}
          onToggle={isTime => {
            this.setState({ isTime });
            this.onToggleT(isTime);
          }}
        />
        <ToggleSwitch
           label="Показывать время суток"
           labelStyle={{ color: "black",fontSize: 20, fontWeight: "900" }}
          size="large"
          isOn={this.state.istimeofDay}
          onToggle={istimeofDay => {
            this.setState({ istimeofDay });
            this.onToggleTO(istimeofDay);
          }}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bigBlack: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});