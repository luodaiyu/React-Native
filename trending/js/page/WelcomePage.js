import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavigationUtil from '../navigator/NavigationUtil';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation:this.props.navigation
            })
        }, 2000);
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>WelcomePage</Text>
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

export default WelcomePage;