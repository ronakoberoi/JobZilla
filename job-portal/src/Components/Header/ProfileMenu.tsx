import { Menu, Button, Text, Avatar, Switch } from '@mantine/core';
import {
  IconSearch,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';
import { successNotification } from '../../Services/NotificationServices';
import { changeProfile } from '../../Slices/ProfileSlice';

const ProfileMenu=()=> {
    const dispatch=useDispatch();
    const user=useSelector((state:any)=>state.user);
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);
    const handleLogout=()=>{
      dispatch(removeUser());
    }
    const profile=useSelector((state:any)=>state.profile)
  return (
    <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
      <Menu.Target>
        <div className="flex cursor-pointer gap-2 items-center">
                <div>{user.name}</div>
                <Avatar className="bottom-1" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}`:"/Avatar.png"} alt="me" />
            </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=> setOpened(true)}>
        { user?.accountType === "APPLICANT" && 
        (<Link to="/profile"> <Menu.Item leftSection={<IconUserCircle size={14} />}> Profile </Menu.Item> </Link>)
        }
        <Menu.Divider />
        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
        Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;