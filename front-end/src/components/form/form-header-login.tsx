import { useFormik } from 'formik'
import { FormView } from './form-view';
import { Button, Input } from 'semantic-ui-react';
import toast from 'react-hot-toast';
import { ToastNotify } from '../toast/toast-notify';

export interface FormHeaderLogin {
    className?: string;
}
export function FormHeaderLogin({ className = "" }: FormHeaderLogin) {
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
             toast.custom((t) => <ToastNotify t={t} />)
            // toast.error("1234")
        }
    })

    return <FormView className={`${className}`} formik={formik}>
        <div className="flex flex-row gap-2">
            <Input
                className="font-primary"
                loading={false}
                icon='mail'
                placeholder='email'
                iconPosition='left'
            />

            <Input
                type='password'
                className="font-primary"
                loading={false}
                icon='lock'
                placeholder='password'
                iconPosition='left' />

            <Button className="!bg-youtube-primary !shadow-md !text-white  hover:grayscale-[20%]">Login / Register</Button>
        </div>
    </FormView>
}