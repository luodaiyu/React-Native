/**
 * React Nativegation 3.x
 */
import React, {Component} from 'react';
import {View,Text,Button} from 'react-native';
import {createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation';

// -----one stackTab-----
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    //标题设置（第一种方法：对象）
    //navigationOptions:它是一个对象或一个返回包含各种配置选项的对象的函数
    static navigationOptions = {
        title: 'Home',
        //标题样式的设置
        headerStyle: {// 设置header 的最外层 View 的 样式对象
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',//设置返回按钮及标题文字的颜色
        headerTitleStyle: {//标题文字的其他样式，包含fontFamily，fontWeight和其他Text样式属性，
            fontWeight: 'bold',
        },
    };

    componentDidMount(){
        alert('index componentDidMount')
    }
    componentWillUnmount(){
        alert('index componentWillUnmount')
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Text>首页</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details',{detailsTitle:'Details title'})}
                />
            </View>
        );
    }
}

class Detail extends Component{
    //标题设置（第二种方法：包含各种配置选项的对象的函数）
    static navigationOptions = ({ navigation,screenProps,navigationOptions }) => {
        return {
          title: navigation.getParam('detailsTitle'),
        };
    };
    componentDidMount(){
        alert('Detail componentDidMount')
    }
    componentWillUnmount(){
        alert('Detail componentWillUnmount')
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Text>detail</Text>
            </View>
        );
    }
}


//----two stacktab------

class LogoTitle extends Component{
    render(){
        return(
            <Text style={{backgroundColor:'pink'}}>自定义组件替换标题</Text>
        )
    }
}

class My extends Component{
    //自定义组件替代title
    static navigationOptions = {
        // headerTitle instead of title
        headerTitle: <LogoTitle />,
        headerRight: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
    }
    componentDidMount(){
        alert('My componentDidMount')
    }
    componentWillUnmount(){
        alert('My componentWillUnmount')
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Text>My</Text>
                <Button
                    title="Go to MyDetails"
                    onPress={() => this.props.navigation.navigate('MyDetails',{mydata:'my data的值'})}
                />
            </View>
        );
    }
}

class MyDetails extends Component{
    componentDidMount(){
        alert('MyDetails componentDidMount')
    }
    componentWillUnmount(){
        alert('MyDetails componentWillUnmount')
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Text>MyDetails</Text>
                <Text>my传过来的值：{this.props.navigation.getParam('mydata')}</Text>
                <Text>{this.props.navigation.state.params.mydata}</Text>
            </View>
        );
    }
}

//-----导航配置------

//stackNavigator
//createStackNavigator第一个参数：路由配置对象 第二个可选参数,导航路由配置(堆栈里路由的配置)。返回一个react组件
const AppNavigator = createStackNavigator(
    {
        Home:{screen:index},
        Details:{screen:Detail}
    },
    {
        initialRouteName:'Home',
    }
)

const MyStackNavigator = createStackNavigator(
    {
        My:My,
        MyDetails:MyDetails
    },
    {
        initialRouteName:'My',
        //页面间共享navigationOptions样式
        defaultNavigationOptions:{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
        },
        // navigationOptions: {
        //     tabBarLabel: 'Home!',
        // }
    }
)

//tabnavigator
const TabNavigator = createBottomTabNavigator(
    {
      Home: AppNavigator,
      My: MyStackNavigator,
    },
    {
        defaultNavigationOptions:({navigation})=>({
            tabBarIcon:({focused, horizontal, tintColor})=>{
                //可以在此自定义图标和徽标等等
                const { routeName } = navigation.state;
                if(routeName === 'Home'){
                    return <Text style={{backgroundColor:'red'}}>00</Text>
                }else{
                    return <Text style={{backgroundColor:'red'}}>11</Text>
                }
            },
            tabBarOptions: {
                activeTintColor: 'tomato',//被选中的颜色
                inactiveTintColor: 'gray',//未被选中的颜色
            },
        })
    }
  );

export default createAppContainer(TabNavigator);