import { Link } from "react-router-dom"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SchoolIcon from '@mui/icons-material/School';
const pages = ['All Workers', 'Add Worker', 'Home Page'];
const settings = ['Logout'];

function Header() {
  const preventDefault = (event) => event.preventDefault();
  return (<>
    <AppBar position="static">
      <Container class="flexToolBar" maxWidth="xl">
        <Box
          sx={{
            typography: 'body1',
            '& > :not(style) ~ :not(style)': {
              ml: 2,
            },
          }}
          onClick={preventDefault}
        >          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          {<Link class="link" to="/Home Page">Home Page</Link>}
          {<Link class="link" to="/Add Employee">Add Employee</Link>}
          {<Link class="link" to="/All Employees">Employees</Link>}
          {<Link class="link" to="/Add Role"> Add Role</Link>}
        </Box>
      </Container>
    </AppBar>
  </>);
}
export default Header;
