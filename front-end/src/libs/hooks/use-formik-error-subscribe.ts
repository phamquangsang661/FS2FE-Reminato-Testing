/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
export const useFormikErrorSubscribe = <T extends Obj<any>>({
  formik,
}: {
  formik: ReturnType<typeof useFormik<T>>;
}) => {
  const [isError, setIsError] = useState(false);

  //Set error when submit
  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {
      setIsError(true)
      toast.error(formik.errors[Object.keys(formik.errors)[0]]?.toString() ?? "Unknown")
    }
  }, [formik.errors]);


  //reset submit state when typing any input or valid (Try again)
  useEffect(() => {
    setIsError(false)
  }, [formik.values]);


  return {
    isError,
  };
};
