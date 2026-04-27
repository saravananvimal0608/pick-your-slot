"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Fab,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import CallIcon from "@mui/icons-material/Call";
import { FaWhatsapp } from "react-icons/fa";

import EmailIcon from "@mui/icons-material/Email";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import BgImg from "@/Assets/bg-img-4.png";
import pysLogo from "@/Assets/logo2.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(40px) scale(0.95); }
  80% { opacity: 1; transform: translateY(-5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 228, 212, 0.8); }
  70% { box-shadow: 0 0 0 20px rgba(0, 228, 212, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 228, 212, 0); }
`;
const greenPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(9, 166, 66, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const greenFadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: drop-shadow(0 0 10px rgba(37, 211, 102, 0.5));
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: drop-shadow(0 0 0 rgba(37, 211, 102, 0));
  }
`;

const iconBounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const Footer = ({ isHidden }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const pathname = usePathname();

  const addressParts = [
    "Cotyledon Technologies Pvt Ltd",
    "No.11/198 ",
    "Mambakkam - Medavakkam Main Rd,Near Mugavari Eye Hospital",
    "Munusamy Nagar, Medavakkam",
    "Chennai - 600100",
  ];

  const googleMapsUrl = "https://maps.app.goo.gl/FGp6GLS9UoyMCo8x9";

  const theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    palette: {
      primary: {
        main: "#00e4d4",
      },
      secondary: {
        main: "#ffffff",
      },
      text: {
        primary: "#f0f4f8",
        secondary: "#b0c4de",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#f0f4f8",
            lineHeight: 1.8,
            letterSpacing: "0.04em",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#fff",
            background: "rgba(255, 255, 255, 0.08)",
            padding: "12px",
            borderRadius: "12px",
            transition: "all 0.4s ease",
            "&:hover": {
              color: "#9e9efa",
              background: "rgba(0, 228, 212, 0.15)",
              transform: "scale(1.15) rotate(8deg)",
              boxShadow: "0 4px 15px rgba(0, 228, 212, 0.3)",
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            background: "linear-gradient(135deg, #00e4d4 0%, #1e88e5 100%)",
            boxShadow: "0 10px 30px rgba(0, 228, 212, 0.5)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.4s ease",
            "&:hover": {
              boxShadow: "0 15px 40px rgba(0, 228, 212, 0.7)",
              transform: "translateY(-8px) scale(1.1)",
              background: "linear-gradient(135deg, #00e4d4 0%, #42a5f5 100%)",
            },
          },
        },
      },
    },
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY >= 0 ? true : false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const columnHeaderStyle = {
    color: "#fff",
    mb: 5,
    animation: `${fadeInUp} 0.9s ease-out`,
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "-12px",
      left: 0,
      width: "80px",
      height: "5px",
      background: "linear-gradient(90deg, #4741e7 0%, transparent 100%)",
      borderRadius: "8px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          mt: 5,
          position: "relative",
          zIndex: 3,
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={6} // Reduced from 8 to 6
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={3} textAlign="center">
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Image
                  priority
                  src={pysLogo}
                  alt="logo"
                  style={{
                    cursor: "pointer",
                    width: isSmallScreen ? "50%" : "39%",
                    height: "auto",
                  }}
                  onClick={() => router.push("/")}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/pickyourslot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.youtube.com/@pickyourslot4653"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/pickyourslot/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://in.linkedin.com/company/pick-your-slot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h4" fontWeight="700" sx={columnHeaderStyle}>
                Quick Links
              </Typography>
              <Box sx={{ animation: `${fadeInUp} 1.1s ease-out`, mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
                >
                  <Box
                    component="a"
                    href="/listyourbussiness"
                    sx={{
                      textDecoration: "none",
                      color: "#f1f1f1",
                      "&:hover": { color: "#9e9efa" },
                    }}
                  >
                    List your Business
                  </Box>
                  <Box
                    component="a"
                    href="/contact"
                    sx={{
                      textDecoration: "none",
                      color: "#f1f1f1",
                      "&:hover": { color: "#9e9efa" },
                    }}
                  >
                    Contact
                  </Box>
                  <Box
                    component="a"
                    href="/blog"
                    sx={{
                      textDecoration: "none",
                      color: "#f1f1f1",
                      "&:hover": { color: "#9e9efa" },
                    }}
                  >
                    Blog
                  </Box>
                  <Box
                    component="a"
                    href="/terms-of-service"
                    sx={{
                      textDecoration: "none",
                      color: "#f1f1f1",
                      "&:hover": {
                        color: "#9e9efa",
                        textDecoration: "none",
                      },
                    }}
                  >
                    Terms of Service
                  </Box>
                  <Box
                    component="a"
                    href="/privacy-policy"
                    sx={{
                      textDecoration: "none",
                      color: "#f1f1f1",
                      "&:hover": { color: "#9e9efa" },
                    }}
                  >
                    Privacy Policy
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h4" fontWeight="700" sx={columnHeaderStyle}>
                Find Us Here
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  animation: `${fadeInUp} 1.1s ease-out`,
                  "& a": {
                    color: "#f0f4f8",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#9e9efa",
                    },
                  },
                  mt: 3,
                }}
              >
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {addressParts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < addressParts.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h4" fontWeight="700" sx={columnHeaderStyle}>
                Contact
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                mb={5}
                sx={{ animation: `${fadeInUp} 1.1s ease-out`, mt: 3 }}
              >
                <IconButton>
                  <CallIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1">
                  <strong style={{ fontWeight: 600 }}>Call Us</strong> <br />
                  +91 7200008383
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                sx={{ animation: `${fadeInUp} 1.3s ease-out` }}
              >
                <IconButton>
                  <EmailIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="body1">
                  <strong style={{ fontWeight: 600 }}>Send Message</strong>{" "}
                  <br />
                  <a
                    href="mailto:info@pickyourslot.com"
                    style={{ color: "#f0f4f8", textDecoration: "none" }}
                    onMouseOver={(e) => (e.target.style.color = "#9e9efa")}
                    onMouseOut={(e) => (e.target.style.color = "#f0f4f8")}
                  >
                    info@pickyourslot.com
                  </a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            mt={4} // Changed to 0
            py={0.5} // Changed to 0.5
            textAlign="center"
            sx={{
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              animation: `${fadeInUp} 1.5s ease-out`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#b0c4de",
                // lineHeight: 1.2,
                mt: 2,
              }}
            >
              © {currentYear} Cotyledon Technologies Pvt Ltd. All Rights
              Reserved.
            </Typography>
          </Box>
        </Container>
        {showScrollButton && pathname !== "/listyourbussiness" && (
          <Fab
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              zIndex: 1000,
              animation: `${fadeInUp} 0.6s ease-out, ${pulse} 2.5s infinite`,
              background:
                "linear-gradient(90deg, #2545be 0%, #1e3a8a 40%, #0f172a 80%, #020617 100%)",
              color: "#fff",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #1e3a8a 0%, #2545be 50%, #020617 100%)",
                transform: "scale(1.1)",
              },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Fab>
        )}
        {showScrollButton && pathname === "/listyourbussiness" && (
          <Fab
            onClick={() =>
              window.open(
                "https://wa.me/917200008383?text=Hello%20I%20want%20to%20join%20the%20platform",
                "_blank",
              )
            }
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              width: 65,
              height: 65,
              borderRadius: "50%",
              zIndex: 1000,
              background: "#25D366 !important",
              color: "white !important",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.5) !important",
              animation: `${greenFadeInUp} 0.6s ease-out, ${greenPulse} 2.5s infinite`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "#25D366 !important",
                boxShadow: "0 8px 25px rgba(37, 211, 102, 0.6) !important",
                transform: "scale(1.1)",
                "& svg": {
                  animation: `${iconBounce} 0.5s ease`,
                },
              },
              "& svg": {
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
              },
            }}
          >
            <FaWhatsapp size={36} color="white" style={{ display: "block" }} />
          </Fab>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
