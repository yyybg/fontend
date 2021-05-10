import React, { Component } from 'react'
import Menu from './Menu'
import TodoApi from '../api/todo'

class TodoDetail extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        this.state = {
            // 获取动态路由中参数的值
            id: this.props.match.params.id,
            todo: {},
        }
    }

    componentDidMount() {
        let id = this.state.id
        let todoId = String(id)
        this.api.detail(todoId, (r) => {
            this.setState({
                todo: r,
            })
        })
    }

    render() {
        let todo = this.state.todo
        return (
            <div>
                <Menu/>
                <div>
                    {
                        Object.entries(todo).map((e, index) => {
                            let [k, v] = e
                            return (
                                <pre key={index}>
                                    ({k}): ({v})
                                </pre>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TodoDetail
