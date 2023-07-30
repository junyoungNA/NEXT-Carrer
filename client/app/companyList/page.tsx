'use client'
import axios from 'axios';
import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';


const CompnayList: React.FC<{}> = () => {
    const [list, setList] = useState<any>([])
    // const fetcher = async(url : string) => {
    //     const res = await axios.get(url)
    //     return res.data
    // }
    // const {data, error, mutate} = useSWR(`/enterprise`, fetcher);
    useEffect(() => {
        const result =  getList();
    }, []);

    const getList = async() => {
        const result = await axios.get('/enterprise/list');
        console.log(result);
        return result;
    }
    return (
        <div>
            
        </div>
    )
}

export default CompnayList;