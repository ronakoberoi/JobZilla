import { useEffect, useState } from "react";
import { talents } from "../../Data/TalentData"
import TalentCard from "./TalentCard"
import { getAllProfiles } from "../../Services/ProfilesService";
import Sort from "../FindJobs/Sort";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { IconSearchOff } from "@tabler/icons-react";
import { Card } from "@mantine/core";


const Talents = () => {
  const dispatch=useDispatch();
  const [talents, setTalents]= useState<any>([]);
  const filter=useSelector((stae:any)=>stae.filter);
  const sort=useSelector((state:any)=>state.sort);
  const [filteredTalents, setFilteredTalents]=useState<any>([]);
  const user = useSelector((state:any)=>state.user);
  useEffect(()=>{
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllProfiles().then((res)=>{
      const onlyApplicants = res.filter((p:any)=>
      p.accountType === "APPLICANT"
    );
    setTalents(onlyApplicants);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  useEffect(()=>{
    if(sort==="Experience: Low to High"){
      setTalents([...talents].sort((a:any,b:any)=>a.totalExp-b.totalExp));
    }
    else if(sort==="Experience: High to Low"){
      setTalents([...talents].sort((a:any,b:any)=>b.totalExp-a.totalExp));
    }
  }, [sort])
  useEffect(()=>{
    let filterTalent=talents;
    if(filter.name)filterTalent=filterTalent.filter((talent:any)=>talent.name.toLowerCase().includes(filter.name.toLowerCase()));
    if(filter["Job Title"] && filter["Job Title"].length>0){
      filterTalent=filterTalent.filter((talent:any)=>filter["Job Title"]?.some((title:any)=>talent.jobTitle.toLowerCase().includes(title.toLowerCase())));
    }
    if(filter.Location && filter.Location.length>0){
      filterTalent=filterTalent.filter((talent:any)=>filter.Location?.some((location:any)=>talent.location.toLowerCase().includes(location.toLowerCase())));
    }
    if(filter.Skills && filter.Skills.length>0){
      filterTalent=filterTalent.filter((talent:any)=>filter.Skills?.some((skill:any)=>talent.skills?.some((talentSkill:any)=>talentSkill.toLowerCase().includes(skill.toLowerCase()))));
    }
    if(filter.exp && filter.exp.length>0){
      filterTalent=filterTalent.filter((talent:any)=>filter.exp[0]<=talent.totalExp && talent.totalExp<=filter.exp[1]);
    }
    setFilteredTalents(filterTalent);
  }, [filter, talents])
  return <div className="p-5 px-20">
    <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort />
    </div>
    <div className="mt-10 flex flex-wrap gap-5 justify-between">
        {
            filteredTalents?.length?filteredTalents.map((talent:any, index:any)=>
            <TalentCard key={index} {...talent} />):
            <div className="w-full py-14 flex flex-col items-center justify-center bg-mine-shaft-950">
            <IconSearchOff size={60} className="text-bright-sun-400 mb-5" />
            <div className="text-2xl font-semibold text-mine-shaft-100 mb-2">No Talents Found</div>
            <div className="text-mine-shaft-400 text-sm text-center max-w-md">We couldn’t find any talents matching your filters.Try adjusting your search criteria.</div>
            </div>
        }
    </div>
  </div>
}

export default Talents