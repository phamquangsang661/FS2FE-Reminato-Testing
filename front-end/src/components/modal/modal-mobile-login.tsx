import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { FormView } from "../form";
import { useFormik } from "formik";
import { authSignIn } from "@services/auth";
import { authStore } from "@stores/auth-store";
import toast from "react-hot-toast";
import { getError } from "@utils/error";
import { useFormikErrorSubscribe } from "@hooks";
import { signInValidation } from "@validations/auth";

export interface ModalMobileLogin {
    isOpen?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    className?: string
}

export function ModalMobileLogin({
    className = "",
    isOpen,
    onClose = () => { },
    onOpen = () => { } }: ModalMobileLogin) {
    const { isAuth, setAuth } = authStore();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: signInValidation,
        onSubmit: async (values) => {
            try {
                const res = await authSignIn({ data: values });
                const data = res.data.data;
                setAuth(data.user as UserSimpleInfo);
                toast.success("Sign in success");
                onClose();
                formik.setValues({
                    email: "",
                    password: ""
                })
            } catch (err) {
        
                toast.error(getError(err))
            }
        }
    })
    const { isError } = useFormikErrorSubscribe({ formik })
    if (isAuth) return null

    return <FormView formik={formik} className={` ${className}`}>
        <Modal
            onOpen={onOpen}
            onClose={onClose}
            open={isOpen}
            trigger={<Button type="button" className="!bg-youtube-primary hover:grayscale-[20%] !shadow-lg" icon >
                <Icon size="large" className="text-white" name='meh' />
            </Button>}
        >
            <Modal.Header>Hi there!</Modal.Header>
            <Modal.Content className="!flex justify-center gap-2 items-center flex-col px-5">
                <Input
                    value={formik.values.email}
                    className="font-primary w-full"
                    loading={false}
                    icon='mail'
                    placeholder='email'
                    name="email"
                    onChange={formik.handleChange}
                    iconPosition='left'
                />
                <Input
                    value={formik.values.password}
                    type='password'
                    className="font-primary w-full"
                    loading={false}
                    icon='lock'
                    placeholder='password'
                    name="password"
                    onChange={formik.handleChange}
                    iconPosition='left' />
            </Modal.Content>
            <Modal.Actions className="!flex flex-row gap-2 justify-center items-center">
                <Button type="button" disabled={isError} className="!shadow-md" color='black' onClick={onClose}>
                    Close
                </Button>
                <Button onClick={() => formik.submitForm()} type="submit" className="!bg-youtube-primary !text-white  hover:grayscale-[20%] !shadow-md">Login / Register</Button>
            </Modal.Actions>
        </Modal>
    </FormView>
}