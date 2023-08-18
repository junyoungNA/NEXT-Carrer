import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';

const UserPage = async () => {
    const userData = await getCurrentUser();
    //getServerSession 서버에서 session 가져오는함수
    //nextauth 설정파일에 작성한 authOption을 매개변수로 전달
    console.log(userData)
    return (
        <div>
        
        </div>
    )
}

export default UserPage
