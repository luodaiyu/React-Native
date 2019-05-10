import React,{Component} from 'react';
import {Image,View,Style,StyleSheet,Dimensions,ScrollView,TouchableHighlight,Alert} from 'react-native';


const {width} =Dimensions.get('window');
const circleSize = 8;
const circleMargin = 5;

export default class Carousel extends Component{
    constructor(props){
        super(props);
        this.state={
            advertisements :[
                {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2936015565,4241265787&fm=26&gp=0.jpg'},
                {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557044432&di=806743c294448b951c4133c0a92806d2&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F110516%2F1719-11051604364930.jpg'},
                {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2936015565,4241265787&fm=26&gp=0.jpg'}
            ],
            currentPage:0
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    componentDidMount(){
        this._startTimer();
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

    render(){
        const advertisementCount=this.state.advertisements.length;//圆点个数即图片的个数
        const indicatorWidth=circleSize*advertisementCount+circleMargin*advertisementCount*2;
        const left =((width)-indicatorWidth)/2;
        return (
            <View style={styles.dvertisement}>
                <ScrollView ref={(value)=>this.scrollView=value} horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                {this.state.advertisements.map((advertisement,index)=>{
                    return (
                    <TouchableHighlight key={index} onPress={()=>Alert.alert('1')}>
                        <Image style={styles.advertisementContent} 
                            source={{uri:advertisement.url}}
                        >
                        </Image>
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
        )
    }
}


const styles = StyleSheet.create({
    dvertisement:{
        // backgroundColor:'blue',
        height:180,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center' 
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
    }
})