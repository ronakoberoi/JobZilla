import { Avatar, Button, Indicator } from "@mantine/core";
import { IconBriefcase2, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfilesService";
import { setProfile } from "../../Slices/ProfileSlice";

const Header =() => {
    const dispatch = useDispatch();
    const profile = useSelector((state:any)=>state.profile)
    useEffect(()=> {
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
        }).catch((error:any)=>{
        console.log(error);});
    }, [])
    const user=useSelector((state:any)=>state.user)
    const location = useLocation();
    return location.pathname!="/signup" && location.pathname!="/login" ? <div className="w-full font-['poppins'] bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center text-bright-sun-400">
            <IconBriefcase2 className="h-8 w-8" stroke={2} />
            <div className="text-3xl font-semibold">JobZilla</div>
        </Link>
        {NavLinks()}
        <div className="flex gap-3 items-center">
            {user?<ProfileMenu />:<Link to="/login">
            <Button variant="subtle" color="brightSun.4">Login</Button>
            </Link>}
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <IconSettings stroke={1.5} />
            </div> */}
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} />
            </Indicator>
            </div>
        </div>
    </div>:<></>
}

export default Header;