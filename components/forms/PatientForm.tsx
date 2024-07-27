"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { parseStringify } from "@/lib/utils"

export enum FormFieldType {
    INPUT = 'input',
    CHECKbOX = 'checkbox',
    PHONE_INPUT = 'phoneInput',
    TEXTAREA = 'textarea',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}





const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {

        setIsLoading(true)
        try {
            const userData = {
                name: values.name,
                email: values.email,
                phone: values.phone
            }

            const user = await createUser(userData)

            if (user) router.push(`/patients/${user.$id}/register}`)
            console.log(userData, user)
        } catch (error) {
            console.log(error)
        }
        //  finally {
        //     setIsLoading(false)
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header"> Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first apointment</p>
                </section>
                <CustomForm
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='name'
                    placeholder='John Doe'
                    iconSrc="/assets/icons/user.svg"
                    label="Enter your gull name" />

                <CustomForm
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='email'
                    placeholder='johndoe@gmail.com'
                    iconSrc="/assets/icons/email.svg"
                    label="Enter your email address"
                />

                <CustomForm
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name='phone'
                    label="Phone Number"
                    placeholder='(978) 689 763'
                />
                <SubmitButton isLoading={isLoading}>Get Stated</SubmitButton>
            </form>
        </Form>
    )
}
export default PatientForm

