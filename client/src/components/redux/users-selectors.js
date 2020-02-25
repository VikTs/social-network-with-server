import {createSelector} from 'reselect'

const getUserSelector = (state) => {
    return state.userPage.users
}

//RESELECT - используются чтобы не рендерить каждый раз ф-ю, 
//Первый раз при запуске сохраняется результат работы ф-ии,
//который изменяется только когда изменяется значение ф-ии,
//от которой  реселект зависит
export const getUser =  createSelector(getUserSelector, (users)=>{
    return users.filter(u => true)
})


export const getPageSize = (state) => {
    return state.userPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.userPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.userPage.currentPage
}

export const getIsFetching = (state) => {
    return state.userPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.userPage.followingInProgress
}





