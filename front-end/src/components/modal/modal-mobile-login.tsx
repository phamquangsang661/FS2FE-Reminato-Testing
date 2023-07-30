import { Button, Icon, Input, Modal } from "semantic-ui-react";
import { FormView } from "../form";
import { useFormik } from "formik";

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
    const formik = useFormik({
        initialValues: {},
        onSubmit: () => {

        }
    })

    return <FormView formik={formik} className={` ${className}`}>
        <Modal
            onOpen={onOpen}
            onClose={onClose}
            open={isOpen}
            trigger={<Button className="!bg-youtube-primary hover:grayscale-[20%] !shadow-lg" icon >
                <Icon size="large" className="text-white" name='meh' />
            </Button>}
        >
            <Modal.Header>Hi there!</Modal.Header>
            <Modal.Content className="!flex justify-center gap-2 items-center flex-col px-5">
                <Input
                    className="font-primary w-full"
                    loading={false}
                    icon='mail'
                    placeholder='email'
                    iconPosition='left'
                />
                <Input
                    type='password'
                    className="font-primary w-full"
                    loading={false}
                    icon='lock'
                    placeholder='password'
                    iconPosition='left' />
            </Modal.Content>
            <Modal.Actions className="!flex flex-row gap-2 justify-center items-center">
                <Button className="!shadow-md" color='black' onClick={onClose}>
                    Close
                </Button>
                <Button className="!bg-youtube-primary !text-white  hover:grayscale-[20%] !shadow-md">Login / Register</Button>
            </Modal.Actions>
        </Modal>
    </FormView>
}