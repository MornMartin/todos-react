
class ToDoList extends React.Component{
    constructor(props){
        super(props);
        // 初始化state
        this.state = Object.assign({},props)
        this.state.isAllChecked = this.isAllChecked();
        this.state.unCompletedNub = this.getUnCompletedNub();
        this.state.show = 'All';
        this.state.showData = this.getShowData('All');
    }
    // 是否全选
    isAllChecked(newArr=this.state.tasks){
        if (newArr.length === 0){
            return false;
        }
        return !Boolean(
            newArr.find(e=>{
                return !e.completed
            })
        )
    }
    //获取未完成任务数
    getUnCompletedNub(){
        return this.state.tasks.filter(e=>{
            return !e.completed
        }).length
    }
    //获取展示数据
    getShowData(show,newArr=this.state.tasks){
        if (show === 'Completed'){
            return newArr.filter(e=>{
                return e.completed
            });
        }else if(show === 'Uncompleted'){
            return newArr.filter(e=>{
                return !e.completed
            });
        }
        return newArr;
    }
    //需要操作数组
    operateTasks(newArr){
        this.setState({
            tasks: newArr,
            isAllChecked: this.isAllChecked(newArr),
            unCompletedNub: this.getUnCompletedNub(),
            showData: this.getShowData(this.state.show,newArr),
        })
    }
    //切换显示
    toggleShow(target){
        this.setState({
            show:target,
            showData:this.getShowData(target)
        })
    }
    //全选
    checkAll(target){
        this.operateTasks(this.state.tasks.map(e=>{
            e.completed = target
            return e;
        }))
    }
    //切换单项
    toggleItem(item,target){
        this.operateTasks(this.state.tasks.map(e=>{
            if (e === item){
                e.completed = target
            }
            return e;
        }));
    }
    //删除单项
    delItem(item){
        this.operateTasks(this.state.tasks.filter(e=>{
            return e !== item;
        }));
    }
    //清除已完成
    clearCompleted(){
        this.operateTasks(this.state.tasks.filter(e=>{
            return !e.completed
        }))
    }
    //新建任务
    newTask(e){
        if (e.keyCode === 13 && e.target.value.trim() !== ''){
            let obj ={
                title:e.target.value,
                completed:false
            }
            this.state.tasks.unshift(obj)
            this.operateTasks(this.state.tasks);
            e.target.value = '';
        }
    }
    // 重命名
    rename(task,value){
        task.title = value;
        this.operateTasks(this.state.tasks)
    }
    render(){
        return(
            <div>
                <Header
                    create = {this.newTask.bind(this)}
                />
                <Main
                    list = {this.state.showData}
                    isAllChecked = {this.state.isAllChecked}
                    checkAll = {this.checkAll.bind(this)}
                    toggle = {this.toggleItem.bind(this)}
                    delItem = {this.delItem.bind(this)}
                    rename = {this.rename.bind(this)}
                />
                <Footer
                    unCompletedNub = {this.state.unCompletedNub}
                    clearCompleted = {this.clearCompleted.bind(this)}
                    show = {this.state.show}
                    toggle = {this.toggleShow.bind(this)}
                />
            </div>
        )
    }
}
