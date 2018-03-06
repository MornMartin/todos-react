class Item extends React.Component{
    toReName(task){
        this.refs.div.style.display = 'none';
        this.refs.input.value = task.title;
        this.refs.input.style.display = 'inline-block';
        this.refs.input.select();
    }
    didReName(task,e){
        if (e.target.value !== task.title && e.target.value.trim() !== ''){
            this.props.rename(task,e.target.value)
        }
        this.refs.div.style.display = 'block';
        this.refs.input.style.display = 'none';
    }
    enterDown(task,e){
        if(e.keyCode === 13){
            this.didReName(task,e)
        }
    }
    render(){
        return(
            <li
                className={this.props.item.completed?'completed':''}
            >
                <div
                    className="view"
                    onDoubleClick={this.toReName.bind(this,this.props.item)}
                    ref="div"
                >
                    <input
                        type="checkbox"
                        className="toggle"
                        checked = {this.props.item.completed}
                        onChange = {e=>{
                            this.props.toggle(this.props.item,e)
                        }}
                    />
                    <label>{this.props.item.title}</label>
                    <button
                        className="destroy"
                        onClick = {e=>{
                            this.props.delItem(this.props.item)
                        }}
                    ></button>
                </div>
                <input
                    type='text'
                    className="edit"
                    onBlur={this.didReName.bind(this,this.props.item)}
                    onKeyDown={this.enterDown.bind(this,this.props.item)}
                    ref="input"
                />
            </li>
        )
    }
}
class Main extends React.Component{
    checkAll(e){
        this.props.checkAll(e.target.checked)
    }
    toggle(item,e){
        this.props.toggle(item,e.target.checked)
    }
    render(){
        return(
            <section>
                <input
                    type = "checkbox"
                    className = "toggle-all"
                    checked = {this.props.isAllChecked}
                    onChange = {this.checkAll.bind(this)}
                />
                <ul className="todo-list">
                    {
                        this.props.list.map((e,n)=>{
                            return (
                                <Item
                                    item = {e}
                                    toggle = {this.toggle.bind(this)}
                                    delItem = {this.props.delItem}
                                    key = {n}
                                    rename = {this.props.rename}
                                />
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}