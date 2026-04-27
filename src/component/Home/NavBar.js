"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import logo from "@/Assets/logo.png";
import vendorLogo from "@/Assets/vendorLogo.png";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "@/controller/common";
import { usePathname } from "next/navigation";

import { styled } from "@mui/system";

const NavBar = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLightMode = theme.palette.mode === "light";

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };


  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  const currentLogo = pathname === "/listyourbussiness" ? vendorLogo : logo;

  const logoHeight =
    currentLogo === vendorLogo
      ? isDesktop
        ? "60px"
        : "60px"
      : isDesktop
        ? "60px"
        : "60px";

  const backgroundColor = isLightMode
    ? "#000000"
    : scroll
      ? "black"
      : "transparent";

  const serviceItems = [
    { label: "Membership", path: "/membership" },
    { label: "Course", path: "/course" },
    { label: "Bulk Booking", path: "/bulkbooking" },
    { label: "Venue", path: "/venue" },
    { label: "Pass", path: "/pass" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={scroll ? 4 : 0}
        sx={{
          transition: "0.3s ease-in-out",
          // background: backgroundColor,
          boxShadow: scroll ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
          borderBottom: isLightMode
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.1)",
          "& .MuiButton-root, & .MuiIconButton-root, & .MuiTypography-root": {
            color: isLightMode ? "#ffffff" : "#ffffff",
          },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-start" },
              marginTop: "10px",
            }}
          >
            <Link href="/">
              <Image
                priority
                src={currentLogo}
                alt="Logo"
                style={{
                  height: logoHeight,
                  width: "auto",
                  marginLeft: "10px",
                  marginTop: "10px",
                  transition: "height 0.3s ease-in-out",
                }}
              />
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {[
              { label: "Who we are", path: "/about" },
              { label: "Venue", path: "/venue" },
            ].map(({ label, path }, index) => (
              <Link key={index} href={path} passHref>
                <Button
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 500,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&:hover": {
                      color: "#2870f9",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
            <Link href="/services" passHref>
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#2870f9",
                    transform: "scale(1.1)",
                  },
                }}
              >
                Services
              </Button>
            </Link>
            <Link href={signIn} passHref>
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    color: "#2870f9",
                    transform: "scale(1.1)",
                  },
                }}
              >
                Login/Sign up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: isLightMode
              ? "#000000"
              : "linear-gradient(180deg, #211d2e 0%, #1a1725 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "2px 0 15px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box
          sx={{
            width: 260,
            background: "transparent",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "15px 15px 10px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#2870f9",
                  transform: "rotate(90deg)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "20px 16px",
              flexGrow: 1,
            }}
          >
            {[
              { label: "Who we are", path: "/about" },
              { label: "Venue", path: "/venue" },
            ].map(({ label, path }, index) => (
              <Link key={index} href={path} passHref>
                <Button
                  fullWidth
                  sx={{
                    color: "#ffffff",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    fontFamily: "Poppins, sans-serif",
                    justifyContent: "flex-start",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#2870f9",
                      backgroundColor: isLightMode
                        ? "rgba(40, 112, 249, 0.1)"
                        : "rgba(255, 255, 255, 0.05)",
                      transform: "translateX(5px)",
                      boxShadow: "0 2px 10px rgba(40, 112, 249, 0.2)",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
            <Button
              fullWidth
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "1.1rem",
                fontFamily: "Poppins, sans-serif",
                justifyContent: "flex-start",
                padding: "12px 20px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#2870f9",
                  backgroundColor: isLightMode ? "rgba(40, 112, 249, 0.1)" : "rgba(255, 255, 255, 0.05)",
                  transform: "translateX(5px)",
                  boxShadow: "0 2px 10px rgba(40, 112, 249, 0.2)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={toggleMobileServices}
            >
              Services
              {mobileServicesOpen ? <ExpandLessIcon sx={{ ml: 1 }} /> : <ExpandMoreIcon sx={{ ml: 1 }} />}
            </Button>
            <Collapse in={mobileServicesOpen}>
              <List sx={{ pl: 2 }}>
                {serviceItems.map(({ label, path }, index) => (
                  <Link key={index} href={path} passHref>
                    <Button
                      fullWidth
                      sx={{
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: 400,
                        fontSize: "1rem",
                        fontFamily: "Poppins, sans-serif",
                        justifyContent: "flex-start",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "#2870f9",
                          backgroundColor: isLightMode ? "rgba(40, 112, 249, 0.1)" : "rgba(255, 255, 255, 0.05)",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      {label}
                    </Button>
                  </Link>
                ))}
              </List>
            </Collapse>
            <Link href={signIn} passHref>
              <Button
                fullWidth
                sx={{
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins, sans-serif",
                  justifyContent: "flex-start",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#2870f9",
                    backgroundColor: isLightMode
                      ? "rgba(40, 112, 249, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                    transform: "translateX(5px)",
                    boxShadow: "0 2px 10px rgba(40, 112, 249, 0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                Login/Sign up
              </Button>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
