import React, { Component } from 'react';
import { View,Platform,StyleSheet,StatusBar,TextInput,Button,Alert} from 'react-native';

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={
            searchText:''
        };
    }

    render(){
        return (
            <View>
                {/* 状态栏 */}
                <StatusBar backgroundColor='red' barStyle='default' networkActivityIndicatorVisible={true}></StatusBar>
                {/* 搜索栏 */}
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索商品' 
                        onChangeText={(text)=>{this.setState({searchText:text});console.log('输入的内容'+this.state.searchText)}}></TextInput>
                    <Button style={styles.button} title='搜索' onPress={()=>{Alert.alert(this.state.searchText),clearInterval(this.interval)}}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchbar:{
        marginTop:Platform.OS==='ios'? 30:0,
        height:40,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
      },
      input:{
        borderColor:'gray',
        borderWidth:2,
        flex:1,
        borderRadius:10,
        height:25
      },
      button:{
    
      }
})