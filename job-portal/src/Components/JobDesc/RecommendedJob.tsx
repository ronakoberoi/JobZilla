import { jobList } from "../../Data/JobsData"
import JobCard from "../FindJobs/JobCard"

const RecommendedJobs = () => {
  return <div className="ml-12">
    <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
    <div className="flex flex-col flex-wrap gap-5 justify-between">
        {jobList.map((talent, index)=>index<6 && <JobCard key={index} {...talent} />)}
    </div>
  </div>
}

export default RecommendedJobs