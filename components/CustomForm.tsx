"use client"
import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
    control: Control<any>
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {

    const { fieldType, iconSrc, iconAlt, placeholder } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'user'}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='NG'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        // value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
    }

}
const CustomForm = (props: CustomProps) => {

    const { control, fieldType, name, label } = props


    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className='flex-1'>
                        {fieldType !== FormFieldType.CHECKbOX && label && (
                            <FormLabel>{label}</FormLabel>
                        )}
                        <RenderField
                            field={field} props={props}
                        />
                        <FormMessage className='shad-error' />

                    </FormItem>
                )}
            />
        </div>
    )
}

export default CustomForm
