import React, {Component} from 'react'

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
                    <Route exact path="/" component={Home} />
                    {/*<Home xxx={yyy} />*/}
                    <Route exact path="/todo" component={Todo} />
                    <Route path="/todo/:id" component={TodoDetail} />
                </div>
            </Router>
        )
    }
}


export default App
