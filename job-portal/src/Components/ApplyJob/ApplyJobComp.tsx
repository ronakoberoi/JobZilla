import { Button, CheckIcon, Divider, FileInput, LoadingOverlay, Notification, NumberInput, rem, Textarea, TextInput } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../Services/Utilities";

const ApplyJobComp = (props: any) => {
    const companyName = props.company ? props.company.toLowerCase() : "default";
  return <div className="w-2/3 mx-auto">    
    <div className="flex justify-between">
        <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
                <img className="h-14" src={`/Icons/${companyName}.png`} alt="" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-semibold text-2xl">{props.jobTitle}</div>
                <div className="text-lg text-mine-shaft-300">{props.company} &bull; {timeAgo(props.postTime)} &bull; 
                {props.applicants?props.applicants.length:0} Applicants</div>
            </div>
        </div>
    </div>
    <Divider my="xl" />
    <ApplicationForm />
    </div>
}

export default ApplyJobComp