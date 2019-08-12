import React, { Component } from 'react';
import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';



const HomePage = createBottomTabNavigator(
    {
        PopularPage: {
            screen: PopularPage,
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({ focused, tintColor, horizontal }) => (
                    <MaterialIcons
                        name={'whatshot'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        TrendingPage: {
            screen: TrendingPage,
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({ focused, tintColor, horizontal }) => (
                    <Ionicons
                        name={'md-trending-up'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        FavoritePage: {
            screen: FavoritePage,
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({ focused, tintColor, horizontal }) => (
                    <MaterialIcons
                        name={'favorite'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        MyPage: {
            screen: MyPage,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor, horizontal }) => (
                    <Entypo
                        name={'user'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        }
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOptions: {
                activeTintColor: 'tomato',//被选中的颜色
                inactiveTintColor: 'gray',//未被选中的颜色
            },
        })
    })



export default HomePage;