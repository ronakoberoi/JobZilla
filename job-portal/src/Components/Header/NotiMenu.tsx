import { Indicator, Menu, rem, Notification } from "@mantine/core"
import { IconBell, IconCheck, IconUserCircle } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { getNotifications, readNotification } from "../../Services/NotiService";

const NotiMenu = () => {
    const navigate=useNavigate();
    const user=useSelector((state:any)=>state.user);
    const [notifications, setNotifications] = useState<any>([]);
    useEffect(()=>{
        getNotifications(user.id).then((res)=>{
            setNotifications(res);
        }).catch((err)=> console.log(err));
    }, [user])
    const [opened, setOpened] = useState(false);
    const unread = (index:number)=>{
        let notis=[...notifications];
        notis=notis.filter((noti:any, i:number)=>i!=index);
        setNotifications(notis);
        readNotification(notifications[index].id).then((res)=> console.log(res)).catch((err)=> console.log(err));
    }
  return <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <Indicator disabled={notifications.length<=0} color="brightSun.4" size={8} offset={6} processing>
            <IconBell stroke={1.5} />
            </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=> setOpened(true)}>
        <div className="flex flex-col gap-1">
        {
        notifications.map((noti:any, index:number)=> <Notification onClick={()=>{
          navigate(noti.route);
          unread(index);
          setOpened(false);
        }} 
        key={index} onClose={()=>unread(index)} className="hover:bg-mine-shaft-900 cursor-pointer" icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} color="teal"
        title={noti.action} mt="md">{noti.message}</Notification>)
        }
        {
        notifications.length==0 && <div className="text-center text-mine-shaft-300">No New Notifications</div>
        }
        </div>
      </Menu.Dropdown>
    </Menu>
}

export default NotiMenu