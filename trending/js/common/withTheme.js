import React, { Component } from 'react';
const ThemeContext = React.createContext('blue');

//这是一个高阶组件，用来给每个需要主题色的组件添加默认的主题色
// 在函数中引入组件
export function withTheme(Component){
    //返回一个组件
    return function ThemedComponent(props){
        // 最后使用context theme渲染这个被封装组件
        // 注意我们照常引用了被添加的属性
        return (
            <ThemeContext.Consumer>
                {
                    theme => 
                    <Component {...props} theme={theme} />
                }
            </ThemeContext.Consumer>
        )
    }
}