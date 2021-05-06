import React, {Component} from 'react'
// import a as b from module 相当于给 a 模块起了一个别名 b,
// 这样在其他地方使用可以直接使用 b 这个变量名
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'
import Todo from './components/Todo'
import TodoDetail from './components/TodoDetail'

class App extends Component {
    render() {
        return (
            // BrowserRouter 会使用 HTML5 的 history API 渲染单页路由
            <Router>
                {/*Router 只能有一个子元素*/}
                <div>
                    {/*Route 组件用来匹配 location.pathname 的值, 并且渲染相应的组件 */}
                    {/*exact 表示路径完全匹配时才算匹配*/}
                    {/*比如 /todo/1 与 /todo 并不是完全匹配, 与 /todo/:id 完全匹配*/}
                    {/*
                    如果 location.pathname 的值是 /
                    那么渲染 Home 组件
                    如果 location.pathname 的值是 /todo
                    那么渲染 Todo 组件
                    如果 location.pathname 的值是 /todo/:id 的形式
                    那么渲染 TodoDetail 组件
                    */}
                    <Route exact path="/" component={Home} />
                    {/*<Home xxx={yyy} />*/}
                    <Route exact path="/todo" component={Todo} />
                    <Route path="/todo/:id" component={TodoDetail} />
                </div>
            </Router>
        )
    }
}

// exact
// if (location.pathname === path) {
//
// }
//
// without exact
// if (location.pathname.startsWith(path)) {
//
// }

export default App
