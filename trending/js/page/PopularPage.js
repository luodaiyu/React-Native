import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView ,StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';//顶部Tab导航
import SvgUri from 'react-native-svg-uri';//使用资源文件
import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import { withTheme } from '../common/withTheme';
import NavigationUtil from '../navigator/NavigationUtil';

//--------context demo测试----------
// 创建一个 theme Context,  默认 theme 的值为 blue
// const ThemeContext = React.createContext('blue');

// function Toolbar(props) {
//     return (
//         <View>
//             <ThemedButton />
//         </View>
//     )
// }

// function ThemedButton(props) {
//     return (
//         <ThemeContext.Consumer>
//             {theme => <Text style={{ color: theme }}>hahhah</Text>}
//         </ThemeContext.Consumer>
//     )
// }

// function Main(props) {
//     return (
//         <ThemeContext.Provider value='red'>
//             <Toolbar />
//         </ThemeContext.Provider>
//     )
// }
//--------context结束-------


class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        return (
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'red' }}>
                <View style={styles.container}>
                    <Text style={{ color: this.props.theme }}>PopularPage</Text>
                    <Image height={100} width={100} source={require('../../assect/biaoqingbao.gif')}></Image>
                    <SvgUri
                        width="100"
                        height="100"
                        source={require('../../assect/i_illustration_search_nothing.svg')}
                    // source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
                    />
                    {/* <View style={{height:200,width:300,alignItems:'center'}}>
                        <Svg height="50%" width="50%" viewBox="0 0 100 100">
                            <Circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="blue"
                                strokeWidth="2.5"
                                fill="green"
                            />
                            <Rect
                                x="15"
                                y="15"
                                width="70"
                                height="70"
                                stroke="red"
                                strokeWidth="2"
                                fill="yellow"
                            />
                        </Svg>
                    </View> */}

                </View>
            </ScrollView>
        );
    }
}

// class PopularTab extends Component {
//     render() {
//         const { tabLabel } = this.props;
//         return (
//             <View style={styles.container}>
//                 <StatusBar hidden={false} translucent={true}/>
//                 <View style></View>
//                 <Text style={styles.welcome}>{tabLabel}</Text>
//                 <Text onPress={()=>{
//                     NavigationUtil.goPage({
//                         navigation:this.props.navigation
//                     },"DetailPage")
//                 }}>跳转到详情页</Text>
//                 <View style={{ borderRadius: 40, backgroundColor: 'pink' }}>
//                     <Image style={{ borderRadius: 30,height:200, width:200 }} defaultSource={require('../../assect/biaoqingbao.gif')} source={require('../../assect/biaoqingbao.gif')}></Image>
//                 </View>
//             </View>
//         )
//     } 
// }

// const TabNavigatior = createMaterialTopTabNavigator(
//     {
//         PopularTab1: {
//             screen: PopularTab,
//             navigationOptions: {
//                 title: 'Tab1'
//             }
//         },
//         PopularTab2: {
//             screen: PopularTab,
//             navigationOptions: {
//                 title: 'Tab2'
//             }
//         }
//     })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {

    }
});
// export default TabNavigatior;

export default withTheme(PopularPage);