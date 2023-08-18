"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
// import Inputgroup from "../components/Inputgroup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form';
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const {register, handleSubmit, formState : {
    errors
  }} = useForm<FieldValues>({
    defaultValues : {
      name : '',
      email :'',
      password : '',
    }
  }); 
  const router = useRouter();

  const onSubmit:SubmitHandler<FieldValues> = async (body) => {
      setLoading(true)
      try {
          const {data} =  await axios.post('/api/register',body);
          router.push('/login');
      }catch (error : any){
          console.log('error',error.response.data);
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto overflow-auto bg-white border-2 border-gray-200 rounded p-9 h-5/6 md:w-96 mx-w sm:w-96 hide-scrollbar">
          <div>
            <div className="text-center ">
              <Link href={"/"} className="text-2xl font-bold ">
                Next-Carrer
              </Link>   
              <p className="my-2">
                환영합니다! 회원가입을 하고 
                <br /> 다음 커리어를 위해 성장하세요!!
              </p>
            </div>
          </div>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              errors={errors}
              register={register}
              required
            />
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              errors={errors}
              register={register}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              errors={errors}
              register={register}
              required
              />
            <Button label='회원가입'/>
          </form>
          <small>
            이미 가입하셨나요?
            <Link
              href="/login"
              className="font-bold text-blue-500 uppercase "
            >
              {" "}
              로그인
            </Link>
          </small>
          <div className="flex flex-col items-center justify-center mt-8 ">  
            <Image src='/images/kakao.png' alt='카카오 이미지' width={50} height={50}/>
            <p className="pl-0.5 text-gray-500 text-xs mt-1">kakao</p>
            <Link href='/' className="mt-4 text-sm font-bold ">계정을 잊으셧나요?</Link>
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

export default Register;
