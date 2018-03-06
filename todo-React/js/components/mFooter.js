
class Footer extends React.Component{
    render(){
        return(
            <footer className='footer'>
                    <span className="todo-count">
                        <strong>{this.props.unCompletedNub}</strong>
                        <span> </span>
                        <span>items</span>
                        <span> left</span>
                    </span>
                <ul className="filters">
                    <li>
                        <a
                            href="javascript:;"
                            className={this.props.show ==='All'?'selected':''}
                            onClick={e=>{
                                this.props.toggle('All')
                            }}
                        >All</a>
                    </li>
                    <span> </span>
                    <li>
                        <a
                            href="javascript:;"
                            className={this.props.show ==='Uncompleted'?'selected':''}
                            onClick={e=>{
                                this.props.toggle('Uncompleted')
                            }}
                        >Uncompleted</a>
                    </li>
                    <span> </span>
                    <li>
                        <a
                            href="javascript:;"
                            className={this.props.show ==='Completed'?'selected':''}
                            onClick={e=>{
                                this.props.toggle('Completed')
                            }}
                        >Completed</a>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick = {this.props.clearCompleted}
                >Clear completed</button>
            </footer>
        )
    }
}