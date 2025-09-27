import { useEffect, useState } from "react";
import { jobList } from "../../Data/JobsData"
import JobCard from "./JobCard"
import Sort from "./Sort"
import { getAllJobs } from "../../Services/JobService";

const Jobs = () => {
  const [jobList, setJobList] =useState([{}]);
  useEffect(()=>{
    getAllJobs().then((res)=>{
      setJobList(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return <div className="p-5 px-20">
    <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
    </div>
    <div className="mt-10 flex flex-wrap gap-12">
        {
            jobList.map((job, index) => <JobCard key={index} {...job} />)
        }
    </div>
  </div>
}

export default Jobs