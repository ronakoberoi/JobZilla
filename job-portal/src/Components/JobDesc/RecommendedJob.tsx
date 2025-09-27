import { useParams } from "react-router-dom"
import JobCard from "../FindJobs/JobCard"
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import Job from "./Job";

const RecommendedJobs = () => {
  const {id}=useParams();
   const [jobList, setJobList] =useState<any>(null);
  useEffect(()=>{
    getAllJobs().then((res)=>{
      setJobList(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return <div className="ml-12">
    <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
    <div className="flex flex-col flex-wrap gap-5 justify-between">
        {jobList?.map((talent:any, index:number)=>index<6 && id!=talent.id && <JobCard key={index} {...talent} />)}
    </div>
  </div>
}

export default RecommendedJobs