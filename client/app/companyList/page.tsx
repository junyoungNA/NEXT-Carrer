'use client'
import axios from '../util/api/axios';
import React, {  useState } from 'react';
import useSWR from 'swr';
import { listLocationOption,listSortOption, listCarrerOption } from '../util/selectoption';
import SelectGroup from '../components/SelectGroup';
import Image from 'next/image';
import Link from 'next/link';
import { Company } from '../util/types';


const CompnayList: React.FC<{}> = () => {
    const [erros, setErrors] = useState<any>({});
    const [location, setLocation] = useState('');
    const [carrer, setCarrer] = useState('');
    const [sort, setSort] = useState('');
    
    const fetcher = async(url : string) => {
        const res = await axios.get(url)
        return res.data
    }
    const {data, error, mutate, isLoading} = useSWR(`/enterprise/list`, fetcher);
    
    if(isLoading) return;
            
    return (
        <div className='h-[900px]'>
            <div className=''>
                <div className='flex'>
                    <SelectGroup setValue={setLocation} error= {erros.location}  value={location} options={listLocationOption}></SelectGroup>
                    <SelectGroup setValue={setCarrer} error= {erros.carrer}  value={carrer} options={listCarrerOption}></SelectGroup>
                    <SelectGroup setValue={setSort} error= {erros.sort}  value={sort} options={listSortOption}></SelectGroup>
                </div>
            </div>
            <hr className='border-t-2'/>
            <div className='m-auto max-w-[1024px]'> 
                <h2 className='text-xl'> 채용중인 회사</h2>
                <div className='flex flex-wrap justify-center'>
                {data?.map((company : Company) => 
                        <Link href={{pathname:`/companyList/${company.identifier}`, query: {company : JSON.stringify(company)}}} className='m-3 border-2 border-black h-80 w-72' key={company.id}>
                            <Image className='object-cover w-full h-2/3' src={`${company!.imageUrl}`} width={50} height={50} alt='회시 이미지'/>
                            <h3 className='text-lg font-semibold'>{company.title}</h3>
                            <h4>{company.enterprise}</h4>
                            <p className='text-[gray]'> {company.place}</p>
                            <p className='text-[gray]'> {company.carrer}</p>
                            
                        </Link>
                    )}
                </div>
                    
            </div>
        </div>
        
    )
}

export default CompnayList;