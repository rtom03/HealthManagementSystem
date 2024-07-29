"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, } from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { parseStringify } from "@/lib/utils"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { Select, SelectItem } from "../ui/select"
import Image from "next/image"




const RegisterForm = ({ user }: { user: User }) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header"> Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself</p>
                </section>
                <section className="mb-12 space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>Personal information</h2>

                    </div>
                </section>
                <CustomForm
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='name'
                    placeholder='John Doe'
                    iconSrc="/assets/icons/user.svg"
                    label="Full Name" />

                <div className="flex flex-col gap-6 xl:flex-row">
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
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name='DateOfBirth'
                        // placeholder='MM/DD/YYYY'
                        label="Date Of Birth"
                    />

                    <CustomForm
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name='gender'
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option}
                                            />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='address'
                        placeholder='14th street, New York'
                        label="Address" />

                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='occupation'
                        placeholder='profession/work'
                        label="Occupation"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='emergencyContactName'
                        placeholder="Guardian's name"
                        label="Emergency contact name" />

                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='emergencyContactNumber'
                        placeholder='(333) 232-1232'
                        label="Emergency contact number"
                    />
                </div>
                <section className="mb-12 space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>Medical information</h2>
                    </div>
                </section>
                <CustomForm
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name='primaryPhysician'
                    placeholder="select a physician"
                    label="Primary Physician">
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    alt="docs"
                                    height={32}
                                    width={32}
                                    className="rounded-full border border-dark-500"

                                />
                                <p>{doctor.name}</p>

                            </div>
                        </SelectItem>
                    ))}
                </CustomForm>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='insuranceProvider'
                        placeholder="BlueCross BlueShield"
                        label="Insurance Provider" />

                    <CustomForm
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='insurancePolicyNumber'
                        placeholder='ABC29476381'
                        label="Insurance policy number"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='allergies'
                        placeholder="Peanuts, Penicillin"
                        label="Allergies (if any)" />

                    <CustomForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='currentMedication'
                        placeholder='Ibuprofen 200mg, Paracetamol'
                        label="Current Medication"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='familyMedicalHistory'
                        placeholder="Mother diabetes, and Father had brain tumor"
                        label="Family Medical History" />

                    <CustomForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='pastMedicalHistory'
                        placeholder='Appendectomy,Tonsillectomy'
                        label="Past Medication History"
                    />
                </div>
                <section className="mb-12 space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className='sub-header'>Identification and Verification</h2>
                    </div>
                </section>

                <SubmitButton isLoading={isLoading}>Get Stated</SubmitButton>
            </form>
        </Form>
    )
}
export default RegisterForm

