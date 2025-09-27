import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import ApplyJobComp from "../Components/ApplyJob/ApplyJobComp"

const ApplyJobPage = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <Button my="md" leftSection={<IconArrowLeft size={20} />} color="brightSun.4" onClick={()=>navigate(-1)} variant="light">Back</Button>
        <ApplyJobComp />
    </div>
  )
}

export default ApplyJobPage
