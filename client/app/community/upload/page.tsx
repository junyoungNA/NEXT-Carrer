'use client';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import Container from '@/app/components/Container';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '@/app/components/Heading';

const CommunityUploadpage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {register , handleSubmit, setValue, watch, formState : {
        errors,
    },
        reset
    } = 
        useForm<FieldValues>({
        defaultValues: {
            title:'',
            description: '',
            category : '',
            latitude: 33.5563,
            longitude:126.79581,
            imageSrc:'',
            price:1
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
    }
    return (
        <Container>
            <div
                className='max-w-screen-lg mx-auto'
            >
                <form   
                    className='flex flex-col gap-8'
                    onSubmit={handleSubmit(onSubmit)}>
                    <Heading
                        title ='Community Upload'
                        subtitle = 'Please upload your thoughts'
                    />
                    <Input
                        id="title"
                        label="제목"
                        disabled= {isLoading}
                        register = {register}
                        errors={errors}
                        required
                    />
                    <hr />
                    <Input
                        id="description"
                        label="Description"
                        disabled= {isLoading}
                        register = {register}
                        errors={errors}
                        required
                    />
                    <hr />
                    <div 
                        className='
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-3
                        max-h-[50vh]
                        overflow-y-auto
                        '
                    >
                        {/* Category  */}
                    </div>
                    <Button label='커뮤니티 생성하기'></Button>
                </form>
            </div>
        </Container>
    )
}

export default CommunityUploadpage
