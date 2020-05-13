import React from 'react';
import classes from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {
    state = { //local state
        editMode: false, //вкл/выкл режима редактирования
        status:this.props.status
    }

    activateEditMode = () => { //стрелочная ф-я, чтобы при DoubleClick не использовать bind
        this.setState({editMode: true}); 
        // setState - берется из React.Component
        // setState - асинхронный и выполниться в самом конце
        //this.forceUpdate() //метод, которого нужно избегать, обновление данных
    }

    deactivateEditMode = () => { 
        this.setState({editMode: false});
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }

    //в componentDidUpdate можем работать и со старым, и с новым State
    componentDidUpdate(prevProps, prevState) { //предыдущие Props и State перед обновлением
        //условие - чтобы избежать бесконечного цикла
        if(prevProps.status != this.props.status){ //чтоб статус в span и input совпадали
            this.setState({
                status: this.props.status
            })
        }
        //console.log('componentDidUpdate')
    }


    render() {
        // console.log('render')
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}> {this.props.status || "-------"} </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange ={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;