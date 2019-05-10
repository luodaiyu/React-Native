import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import Carousel from './Carousel';
import ProductList from './ProductList';

export default class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <SearchBar/>
                <Carousel/>
                <ProductList/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})