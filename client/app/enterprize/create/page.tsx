'use client'
import Inputgroup from '@/app/components/Inputgroup';
import TextGroup from '@/app/components/TextGroup';
import { Select } from '@mui/material';
import axios from '../../util/api/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'


const EnterpizeCreate: React.FC<{}> = () => {
    const [enterprise, setEnterprise] = useState('');//기업이름
    const [title, setTitle] = useState(''); //공고 제목
    const [carrer, setCarrer] = useState(''); // 경력
    const [salary, setSalary] = useState(''); //급여

    const [service, setService] = useState(''); //서비스 소개
    const [mainwork, setMainwork] = useState(''); //주요 업무
    const [qualificate, setqualificate] = useState('') ;//자격요건
    const [preferential, setPreferential] = useState('');//우대사항
    const [endDate, setEndDate] = useState(''); //공고 마감일
    const [place, setPlace] = useState(''); //근무지

    const [welfare, setWelfare] = useState('') //복지
    const [etc, setEtc] = useState('') //기타사항
    
    const [errors, setErrors] = useState<any>({});
    const [imageUrl, setImageUrl] = useState<any>('/images/noimage.png');
    const [imgfile, setFile] = useState<File | null>(null);
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onSubmitHnadelr = async(e : FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('enterprise',enterprise);
        formData.append('file',imgfile);
        formData.append('title', title);
        formData.append('carrer', carrer);
        formData.append('salary', salary);
        formData.append('service', service);
        formData.append('mainwork', mainwork);
        formData.append('qualificate', qualificate);
        formData.append('preferential', preferential);
        formData.append('endDate', endDate);
        formData.append('place', place);
        formData.append('welfare', welfare);
        formData.append('etc', etc);

        try {
        await axios.post(`/enterprise`, formData, {
            headers:{"Content-Type":"multipart/form-data"},
        })
        }catch(error : any) {
            console.log(error);
            setErrors(error.response?.data || {});
        }
    }

    const openFileInput = () => {
        const fileInput = fileInputRef.current;
        if(fileInput) {
            fileInput.click();
        }
    }

    const handleImage = (event : ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) return;
        
        setFile(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            const resultImage = reader.result;
            setImageUrl(resultImage);
        }
    }

    return (
        <div className='flex justify-center pt-16 mx-auto mt-11 max-w-7xl '> 
            <Image src={imageUrl} alt={'기업 이미지'}width={100} height={100} className='hidden md:block w-1/2 border-2 border-black h-[600px] object-cover' />
            <input type="file"  className='h-8 w-60' ref={fileInputRef} onChange={handleImage}/>
            <div className='flex flex-col md:w-1/3'>
                <div className='px-6 bg-white rounded '>
                    <form onSubmit={onSubmitHnadelr}>
                        <div className='relative mb-2'>
                            <Inputgroup placeholder='기업 이름' value={enterprise} setValue={setEnterprise} error={errors.email}/>
                            <Inputgroup placeholder='공고 제목' value={title} setValue={setTitle} error={errors.title}/>
                            <Inputgroup placeholder='경력' value={carrer} setValue={setCarrer} error={errors.carrer}/>
                            <Inputgroup placeholder='급여' value={salary} setValue={setSalary} error={errors.salary}/>
                    
                            <TextGroup placeholder='서비스소개' value={service}  setValue={setService} error={errors.service}/>
                            <TextGroup placeholder='주요 업무' value={mainwork} setValue={setMainwork} error={errors.mainwork}/>
                            <TextGroup placeholder='자격 요건' value={qualificate}  setValue={setqualificate} error={errors.qualificate}/>
                            <TextGroup placeholder='우대 사항' value={preferential} setValue={setPreferential} error={errors.preferential}/>
                            <input  type='date' value={endDate} onChange ={(e) => setEndDate(e.target.value) } placeholder='공고 마감일'/>
                            <Inputgroup placeholder='근무지' value={place} setValue={setPlace} error={errors.place}/>
                            <Inputgroup placeholder='복지' value={welfare} setValue={setWelfare} error={errors.welfare}/>
                            <Inputgroup placeholder='기타 사항' value={etc} setValue={setEtc} error={errors.etc}/>
                            <div className='absolute mb-2 text-sm text-gray-400 select-none' style={{top : 10, right: 10}}>
                                {title.trim().length}/20
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button className='px-4 py-1 text-sm font-semibold text-white bg-gray-400 border rounded'>생성하기</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default EnterpizeCreate