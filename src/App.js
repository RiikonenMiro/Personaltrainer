import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { useState } from 'react';


function App() {
  const [value, setValue] = useState('customerlist')

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Drawer 
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Typography variant="h4" align="center" style={{ marginTop: '10px' }}>Menu</Typography>
          </Toolbar>
          <Divider />
          <List>
            <ListItem>
              <Button variant="contained" onClick={() => setValue("customerlist")} color="primary">Customers</Button>
            </ListItem>
            <ListItem>
            <Button variant="contained" onClick={() => setValue("traininglist")} color="primary">Traininglist</Button>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        
      </Box>
      {value === 'customerlist' && <Customerlist />}
      {value === 'traininglist' && <Traininglist />}
    </div>
  );
}

export default App;
