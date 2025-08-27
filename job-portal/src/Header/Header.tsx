import { Avatar, Indicator } from "@mantine/core";
import { IconBriefcase2, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

const Header =() => {
    return <div className="w-full font-['poppins'] bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center text-bright-sun-400">
            <IconBriefcase2 className="h-8 w-8" stroke={2} />
            <div className="text-3xl font-semibold">JobZilla</div>
        </Link>
        {NavLinks()}
        <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center">
                <div>Ronak</div>
                <Avatar className="bottom-1" src="maleavtar.webp" alt="me" />
            </div>
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <IconSettings stroke={1.5} />
            </div>
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <Indicator color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} />
            </Indicator>
            </div>
        </div>
    </div>
}

export default Header;