'use client'
import React from 'react'
import { usePathname, useRouter, useSearchParams} from 'next/navigation';
import { Company } from '@/app/util/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    company: Company
}

const CompanyDetail: React.FC<Props> = () => {
    const searchParams  = useSearchParams();
    const companyParam: string | null = searchParams.get('company');
    let params: Company | null = null;
    if (companyParam !== null) {
        params = JSON.parse(companyParam);
    }
    const {
        id,
        carrer,
        enterprise,
        etc,
        service,
        identifier,
        title,
        slug,
        place,
        username,
        createdAt,
        endDate,
        updatedAt,
        imageUrl,
        imageUrn,
        mainwork,
        preferential,
        qualificate,
        welfare,
    } = params as Company;
    

        return (
        <div className='m-auto my-12 border-2 max-w-7xl'>
            <div className='w-2/3 mx-16 border-2 border-black '>
                <Image src={imageUrl} width={50} height={50} alt='공고 이미지' className='object-contain w-full h-full max-h-[400px] max-w-[700px]'/>
                <div className='my-12'>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                    <div className='flex'>
                        <h4 className='text-lg font-semibold text-center'>{enterprise}</h4>
                        <span className='pt-1 pl-4 font-light text-gray-500'> | {place} | {carrer}</span>
                    </div>
                    <div className='w-3/4 my-12'>
                        <h4 className='my-1 text-lg font-semibold'>회사 소개</h4>
                        <p className='mb-6'>{service}</p>
                        <h4 className='my-1 text-lg font-semibold'>자격 요건</h4>
                        <p className='mb-6'>{qualificate}</p>
                        <h4 className='my-1 text-lg font-semibold'>주요 업무</h4>
                        <p className='mb-6'>{mainwork}</p>
                        <h4 className='my-1 text-lg font-semibold'>우대 사항</h4>
                        <p className='mb-6'>{preferential}</p>
                        <h4 className='my-1 text-lg font-semibold'>자격 요건</h4>
                        <p className='mb-6'>{welfare}</p>
                        <h4 className='my-1 text-lg font-semibold'>기타 사항</h4>
                        <p className='w-3/4 mb-6 whitespace-pre-wrap'>{etc}</p> 
                    </div>                   
                </div>
                <Link href={{pathname:`/updateCompany`, query: {company : companyParam}}} className='m-3 border-2 border-black h-80 w-72' >
                    수정</Link>
                <button className='border-2 border-black '> 삭제</button>
            </div>
        </div>
    )
}

export default CompanyDetail;