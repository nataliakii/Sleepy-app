import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../actions";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ButtonBase,
  Avatar,
  Button,
  Container,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.light,
  fontWeight: 100,
  "&:hover": {
    color: "#bf1650",
    backgroundColor: "transparent",
  },
  "&:active": {
    transition: "0.3s all ",
    transform: "translateY(3px) ",
    border: "1px solid transparent",
    opacity: "0.8 ",
  },
}));

const Nav = ({ user, companyData, pages }) => {
  console.log("name from Nav", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = user;

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOutClick = () => {
    dispatch(signout());
  };

  const renderLinks = () => {
    if (name) {
      return (
        <div sx={{ display: "flex", alignItems: "center" }}>
          <CustomButton component={Link} to="/personal" sx={{ mr: 2 }}>
            Hello, {name}
          </CustomButton>
          <CustomButton onClick={handleSignOutClick}>Sign Out</CustomButton>
        </div>
      );
    }

    return (
      <div sx={{ display: "flex", alignItems: "center" }}>
        <CustomButton component={Link} sx={{ mr: 2 }} to="/signup">
          Sign Up
        </CustomButton>
        <CustomButton component={Link} to="/signin">
          Sign In
        </CustomButton>
      </div>
    );
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "main", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <ButtonBase disableRipple onClick={() => navigate("/")}>
            <Avatar
              alt="Logo"
              sx={{
                borderRadius: "50%",
                backgroundColor: "transparent",
                marginX: 1,
              }}
              src="https://logopond.com/logos/cb08a5e00b38f9f06f1c4f727ebb9900.png"
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: "inherit",
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 100,
                letterSpacing: ".1rem",
              }}
            >
              {companyData.name}
            </Typography>
          </ButtonBase>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                  <CustomButton
                    component={Link}
                    to={page.to}
                    sx={{ color: "text.main", textTransform: "none" }}
                  >
                    <Typography textAlign="center">{page.page}</Typography>
                  </CustomButton>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <CustomButton
                key={page.page}
                component={Link}
                to={page.to}
                sx={{
                  color: "text.light",
                  textTransform: "none",
                  letterSpacing: 0,
                  fontWeight: 400,
                }}
              >
                {page.page}
              </CustomButton>
            ))}
          </Box>

          <div sx={{ display: "flex" }}>{renderLinks()}</div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
