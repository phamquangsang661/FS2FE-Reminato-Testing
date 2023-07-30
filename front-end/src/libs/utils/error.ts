import { AxiosError } from 'axios';
import _ from 'lodash'
export function getError(err:unknown){
    if(err instanceof AxiosError){
       return  err.response?.data?.message?? err?.message??"Unknown error"
    }else
    if(err instanceof Error){
        return err.message;
    }else if(_.isObject(err)) 
    return JSON.stringify(err);
        else return err?.toString()??"Unknown error"
}