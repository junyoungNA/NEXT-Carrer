'use client';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import Container from '@/app/components/Container';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '@/app/components/Heading';
import ImageUpload from '@/app/components/ImageUpload';
import { categories } from '@/app/components/Categories/Categories';
import CategoryInput from '@/app/components/Categories/CategoryInput';
import { IconType } from 'react-icons';

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
            imageSrc:'',
            price:1
        }
    });

    //react-hook-form 에서 제공하는 watch함수
    //useForm에 등록된 값이 변경되는것을 계속 감지한다.
    const category = watch('category'); //카테고리
    const imageSrc = watch('imageSrc');
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
    }
    const setCustomValue = (id : string,  value : any) => {
            setValue(id, value);
            //react-hook-form 제공함수 setValue
            // 첫번째 인자는 input의 이름, 두번째는 event객체 자체를 넣어준다.
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
                    <ImageUpload 
                        onChange = {(value) => setCustomValue('imageSrc', value)}
                        value = {imageSrc}
                    />
                    <Input
                        id="title"
                        label="제목"
                        disabled= {isLoading}
                        register = {register}
                        errors={errors}
                        required
                    />
                    <hr/>
                    <Input
                        id="description"
                        label="Description"
                        disabled= {isLoading}
                        register = {register}
                        errors={errors}
                        required
                    />
                    <hr/>
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
                        {categories.map((item ) => 
                            <div key={item.label} className='col-span-1'>
                                <CategoryInput
                                    onClick={() => setCustomValue('category', category)}
                                    selected={category === item.path}
                                    label={item.label}
                                    icon ={item.icon}
                                    path={item.path}
                                />
                            </div>
                        )}
                    </div>
                    <Button label='커뮤니티 생성하기'></Button>
                </form>
            </div>
        </Container>
    )
}

export default CommunityUploadpage
