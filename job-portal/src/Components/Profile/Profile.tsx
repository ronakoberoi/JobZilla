import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core"
import { IconDeviceFloppy, IconPencil, IconPlus } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./CertiCard"
import { useEffect, useState } from "react"
import ExpInput from "./ExpInput"
import CertiInput from "./CertiInput"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../../Services/ProfilesService"
import Info from "./Info"
import { setProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"

const Profile = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.user)
    const profile=useSelector((state:any)=>state.profile)
    const [edit, setEdit] = useState([false, false, false, false, false,]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const [about, setAbout] = useState('As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experience. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation.My goal is to create impactfull software that enhances productivity and meets user need effectively.')
    const handleEdit = (index:any) =>{
        const newEdit=[...edit];
        newEdit[index]=!newEdit[index];
        setEdit(newEdit);
    }
    useEffect(()=> {
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
        console.log(error);});
    }, [])
    const [skills, setSkills] = useState(["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Figma", "Swetch", "Decker", "AWS"]);
    return <div className="w-4/5 mx-auto">
        <div className="relative">
            <img className="rounded-t-2xl w-400 h-40" src="/Profile/Banner.jpg" alt="" />
            <img className="w-32 h-32 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/avatar.png" alt="" />
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
        <div className="px-3">
            <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications
                <div className="flex gap-2">
                <ActionIcon onClick={()=> setAddCerti(true)} size="lg" color="brightSun.4" variant="subtle"><IconPlus className="h-4/5 w-4/5" />
                </ActionIcon>
                    <ActionIcon onClick={()=> handleEdit(4)} size="lg" color="brightSun.4" variant="subtle">
                        {edit[4]?<IconDeviceFloppy className="h-4/5 w-4/5" /> :<IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon></div>
            </div>
            <div className="flex flex-col gap-8">
            {
                profile?.certifications?.map((certi:any, index:any)=><CertiCard edit={edit[4]} key={index} {...certi} />)
            }
            {
                addCerti&&<CertiInput setEdit={setAddCerti}/>
            }
            </div>
        </div>
    </div>
}

export default Profile