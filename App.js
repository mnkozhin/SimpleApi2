import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      isDate: true,
      isTime: true,
      istimeofDay: true,
      date: '',
      time: '',
      timeOfday: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount  ');
    this.getTimes();
  }

  getTimes() {
    return fetch(
      'http://10.75.181.245:3000/current_day?date=' +
        this.state.isDate +
        '&time=' +
        this.state.isTime +
        '&timeOfday=' +
        this.state.istimeofDay,
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          date: json.date,
          time: json.time,
          timeOfday: json.timeofDay,
        });
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidUpdate() {
    console.log('componentDidUpdate  ');
  }
  onToggleD(isOn) {
    this.setState({isDate: isOn}, function () {
      this.getTimes();
    });
  }

  onToggleT(isOn) {
    this.setState({isTime: isOn}, function () {
      this.getTimes();
    });
  }

  onToggleTO(isOn) {
    this.setState({istimeofDay: isOn}, function () {
      this.getTimes();
    });
  }

  render() {
    return (
      <View style={[styles.container, {flexDirection: 'column'}]}>
        <Text style={styles.bigBlack}>Дата на сервере: {this.state.date}</Text>
        <Text style={styles.bigBlack}>
          Время на сервере: {this.state.time}{' '}
        </Text>
        <Text style={styles.bigBlack}>
          Время суток на сервере: {this.state.timeOfday}
        </Text>

        <ToggleSwitch
          label="Показывать Дату"
          size="large"
          isOn={this.state.isDate}
          labelStyle={{color: 'black', fontSize: 20, fontWeight: '900'}}
          onToggle={isDate => {
            this.onToggleD(isDate);
          }}
        />
        <ToggleSwitch
          label="Показывать время"
          labelStyle={{color: 'black', fontSize: 20, fontWeight: '900'}}
          size="large"
          isOn={this.state.isTime}
          onToggle={isTime => {
            this.onToggleT(isTime);
          }}
        />
        <ToggleSwitch
          label="Показывать время суток"
          labelStyle={{color: 'black', fontSize: 20, fontWeight: '900'}}
          size="large"
          isOn={this.state.istimeofDay}
          onToggle={istimeofDay => {
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
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
