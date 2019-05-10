/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  Animated,
  RefreshControl
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const {width} =Dimensions.get('window');
const circleSize = 8;
const circleMargin = 5;

type Props = {};
export default class App extends Component<Props> {
  constructor(Props){
    super(Props);
    this.state={
      currentPage:0,
      dataSource:[
        {
          image: require('./app/images/one.jpg'),
          title:'商品1',
          subTitle:'描述1'
        },
        {
          image: require('./app/images/two.jpeg'),
          title:'商品2',
          subTitle:'描述2'
        },
        {
          image: require('./app/images/three.jpg'),
          title:'商品3',
          subTitle:'描述3',
        },
        {
          image: require('./app/images/one.jpg'),
          title:'商品4',
          subTitle:'描述4'
        },
        {
          image: require('./app/images/two.jpeg'),
          title:'商品5',
          subTitle:'描述5'
        },
        {
          image: require('./app/images/three.jpg'),
          title:'商品6',
          subTitle:'描述6'
        },
        {
          image: require('./app/images/one.jpg'),
          title:'商品7',
          subTitle:'描述1'
        },
        {
          image: require('./app/images/two.jpeg'),
          title:'商品8',
          subTitle:'描述2'
        },
        {
          image: require('./app/images/three.jpg'),
          title:'商品9',
          subTitle:'描述3'
        },
        {
          image: require('./app/images/one.jpg'),
          title:'商品10',
          subTitle:'描述4'
        },
        {
          image: require('./app/images/two.jpeg'),
          title:'商品11',
          subTitle:'描述5'
        },
        {
          image: require('./app/images/three.jpg'),
          title:'商品12',
          subTitle:'描述6'
        }
      ],
      advertisements :[
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2936015565,4241265787&fm=26&gp=0.jpg'},
        {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557044432&di=806743c294448b951c4133c0a92806d2&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F110516%2F1719-11051604364930.jpg'},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2936015565,4241265787&fm=26&gp=0.jpg'}
      ],
      searchText:'',
      fadeAnim: new Animated.Value(0),// 透明度初始值设为0
      isRefreshing: false
    }
  }
  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    })
  }
  componentDidMount(){
    this._startTimer();
    this.interval = setInterval(() => {
      Animated.sequence([
        Animated.spring(// 随时间变化而执行动画
          this.state.fadeAnim,// 动画中的变量值
          {
            toValue:1, // 透明度最终变为1，即完全不透明
            duration:300// 让动画持续一段时间
          }
        ),
        Animated.spring(// 随时间变化而执行动画
          this.state.fadeAnim,// 动画中的变量值
          {
            toValue:0, // 透明度最终变为1，即完全不透明
            duration:300// 让动画持续一段时间
          }
        )// 开始执行动画
      ]).start()
    }, 400);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  _startTimer(){
    this.interval=setInterval(()=>{
      let nextPage=this.state.currentPage+1;
      if(nextPage>=3){
        nextPage=0;
      }
      this.setState({
        currentPage:nextPage
      })
      //计算scrollView滚动的X轴偏移量
      const offSetX=nextPage*width;
      this.scrollView.scrollResponderScrollTo({x:offSetX,y:0,animated:true})
    },1500)
  }

  _renderRow(item){
    return (
      <TouchableHighlight onPress={()=>{}}
      underlayColor='yellow'
      // activeOpacity={0}
      >
        <View style={styles.row}>
          <Image source={item.image} style={styles.productImage}></Image>
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productSubTitle}>{item.subTitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeperator(item){
    return (
      <View style={styles.divider}></View>
    );
  }

  _refreshControlComponent=()=>{
    <RefreshControl
      refreshing={this.state.isRefreshing}
      onRefresh={this._onRefresh}
    />
  }

  render() {
    let {fadeAnim} = this.state;
    const advertisementCount=this.state.advertisements.length;//圆点个数
    const indicatorWidth=circleSize*advertisementCount+circleMargin*advertisementCount*2;
    const left =((width)-indicatorWidth)/2;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='red' barStyle='default' networkActivityIndicatorVisible={true}></StatusBar>
       {/* 搜索栏 */}
        <View style={styles.searchbar}>
          <TextInput style={styles.input} placeholder='搜索商品' 
            onChangeText={(text)=>{this.setState({searchText:text});console.log('输入的内容'+this.state.searchText)}}></TextInput>
          <Button style={styles.button} title='搜索' onPress={()=>{Alert.alert(this.state.searchText),clearInterval(this.interval)}}></Button>
        </View>
        {/* 轮播图 */}
        <View style={styles.dvertisement}>
          <ScrollView ref={(value)=>this.scrollView=value} horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
            {this.state.advertisements.map((advertisement,index)=>{
              return (
                <TouchableHighlight onPress={()=>Alert.alert('1')}>
                  <Image style={styles.advertisementContent} 
                    source={{uri:advertisement.url}}></Image>
                </TouchableHighlight>
              )
            })}
          </ScrollView>
          <View style={[styles.indicator,{left:left}]}>
            {this.state.advertisements.map((advertisement,index)=>{
              return (<View key={index} style={(index===this.state.currentPage)?styles.circleSelected:styles.circle}/>);
            })}
          </View>
        </View>
        {/* 动画测试 */}
        <View style={{height:30,flexDirection:'row',backgroundColor:'blue',justifyContent:'center'}}>
          <Animated.View style={{backgroundColor:'red',opacity:fadeAnim}}>
            <Text>hahahhahaahhahaahah</Text>
          </Animated.View>
        </View>
        {/* 上啦刷新下拉加载 */}
        <View style={styles.products}>
          <FlatList data={this.state.dataSource}
            renderItem={({item})=>this._renderRow(item)}
            ItemSeparatorComponent={this._renderSeperator}
            // getItemLayout={(data,index)=>({length: 181, offset: 181 * index, index})}
            // initialScrollIndex='3'//渲染当前位置的元素，需要先给定getItemLayout
            // initialNumToRender='7'//指定一开始渲染的元素数量，最好刚刚够填满一个屏幕
            // onEndReachedThreshold='0.3'//定当距离内容最底部还有多远时触发onEndReached回调
            // onEndReached= {(info)=>{alert(JSON.stringify(info))}}
            // refreshing={this.state.isRefreshing}//显示出一个正在加载的符号
            // onRefresh={this._onRefresh()}//如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件.需先设置refreshing=true
            refreshControl={this._refreshControlComponent()}
            >
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar:{
    marginTop:Platform.OS==='ios'?30:0,
    height:40,
    // backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  dvertisement:{
    // backgroundColor:'blue',
    height:180,
    marginTop:5,
    justifyContent:'center',
    alignItems:'center' 
  },
  products:{
    marginTop:5,
    // backgroundColor:'pink',
    // justifyContent:'center',
    // alignItems:'center',
    flex:1
  },
  input:{
    borderColor:'gray',
    borderWidth:2,
    flex:1,
    borderRadius:10
  },
  button:{

  },
  row:{
    height:60,
    flexDirection:'row',
    backgroundColor:'white'
  },
  productImage:{
    marginLeft:10,
    width:40,
    height:40,
    marginRight:10,
    alignSelf:'center'
  },
  productText:{
    flex:1,
    marginTop:10,
    marginBottom:10
  },
  productTitle:{
    flex:3,
    fontSize:16
  },
  productSubTitle:{
    flex:2,
    fontSize:14,
    color:'gray'
  },
  advertisementContent:{
    width:width,
    height:180
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'gray',
    marginHorizontal: circleMargin
  },
  circleSelected:{
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'white',
    marginHorizontal: circleMargin
  },
  divider:{
    height:1,
    width,
    marginLeft:5,
    backgroundColor:'lightgray'
  }
});
