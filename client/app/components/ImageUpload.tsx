import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

interface ImageUploadProps {
    onChange : (value : string) => void;
    value : string;
}

const ImageUpload = ({
    onChange,
    value,
} : ImageUploadProps) => {

    const hnadleUpload = (result : any) => {
        console.log('result', result);
        //cloudinary에 업로드된 이미지 정보가 들어있음
        onChange(result.info.secure_url);
        //ssr, https로 되어있는 이미지 url을 제공해줌
    }
    return (
        <CldUploadWidget 
            onUpload={hnadleUpload}
            uploadPreset={'ijijie'}
            options={{
                maxFiles: 1,
            }}
        >
            {({open}) => {
                return (
                    <div
                        className='relative flex flex-col items-center justify-center gap-4 p-20 border-2 border-dashed cursor-pointer tansition opacity-70 border-neutral-300 text-neutral-300 '
                        onClick={() => open?.()}
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image
                                    fill
                                    style={{objectFit:'cover'}}
                                    src={value}
                                    alt=''
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload
