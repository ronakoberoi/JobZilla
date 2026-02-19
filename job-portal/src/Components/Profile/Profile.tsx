import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import Info from "./Info"
import { changeProfile, setProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certification"
import { useHover } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { successNotification } from "../../Services/NotificationServices"
import { getBase64 } from "../../Services/Utilities"

const Profile = ()=>{
    const dispatch = useDispatch();
    const { hovered, ref } = useHover();
    const handleFileChange= async (image:any)=>{
        let picture:any=await getBase64(image);
        let updatedProfile ={...profile, picture:picture.split(',')[1]};
        dispatch(changeProfile(updatedProfile));
        successNotification("success", "Profile Picture Updated Successfully");
    }
    const profile=useSelector((state:any)=>state.profile)
    return <div className="w-4/5 mx-auto">
        <div className="">
        <div className="relative">
            <img className="rounded-t-2xl w-400 h-40" src="/Profile/banner.jpg" alt="" />
            <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
            <Avatar className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}`:"/Avatar.png"} alt="" />
            {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.70} />}
            {hovered && <IconEdit className="absolute z-[300] !w-12 !h-12" />}
            {hovered && <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full" 
            variant="transparent" accept="image/png,image/jpeg" />} 
            </div>
            </div>
            <div className="px-3 mt-16">
                <Info />
            </div>
        <Divider mx="xs" my="xl" />
        <About />
        <Divider mx="xs" my="xl" />
        <Skills />
        <Divider mx="xs" my="xl" />
        <Experience />
        <Divider mx="xs" my="xl" />
        <Certificate />
        </div>
    </div>
}

export default Profile