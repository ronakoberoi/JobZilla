import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import Profile from "../Components/TalentProfile/Profile"
import { profile } from "../Data/TalentData"
import RecommendTalent from "../Components/TalentProfile/RecommendTalent"
import { useEffect, useState } from "react"
import { getAllProfiles } from "../Services/ProfilesService"

const TalentProfilePage = () => {
  const navigate = useNavigate();
  const [talents, setTalents]=useState<any[]>([]);
  useEffect(()=>{
    getAllProfiles().then((res)=>{
      setTalents(res);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Button my="sm" onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light">Back</Button>
      <div className="flex gap-20">
        <Profile />
        <RecommendTalent talents={talents} />
        </div>
    </div>
  )
}

export default TalentProfilePage