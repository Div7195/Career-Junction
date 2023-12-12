import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
const drawerWidth = 240;
export default function CompanySidebar() {
    return(
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor:"#131c30",
            color:"white",
            
          }
        }}
        
        variant="permanent"
        anchor="left"
      >
      <Box display='flex' justifyContent='center' height='50px' marginTop='15px'  style= {{fontSize:'25px', cursor : 'pointer'}}>Career Junction</Box>
      
        
        
      <Divider style={{backgroundColor:'#00ecff'}} />
        <List>
          {["Create new opening", "Your openings"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton >
                <ListItemIcon style={{ color: '#00ecff' }} >
                  {index % 2 === 0 ? <AddCircleIcon /> : <WorkIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider style={{backgroundColor:'#00ecff'}} />
        <List>
          {["Search people", "Search companies"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: '#00ecff' }}>
                  {index % 2 === 0 ? <PeopleIcon /> : <BusinessIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
}