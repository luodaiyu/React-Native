import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,
        }
    }
});


const MainNavigator = createStackNavigator(
    {
        HomePage: HomePage,
        DetailPage: DetailPage
    }, {
        defaultNavigationOptions: {
            header: <View style={{ height: Platform.OS === 'android' ? 24 : 30 }}></View>
        }
    });

var AppNavigator = createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    }, {
        navigationOptions: {
            header: null,
        }
    })

export default createAppContainer(AppNavigator);