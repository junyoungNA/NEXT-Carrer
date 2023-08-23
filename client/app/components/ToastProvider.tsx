'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

//에러 처리를 위한 알림박스 생성해주기
//layout 파일에서 설정해줘여하지만 클라이언트 파일에서 작동하므로
//컴포넌트 작성
const ToastProvider = () => {
    return (
        <ToastContainer
            autoClose={2000} //2초후에 자동 닫힘
        />
        
    )
}

export default ToastProvider
