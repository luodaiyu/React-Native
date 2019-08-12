import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SvgUri from 'react-native-svg-uri';

class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>TrendingPage</Text>
                {/* <SvgUri
                    width="200"
                    height="200"
                    source={require('../../assect/homer-simpson.svg')}
                    />  */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });

export default TrendingPage;