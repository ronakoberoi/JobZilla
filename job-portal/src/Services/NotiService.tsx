import axios from "axios";
import { error } from "console";
const base_url="https://jobzilla-backend.onrender.com/notification/";

const getNotifications = async(id:any)=>{
    return axios.get(`${base_url}get/${id}`)
    .then(result=>result.data)
    .catch(error=>{throw error;})
}

const readNotification = async(id:any)=>{
    return axios.put(`${base_url}read/${id}`)
    .then(result=>result.data)
    .catch(error=>{throw error;})
}
export {getNotifications, readNotification};