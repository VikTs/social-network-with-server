import React, { useState, useEffect } from 'react';
import classes from './ProfileInfo.module.css'

//HOOKS
//1) НЕ использовать в условиях if(...){hook}

const ProfileStatusWithHooks = (props) => {
    //useState - задает значение по умолчанию и возвращает массив из 2 элементов:
    //1-е - значение, которое было передано в скобках
    //2-е - ф-я, которая изменяет это значение

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    //useEffect - ф-я, которая вызывается после отрисовки (изменение state, первая отрисовка)
    //Если добавить [], то вызовется только во время первой отрисовки
    //[] - компонент ни от чьего состояния не зависит, поэтому отрисовывается всего один раз
    useEffect(()=>{
        setStatus(props.status)
    }, [props.status] //если меняется props.status, то перерисовываем
    )

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => { 
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                <span onDoubleClick={activateEditMode}> {props.status || "-------"} </span>
            </div>}

            {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                    onBlur={deactivateEditMode}
                    value={status} 
                    />
                </div>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;