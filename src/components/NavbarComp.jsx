import React, { useState } from "react";
import { Nav, Navbar } from 'react-bootstrap';
import { FormControl, Button, Form,} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch}  from '@fortawesome/free-solid-svg-icons';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { FaPuzzlePiece, FaTimes, FaBars, FaHome, FaRegUserCircle,} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import {  RiBrushFill, RiDashboard3Fill } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/Sidenav.scss";



export const Navigationbar = () => {
  const [menuCollapse, setMenuCollapse] = useState(true)
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
  return (
    <nav className="sticky-top"  >
      <Navbar  variant="dark" className=" shadow p-2 bg-white rounded sticky">
        <div collapsed={menuCollapse} className="me-2 fa-x2" onClick={menuIconClick}>
            {menuCollapse ? (<FaBars size="25" />) : (<FaTimes size="25"/>)}
        </div>
        <Navbar.Brand href="/" className="text-dark fw-bold">DIGI</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className=" rounded-pill w-50 d-flex shadow center ms-auto p-1">
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2 bg-transparent border-0"
                  aria-label="Search"
              />
              <Button variant="outline-dark" className="border-0"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></Button>
          </Form>
          <Nav className="ms-auto">
              <Nav.Link href="/" className="text-dark"><FaRegUserCircle size="25"/></Nav.Link>
              <Nav.Link href="/cart" className="text-dark"><GiShoppingCart size="25"/><span className="cartlogo__badge">0</span></Nav.Link>
          </Nav>
          </Navbar.Collapse>    
        </Navbar>
        <div id="header">
        <ProSidebar collapsed={menuCollapse} className="mt-1">
          <SidebarContent >
            <Menu iconShape="square"><MenuItem active={true} icon={<FaHome size={25} />}><a href="/"/>Home</MenuItem>
            <MenuItem icon={<RiDashboard3Fill size='25' />}><a href="/dashboard"/>DashBoard</MenuItem>
              <MenuItem icon={<FaPuzzlePiece size='25' />} ><a href="/exetentions"/>Exetentions</MenuItem>
              <MenuItem icon={<RiBrushFill size='25'/>}>Design</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </nav>
  )
}




