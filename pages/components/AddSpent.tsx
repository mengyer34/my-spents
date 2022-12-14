// @flow 
import { SpentType } from '../enum'
import * as React from 'react';
import { useForm, useFormState } from "react-hook-form";
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Spent } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import { spentAction } from '../store/spent-slice';
import useOutsideClick from './useOutsideClick';
export const AddSpent = ({action}: any) => {
    const {register,resetField, handleSubmit, formState: { errors } }= useForm();
    const [data, setData] = useState<Spent[]>([]);
    const dispatcher = useDispatch()
    const onSubmit = async data =>{
        action(false)
        setData(data)
        dispatcher(spentAction.saveToLocalStorage(data))
        resetForm()
    }
    const resetForm = () => {
        resetField("title")
        resetField("type")
        resetField("amount")
        resetField("id")
        resetField("date")
    }
    return (
        <div className='fixed -bottom-[15%] w-full md:w-[1024px] z-50 p-4 rounded-t-2xl bg-white slide-top border'>
            <div className='flex justify-center bg-primary pt-1 absolute w-full top-0 left-0 rounded-t-2xl'>
                <div className='bg-white w-full h-3 rounded-t-2xl'></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("id")} defaultValue={uuidv4()}  />
                <input type="hidden" {...register("date")} defaultValue={new Date().toString()}  />
                <label className="block mb-2 text-sm font-medium text-gray-900 mt-3">What do you spent on?</label>
                <input {...register("title", {required: true})} className='w-full p-2 rounded-lg placeholder:text-primary outline-none bg-third' type="text" placeholder='eg. Go Shopping'/>

                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 mt-3">How much?</label>
                <input {...register("amount", {required: true})} className='w-full p-2 rounded-lg outline-none placeholder:text-primary bg-third' type="number" placeholder='eg. $5'/>

                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 mt-3">Spent Type?</label>
                <select {...register("type")} id="countries" className="w-full p-2 rounded-lg outline-none text-primary bg-third">
                    {Object.keys(SpentType).map((key: string | number) => {
                        return (
                            <option key={key} data-content="<i className='icon-clothes'></i>, hello" value={SpentType[key]}>
                                {/* <div className='flex bg-black'>
                                    <i className='icon-clothes'></i>
                                    // {SpentType[key]}
                                </div> */}
                                {SpentType[key]}
                            </option>
                            // <option data-content="Option3"></option>
                        )

                    })}
                </select>
                <button type='submit' onClick={close} className='w-full p-2 rounded-lg bg-primary outline-none mt-10 text-center font-bold text-white'>Save</button>
            </form>
        </div>
    );
};