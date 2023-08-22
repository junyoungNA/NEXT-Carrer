import React from 'react'
import {CgWebsite} from 'react-icons/cg'
import {FaServer, FaJava, FaNodeJs, FaAndroid, FaDev , FaPython} from 'react-icons/fa'
import {BsCSquareFill} from 'react-icons/bs'
import {SiJavascript,SiIos } from 'react-icons/si'
import {HiServer} from 'react-icons/hi'
import {MdSupportAgent, MdOutlineSecurity} from 'react-icons/md'
import {AiFillDatabase} from 'react-icons/ai'


export const categories = [
    {
        label :'웹 개발',
        path : 'web',
        icon : CgWebsite,
        description : '웹개발 카테고리입니다.',
    },
    {
        label : '서버 개발',
        path : 'server',
        icon : FaServer,
        description : '서버 개발 카테고리입니다.'
    },
    {
        label : '자바 개발',
        path : 'java',
        icon : FaJava,
        description : '자바 개발 카테고리입니다.'
    },
    {
        label : 'Node.js 개발',
        path : 'node',
        icon : FaNodeJs,
        description : 'NODE.js 개발 카테고리입니다.'
    },
    {
        label : 'C,C++ 개발',
        path : 'cprogram',
        icon : BsCSquareFill,
        description : 'C,C++ 개발 카테고리입니다.'
    },
    {
        label : '파이썬 개발',
        path : 'python',
        icon : FaPython,
        description : 'Python 개발 카테고리입니다.'
    },
    {
        label : '프론트엔드 개발',
        path : 'front',
        icon : SiJavascript,
        description : '프론트엔드 개발 카테고리입니다.'
    },
    {
        label : '백엔드 개발',
        path : 'back',
        icon : HiServer,
        description : '백엔드 개발 카테고리입니다.'
    },
    {
        label : '안드로이드 개발',
        path : 'android',
        icon : FaAndroid,
        description : '안드로이드 개발 카테고리입니다.'
    },
    {
        label : 'IOS 개발',
        path : 'ios',
        icon : SiIos,
        description : 'IOS 개발 카테고리입니다.'
    },
    {
        label : 'DevOps/시스템 개발',
        path : 'devops',
        icon : FaDev,
        description : 'DevOps 개발 카테고리입니다.'
    },
    {
        label : '프로덕트 매니저',
        path : 'product',
        icon : MdSupportAgent,
        description : '프로덕트 매니저 카테고리입니다.'
    },
    {
        label : '데이터 엔지니어',
        path : 'dataengineer',
        icon : AiFillDatabase,
        description : '데이터 엔지니어 카테고리입니다.'
    },
    {
        label : '보안 엔지니어',
        path : 'securityengineer',
        icon : MdOutlineSecurity,
        description : '보안 엔지니어 카테고리입니다.'
    }
]

const Categories = () => {
    return (
        <div>
        
        </div>
    )
}

export default Categories
