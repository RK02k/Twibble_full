import React, { useState } from 'react';
import { SiDoubanread } from 'react-icons/si';
import { FaHome } from 'react-icons/fa';
import SideOption from './SideOption';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { IoMailOutline } from 'react-icons/io5';
import { MdBookmarkBorder } from 'react-icons/md';
import { MdOutlinePermIdentity } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import CustomLink from './CustomLink';
import userLoggedInUser from '../../hooks/userLoggedInUser';
import { CiGlobe } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = userLoggedInUser();
  const { t } = useTranslation();
  const UserProfilePic = loggedInUser[0]?.profileImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosse = () => {
    setAnchorEl(null);
  };

  const result = user[0]?.email.split('@')[0];

  return (
    <div className="sidebar">
      <SiDoubanread className="sidebar__twitterIcon tdm-icon" />
      <CustomLink to="/home/feed">
        <SideOption active Icon={FaHome} text={t('home1')} />
      </CustomLink>
      <CustomLink to="/home/explore">
        <SideOption active Icon={BsLayoutTextSidebar} text={t('Explore')} />
      </CustomLink>
      <CustomLink to="/home/notifications">
        <SideOption active Icon={IoIosNotifications} text={t('Noti')} />
      </CustomLink>
      <CustomLink to="/home/lists">
        <SideOption active Icon={CiGlobe} text={t('Langua')} />
      </CustomLink>
      <CustomLink to="/home/profile">
        <SideOption active Icon={MdOutlinePermIdentity} text={t('Prof')} />
      </CustomLink>
      <CustomLink to="/home/more">
        <SideOption active Icon={IoIosMore} text={t('Mor')} />
      </CustomLink>
      <div className="Profile__info">
        <Avatar src={UserProfilePic} />
        <div className="user_info">
          <h4>{loggedInUser[0]?.name || user[0]?.displayName}</h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClick={handleClosse} onClose={handleClosse}>
          <MenuItem className="Profile_info1">
            <Avatar src={UserProfilePic} />
            <div className="user_info subUser_info">
              <div>
                <h4>{loggedInUser[0]?.name || user[0]?.displayName}</h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done_icon">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClosse}>{t('Add')}</MenuItem>
          <MenuItem onClick={handleLogout}>{t('Log')} @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
