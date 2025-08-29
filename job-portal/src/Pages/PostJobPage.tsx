import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import Profile from "../TalentProfile/Profile"
import { profile } from "../Data/TalentData"
import RecommendTalent from "../TalentProfile/RecommendTalent"
import PostJob from "../PostJob/PostJob"

const PostJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <PostJob />
    </div>
  )
}

export default PostJobPage