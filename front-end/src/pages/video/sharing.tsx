import { FormView, Layout } from "@components";
import { videoSharing } from "@services/video";
import { getError } from "@utils/error";
import { videoSharingValidation } from "@validations/video";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Input } from "semantic-ui-react";

export function SharingPage() {

    const formik = useFormik({
        initialValues: { url: "" },
        validationSchema: videoSharingValidation,
        onSubmit: async (values) => {
            try {
                await videoSharing({
                    data: {
                        url: values.url
                    }
                })
                toast.success("Sharing video success, your video will notify to the others")
                formik.setValues({
                    url: ""
                })
            }
            catch (err) {
                toast.error(getError(err))
            }
        }
    })
    return <Layout
        title="Sharing"
        content="Sharing page"
        className="py-20 flex justify-center items-center"
    >
        <FormView formik={formik} className="">
            <fieldset className="border  !border-gray-300 p-6 w-[350px] sm:w-[500px]">
                <legend className="font-primary text-[20px]">Share a youtube movie</legend>

                <div className="flex flex-col sm:flex-row gap-5 sm:gap-3 ">
                    <span className="translate-y-3 font-primary whitespace-nowrap">Youtube URL:</span>
                    <div className="flex flex-col gap-3 sm:gap-10 w-full">
                        <Input
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            className=" font-primary "
                        />
                        <Button type="submit" className="!bg-youtube-primary !text-white shadow-md hover:grayscale-[20%]">Share</Button>
                    </div>
                </div>
            </fieldset>
        </FormView>
    </Layout>
}