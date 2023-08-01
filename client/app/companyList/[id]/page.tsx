'use client'
import React from 'react'
import { usePathname, useRouter, useSearchParams} from 'next/navigation';
import { Company } from '@/app/util/types';
import Image from 'next/image';

type Props = {
    company: Company
}

const CompanyDetail: React.FC<Props> = () => {
    const searchParams  = useSearchParams();
    const params : any = searchParams.get('company');
    const {id,
        carrer,
        enterprise ,
        etc ,
        service ,
        identifier,
        title,
        slug,
        place,
        username,
        createdAt,
        endDAte,
        updatedAt,
        imageUrl,
        imageUrn,
        mainwork,
        preferential,
        qualificate, 
        welfare } = (JSON.parse(params));

        return (
        <div className='m-auto my-12 max-w-7xl border-2 h-[600px]'>
            <div className='border-2  mx-16 border-black w-2/3 max-h-[600px]  '>
                <Image src={imageUrl} width={50} height={50} alt='공고 이미지' className='object-contain w-full h-full max-h-[400px] max-w-[700px]'/>
                <div className=''>
                    <h2>{title}</h2>
                    <h4>{enterprise}</h4>
                    <p>{place}</p>
                    <p>{service}</p>
                    <p>{carrer}</p>
                    <p>{mainwork}</p>
                    <p>{qualificate}</p>
                    <p>{preferential}</p>
                    <p>{welfare}</p>
                    <p>{etc}</p>

                </div>

            </div>
        </div>
    )
}

export default CompanyDetail;