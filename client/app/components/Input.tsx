import React from 'react'
import { FieldErrors, FieldValues ,UseFormRegister } from 'react-hook-form';

interface InputProps {
    id : string;
    label : string;
    type ? : string;
    disabled? : boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input:React.FC<InputProps> = ({    
    id, 
    label, 
    type= 'text',
    disabled,
    register,
    required,
    errors
}) => {
    return (
        <div className='relative w-full'>
            <label 
                    className={`
                        absolute
                        pl-1
                        text-base
                        duration-150
                        transform
                        -translate-y-3
                        top-4
                        z-10
                        origin-[0]
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:-translate-y-4
                        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                    `}
                >
                    {label}</label>
            <input 
                id={id}
                type={type}
                {...register(id, {required})}
                placeholder=''
                className={`    
                    w-full
                    p-3
                    mt-9
                    bg-white
                    font-light
                    border
                    border-gray-500
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                    `}
                />
        </div>
    )
}

export default Input
