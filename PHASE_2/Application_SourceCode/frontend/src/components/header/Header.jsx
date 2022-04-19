import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './header.css'
import logo from '../../assets/img/logo.svg';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: '50px'
};

function Header () {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <header id="header-container">
            <div id="header-link">
                <Link to={"/"}>
                    <img id="header-image" src={logo} alt="logo" />
                </Link>
            </div>
            <div id="header-aboutus-container">
                <Link to={"/giveHelp"} className="header-link-obj">
                    <h3 className="header-aboutus">Give Help</h3>
                </Link>
            </div>
            <div id="header-aboutus-container">
                <Link to={"/getHelp"} className="header-link-obj">
                    <h3 className="header-aboutus">Get Help</h3>
                </Link>
            </div>
            <div id="header-aboutus-container">
                <h3 className="header-aboutus" onClick={handleOpen}>About Us</h3>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                        About the team
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        We&apos;re a team of 5 dedicated to connecting and bridging the gap between those who are looking for help and those who want to give help. That&apos;s why we&apos;ve created a platform to centralise this entire experience.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        We hope you enjoy using our site!
                    </Typography>
                    <Typography id="modal-modal-description-1" sx={{ mt: 2, textAlign: 'right' }}>
                        Cheers,
                    </Typography>
                    <Typography id="modal-modal-description-1" sx={{ mt: 0, textAlign: 'right' }}>
                        Jared, Daniel, Jay, Thao and Rex
                    </Typography>
                </Box>
            </Modal>
        </header>
    )
}

export default Header;
