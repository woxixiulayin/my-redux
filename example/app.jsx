import { actions, store } from './store'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import './style.css'

class Todo extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
    }

    constructor() {
        super()
        this.state = {
            todoData: {}
        }
        this.unsubscribe = null
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(state => {
            const todoData = state.byId[this.props.id || 0] || {}
            this.setState({ todoData })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { todoData = {} } = this.state
        const { id = 0, todo = ''} = todoData
    
        return <div className="todo-item">
        <span className="item-index">{`${id}: `}</span>
        <span className="item-content">{todo}</span>
        </div>
    }
}

class TodoList extends Component {
    constructor() {
        super()
        this.state = {
            ids: []
        }
        this.unsubscribe = null
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(state => {
            console.log('state is', state)
            const ids = state.ids || []
            this.setState({ ids })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    
    render() {
        const { ids = [] } = this.state

        return (
            <div
              id="todo-list"
            >
                {ids.map((id) => <Todo id={id} key={id} />)}
            </div>
        )
    }
}

class TodoInput extends Component {

    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    onKeyDown = e => {
        const keyCode = e.keyCode || e.which || e.charCode
        const ctrlKey = e.ctrlKey || e.metaKey
        if (keyCode === 13) {
            e.preventDefault()
            if (ctrlKey) {
                this.text.value += '\r'
            } else {
                const { value } = this.state
                store.dispatch(actions.todo_add(value))
                this.text.value = ''
            }
        }
    }

    render() {
        return (
            <div
              id="todo-input"
              >
              <input
                  onKeyDown={this.onKeyDown}
                  ref={node => this.text = node}
                  onChange={e => this.setState({ value: this.text.value })}
                  type="text"
                />
            </div>
        )
    }
}

const App = () => <div className="main-content">
    <TodoInput />
    <TodoList />
</div>

ReactDOM.render(
    <App />,
    document.querySelector('#app')
)

