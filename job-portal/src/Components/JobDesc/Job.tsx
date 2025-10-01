import { ActionIcon, Button, Divider } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card} from "../../Data/JobDescData"
// @ts-ignore
import DOMPurify from 'dompurify';
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationServices";

const Job = (props:any) => {
    const dispatch = useDispatch();
    const [applied, setApplied] = useState(false);
    const profile=useSelector((state:any)=>state.profile);
    const user=useSelector((state:any)=>state.user);
    const handleSaveJob=()=>{
        let savedJobs:any=[...(profile.savedJobs || [])];
        if(savedJobs?.includes(props.id)){
            savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
        } else{
            savedJobs=[...savedJobs, props.id];
        }
        let updatedProfile={...profile, savedJobs:savedJobs};
        dispatch(changeProfile(updatedProfile));
    }
    useEffect(()=>{
        if(props.applicants?.filter((applicant:any)=>applicant.applicantId==user.id).length>0){
            setApplied(true);
        } else{
            setApplied(false);
        }
    }, [props])
    const handleClose=()=>{
        postJob({...props, jobStatus:"CLOSED"}).then((res)=>{
            successNotification("SUCCESS", "Job Closed Successfully");
        }).catch((err)=>{
            errorNotification("ERROR", err.response.data.errorMessage);
        })
    }
  const data =DOMPurify.sanitize(props.description);
  return <div className="w-2/3">
    <div className="flex justify-between">
        <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-14" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-semibold text-2xl">{props.jobTitle}</div>
                <div className="text-lg text-mine-shaft-300">{props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants?props.applicants.length:0} Applicants</div>
            </div>
        </div>
        <div className="flex flex-col mt-4 gap-2 items-center">
            {(props.edit || !applied)&&<Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
            <Button size="sm" variant="light" color="brightSun.4">{props.closed?"ReOpen":props.edit?"Edit":"Apply"}</Button>
            </Link>}
            {!props.edit && applied&&<Button size="sm" variant="light" color="green.8">Applied</Button>}
            {props.edit && !props.closed ? <Button color="red.5" onClick={handleClose} size="sm" variant="outline">Close</Button>: profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} stroke={1.5} className="text-bright-sun-400 cursor-pointer"/>:<IconBookmark onClick={handleSaveJob} stroke={1.5} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"/>}
        </div>
    </div>
    <Divider size="xs" my="xl" />
    <div className="flex justify-between">
        {
            card.map((item, index)=> <div key={index} className="flex flex-col gap-1 items-center">
            <ActionIcon color="brightSun.4" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
                <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">{props?props[item.id]:"NA"}{item.id==="packageOffered"&& <>LPA</>}</div>
        </div>)
        }
    </div>
    <Divider my="xl" />
    <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
            {
                props.skillsRequired?.map((skill:any, index:number)=> <ActionIcon key={index} color="brightSun.4" className="!h-fit !text-sm !w-fit font-medium" 
                p="xs" variant="light" radius="xl" aria-label="Settings">{skill}
            </ActionIcon>)
            }
        </div>
    </div>
    <Divider my="xl" />
    <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 
    [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1
    [&_p]:text-justify" dangerouslySetInnerHTML={{__html:data}}>
    </div>
    <Divider my="xl" />
    <div>
        <div className="text-xl font-semibold mb-5">About The Company</div>
        <div className="flex justify-between mb-3">
        <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
            </div>
            <div className="flex flex-col">
                <div className="font-medium text-lg">{props.company}</div>
                <div className="text-mine-shaft-300"> 10K+ Employees</div>
            </div>
            </div>
            <Link to={`/company/${props.company}`}>
            <Button variant="light" color="brightSun.4">Company Page</Button>
            </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quod earum nihil facilis omnis natus repellat cumque aut, ab laboriosam fugit voluptates
             non dolorem. Reprehenderit id libero totam quidem molestiae voluptatem recusandae dolore repudiandae,
            fugiat voluptatibus quaerat velit expedita vitae.</div>
    </div>
  </div>
}

export default Job