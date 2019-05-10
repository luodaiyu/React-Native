/**
 * 简单的上拉加载，下拉刷新demo.实际项目当中应该各种情况都考虑进去
 */
import React,{Component} from 'react';
import {View,Text,Image,TouchableHighlight,FlatList,RefreshControl,StyleSheet,Dimensions,ActivityIndicator,Alert} from 'react-native';

const {width} =Dimensions.get('window');
var REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class ProductList extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
              isRefreshing: false,
              loaded:false,
              showFoot:1
        }
        this.fetchData = this.fetchData.bind(this);
    }


    componentDidMount(){
      this.fetchData();
    }

    fetchData(){
      fetch(REQUEST_URL)
        .then(response => response.json())
        .then(responseData=>{
          this.setState({
            dataSource: this.state.dataSource.concat(responseData.movies),
            loaded: true
          })
        })
    }
  
    _refreshControlComponent=()=>{
        return (
          <RefreshControl
            tintColor={'#FF0000'}
            title={'正在刷新数据，请稍后...'}
            titleColor={'#0000FF'} 
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
          />
        )
    }

    _renderSeperator(item){
        return (
          <View style={styles.divider}></View>
        );
    }

    //下拉刷新
    _onRefresh = () => {
      this.setState({
        isRefreshing: true
      })
      //请求接口，获得新数据
      let data = require('./MoviesExample.json');
      this.timeout = setTimeout(()=>{
        this.setState({
          dataSource: data.movies,
          isRefreshing: false
        })
      },2000);
      
    }

    //上拉加载
    _onEndReached = () => {
      if(this.state.showFoot === 1){
        //请求接口，获得新数据.
        let data = require('./MoviesExample.json');
        setTimeout(() => {
          this.setState({
            dataSource:this.state.dataSource.concat(data.movies),
            showFoot:0
          })
        },4000)
      }
    }

    _renderFooter= () => {
      if (this.state.showFoot === 0) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
      }else if(this.state.showFoot === 1){
        return (
          <View style={styles.footer}>
            <ActivityIndicator />
            <Text>正在加载更多数据...</Text>
          </View>
        )
      }
    }

    _renderRow({item}){
      return (
        <TouchableHighlight onPress={()=>{}}
          underlayColor='yellow'
          // activeOpacity={0}
        >
          <View style={styles.row}>
            <Image source={{uri:item.posters.thumbnail}} style={styles.productImage}></Image>
            <View style={styles.productText}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productSubTitle}>{item.year}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }

    _renderLoadingView(){
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator /> 
          <Text style={{marginTop:10}}>Loading movies...</Text>
        </View>
      )
    }
    
    render(){
      if(!this.state.loaded){
        return this._renderLoadingView();
      }

      return (
          <View style={styles.products}>
              <FlatList 
                  data={this.state.dataSource}
                  renderItem={this._renderRow}
                  ItemSeparatorComponent={this._renderSeperator}
                  ListFooterComponent={this._renderFooter}
                  style={styles.list}
                  keyExtractor={item => item.id}
                  // getItemLayout={(data,index)=>({length: 181, offset: 181 * index, index})}
                  // initialScrollIndex='3'//渲染当前位置的元素，需要先给定getItemLayout
                  // initialNumToRender='7'//指定一开始渲染的元素数量，最好刚刚够填满一个屏幕
                  onEndReachedThreshold='0.1'//定当距离内容最底部还有多远时触发onEndReached回调
                  onEndReached= {(info)=>this._onEndReached(info)}
                  // refreshing={this.state.isRefreshing}//显示出一个正在加载的符号
                  // onRefresh={this._onRefresh()}//如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件.需先设置refreshing=true
                  refreshControl={this._refreshControlComponent()}
                  >
              </FlatList>
          </View>
      )
    }
}

const styles = StyleSheet.create({
    divider:{
        height:1,
        width,
        marginLeft:5,
        backgroundColor:'lightgray'
    },
    products:{
        marginTop:5,
        // backgroundColor:'pink',
        // justifyContent:'center',
        // alignItems:'center',
        flex:1
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
    list: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
    footer:{
      flexDirection:'row',
      height:24,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:50,
    },
})