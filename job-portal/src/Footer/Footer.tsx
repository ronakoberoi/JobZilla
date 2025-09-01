import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBriefcase2 } from "@tabler/icons-react"
import { footerLinks } from "../Data/Data"
import { useLocation } from "react-router-dom"


const Footer = () => {
    const location = useLocation();
  return location.pathname!+"/signup" && location.pathname!="/login"?<div className="pt-20 bg-mine-shaft-950 font-['poppins'] pb-5 flex gap-5 justify-around">
    <div className="w-1/3 flex flex-col gap-4">
    <div className="flex gap-1 items-center text-bright-sun-400">
            <IconBriefcase2 className="h-10 w-10" stroke={2} />
            <div className="text-3xl mt-2 font-semibold">JobZilla</div>
        </div>
        <div className="text-md text-mine-shaft-300">Job portal with user profiles, skill updates, certifications, work experience and admin job posting</div>
        <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 
        [&>div]:rounded-full cursor-pointer hover:[&>div]:bg-mine-shaft-700">
            <div><IconBrandFacebook /></div>
            <div><IconBrandInstagram /></div>
            <div><IconBrandX /></div>
        </div>
    </div>
    {
        footerLinks.map((item, index) => <div key={index}>
            <div className="text-2xl mt-1 font-semibold mb-4 text-bright-sun-400">{item.title}</div>
            {
                item.links.map((link, index) => <div key={index} className="text-mine-shaft-300 text-md hover:text-bright-sun-400 
                cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">{link}</div>)
            }
        </div>)
    }
  </div>:<></>
}

export default Footer