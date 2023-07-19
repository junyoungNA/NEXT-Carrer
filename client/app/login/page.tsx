"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Inputgroup from "../components/Inputgroup";
// import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "../api/axios"; //axios인스턴스

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErros] = useState<any>({});
  const router = useRouter();
  const handleSubmit = async (event : FormEvent) => {
      event.preventDefault();
      try {
          const res =  await axios.post('/auth/login',{
              email,
              password,
          });
          router.push('/login');
      }catch (error : any){
          console.log('error',error.response.data);
          setErros(error.response?.data || {});
      }
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen p-6 mt-10">
        <div className="w-10/12 p-10 mx-auto overflow-auto bg-white border-2 border-gray-200 rounded h-5/6 md:w-96 sm:w-96 hide-scrollbar ">
          <div>
            <div className="text-center ">
              <Link href={"/"} className="text-2xl font-bold ">
                Next-Carrer
              </Link>
              <p className="my-7">
                환영합니다! 여러분의 비지니스 성장을
                <br /> 도모할 인재를 영입하세요!
              </p>
            </div>
          </div>
          <h1 className="my-2 text-lg font-bold">로그인</h1>
          <form onSubmit={handleSubmit}>
            <Inputgroup
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <Inputgroup
              placeholder="password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 my-2 font-bold text-white uppercase bg-gray-400 border-gray-400 rounded text-sl">
              로그인
            </button>
          </form>
          <small>
            계정이 없으신가요?
            <Link
              href="/register"
              className="font-bold text-blue-500 uppercase "
            >
              {" "}
              회원가입
            </Link>
          </small>
          <div className="flex flex-col items-center justify-center mt-8 ">  
            <Image src='/images/kakao.png' alt='카카오 이미지' width={50} height={50}/>
            <p className="pl-0.5 text-gray-500 text-xs mt-1">kakao</p>
            <Link href='/' className="mt-4 text-sm font-extrabold ">계정을 잊으셧나요?</Link>
            <hr className="w-full border-gray-300 mt-7"/>
            <div className="flex w-full mt-3 justify-evenly">
              <small className="font-medium">이용약관</small> 
              <small className="font-semibold"> 개인정보처리방침</small>
            </div>
            <p className="pr-2 mt-4 text-xs text-gray-900 font-extralight">© NEXTCareer.inc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
