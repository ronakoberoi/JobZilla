import { ActionIcon } from "@mantine/core"
import { IconCertificate, IconTrash } from "@tabler/icons-react"
import { formatDate } from "../../Services/Utilities"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../Slices/ProfileSlice"
import { successNotification } from "../../Services/NotificationServices"
import { useState } from "react"

const CertiCard = (props:any) => {
    const dispatch=useDispatch();
    const profile=useSelector((state:any)=>state.profile);
    const handleDelete=()=>{
        let certis=[...profile.certifications];
        certis.splice(props.index, 1);
        let updatedProfile={...profile, certifications:certis};
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Certificate Deleted Successfully");
    }
    const [imgError, setImgError] = useState(false);

  return <div className="flex justify-between">
        <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-md flex items-center justify-center">
  {!imgError ? (
    <img
      className="h-7"
      src={`/Icons/${props.issuer}.png`}
      onError={() => setImgError(true)}
      alt=""
    />
  ) : (
    <IconCertificate stroke={1.5} className="h-6 w-6 text-bright-sun-400" />
  )}
</div>


            <div className="flex flex-col">
                <div className="font-semibold">{props.name}</div>
                <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
            </div>
        </div>
        <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
            <div className="text-sm text-mine-shaft-300">{formatDate(props.issueDate)}</div>
            <div className="text-sm text-mine-shaft-300">{props.certificateId}</div>
        </div>
        {props.edit&&<ActionIcon onClick={handleDelete} size="lg" color="red.8" variant="subtle">
        <IconTrash stroke={1.5} className="h-4/5 w-4/5" />
        </ActionIcon>}
        </div>
    </div>
}

export default CertiCard