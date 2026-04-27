"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
  Modal,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { keyframes } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import banner from "@/Assets/banner.svg";
import head1 from "@/Assets/Model-1.png";
import BgImg from "@/Assets/bg-img-4.png";
import qrcode from "@/Assets/pys_qr.jpg";
import andlogo from "@/Assets/playstore.png";
import iphonelogo from "@/Assets/iphone.png";
import alarm from "@/Assets/alarm.png";
import Image from "next/image";
import Categories from "@/component/Home/Categories";
import Offer from "@/component/Home/Offer";
import Proposals from "@/component/Home/Proposals";
import PYSPartners from "@/component/Home/PYSPartners";
import Locations from "@/component/Home/Locations";
import HomePageBlog from "@/component/Home/HomePageBlog";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import schema from "@/lib/schema";
import Testimonials from "@/component/Home/Testimonial";
import DifferentBookings from "@/component/Home/DifferentBookings";
import Antigravity from "@/component/Home/AntiGravity";
import LightRays from "@/component/Home/LightRays";

console.log("heach", head1.src);

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessPopup(true);
    setOpenOrganizerDialog(false);
  };

  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [showMobileOtpField, setShowMobileOtpField] = useState(false);

  const [emailOtp, setEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [showEmailOtpField, setShowEmailOtpField] = useState(false);

  const [openRewardDialog, setOpenRewardDialog] = useState(false);
  const [openOrganizerDialog, setOpenOrganizerDialog] = useState(false);

  const onOpenOrganizerDialog = () => setOpenOrganizerDialog(true);

  const onCloseOrganizerDialog = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenOrganizerDialog(false);
  };

  const onOpenRewardDialog = () => setOpenRewardDialog(true);
  const onCloseRewardDialog = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenRewardDialog(false);
  };

  // Define keyframes for animations
  const fadeInUp = keyframes`
    0% { opacity: 0; transform: translateY(40px) scale(0.95); }
    80% { opacity: 1; transform: translateY(-5px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  `;

  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.8); }
    70% { box-shadow: 0 0 0 15px rgba(96, 165, 250, 0); }
    100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
  `;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const dialogStyles = {
    dialogPaper: {
      borderRadius: "24px",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
      padding: "28px",
      width: "90vw",
      maxWidth: "800px",
      maxHeight: "90vh",
      background:
        "linear-gradient(145deg, #001427 0%, #002870 60%, #004899 100%)",
      color: "white",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    dialogTitle: {
      fontSize: { xs: "28px", sm: "36px" },
      fontWeight: 800,
      textAlign: "left",
      color: "#ffffff",
      pt: 2,
      pb: 1,
      letterSpacing: "0.5px",
      lineHeight: 1.1,
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      position: "relative",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-4px",
        left: 0,
        width: "60px",
        height: "3px",
        background: "linear-gradient(90deg, #00d4ff, #0088ff)",
        borderRadius: "2px",
      },
    },
    qrContainer: {
      width: { xs: 160, sm: 200 },
      height: { xs: 160, sm: 200 },
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
      p: 2,
      position: "relative",
      transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      "&:hover": {
        transform: "scale(1.05) rotate(2deg)",
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Light Rays Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <LightRays />
      </div>

      {/* Antigravity Particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
        }}
      >
        <Antigravity />
      </div>
      <Box
        sx={{
          backgroundColor: "#0a0b1a",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
          },
        }}
      >
        <Modal
          open={successPopup}
          onClose={() => setSuccessPopup(false)}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              background:
                "linear-gradient(145deg, #001427 0%, #002870 60%, #004899 100%)",
              borderRadius: "24px",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
              p: 4,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#00d4ff",
                fontWeight: 700,
                mb: 2,
              }}
            >
              ✅ Successfully Registered!
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: 3,
                fontSize: "16px",
              }}
            >
              Welcome to Pick Your Slot! Your account has been created
              successfully.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setSuccessPopup(false)}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "12px",
                background: "linear-gradient(45deg, #00d4ff, #0088ff)",
                boxShadow: "0 4px 15px rgba(0, 212, 255, 0.4)",
                "&:hover": {
                  background: "linear-gradient(45deg, #00b8e6, #0070cc)",
                  boxShadow: "0 6px 20px rgba(0, 212, 255, 0.6)",
                },
              }}
            >
              Continue to Login
            </Button>
          </Box>
        </Modal>

        {/* Schema Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://pickyourslot.com",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema?.localBusiness),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema?.organization),
          }}
        />

        <NavBar />

        <Box
        // sx={{
        //   background:
        //     "linear-gradient(180deg, rgba(10,11,26,0.8) 0%, rgba(10,11,26,0.4) 100%)",
        // }}
        >
          <Container
            maxWidth="xl"
            sx={{ position: "relative", zIndex: 2, py: { xs: 8, md: 12 } }}
          >
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={6} lg={7}>
                <Box
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    pl: { xs: 0, md: 8 },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                      fontWeight: 900,
                      color: "#ffffff",
                      lineHeight: 1.1,
                      mb: 1,
                      mt: { xs: 6, md: 10 },
                      background: "linear-gradient(90deg, #ffffff, #b3e5fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: `${fadeInUp} 1s ease-out`,
                    }}
                  >
                    Book Local Services Instantly
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                      color: "#e0e0e0",
                      mb: 4,
                      lineHeight: 1.6,
                      maxWidth: "600px",
                      animation: `${fadeInUp} 1.2s ease-out`,
                      animationDelay: "0.2s",
                      animationFillMode: "both",
                    }}
                  >
                    Want to find and book awesome local services? Check out our
                    simple platform where you can easily discover top-rated
                    salons, sports venues, classes, events, and more-all in one
                    place.
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={onOpenRewardDialog}
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "50px",
                      px: 4,
                      py: 1.5,
                      background: "linear-gradient(45deg, #6036d7, #60a5fa)",
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, rgb(79, 27, 222), #3b82f6)",
                        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.7)",
                        border: "1px solid rgba(96, 165, 250, 0.5)",
                        transform: "translateY(-2px) scale(1.05)",
                        animation: `${pulse} 2s infinite ease-in-out`,
                      },
                      "& img": {
                        height: "24px",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover img": {
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    Book Now
                    <Image src={alarm} alt="alarm" style={{ width: "auto" }} />
                  </Button>

                  <Button
                    variant="contained"
                    onClick={onOpenOrganizerDialog}
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "50px",
                      px: 4,
                      py: 1.5,
                      mt: 2,
                      background: "linear-gradient(45deg, #6036d7, #60a5fa)",
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, rgb(79, 27, 222), #3b82f6)",
                        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.7)",
                        border: "1px solid rgba(96, 165, 250, 0.5)",
                        transform: "translateY(-2px) scale(1.05)",
                        animation: `${pulse} 2s infinite ease-in-out`,
                      },
                      "& img": {
                        height: "24px",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover img": {
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    Become an Organizer
                  </Button>
                </Box>
              </Grid>
              {/* Image Content */}
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                sx={{ display: { xs: "block", md: "block" } }}
              >
                <Box
                  sx={{
                    position: "relative",
                    animation: "float 3s ease-in-out infinite",
                    mt: 3,
                    "@keyframes float": {
                      "0%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(20px)" },
                      "100%": { transform: "translateY(0)" },
                    },
                  }}
                >
                  <Image
                    src={head1}
                    alt="Hero Banner"
                    width={500}
                    height={500}
                    style={{
                      width: "100%",
                      height: "auto",
                      filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Dialog
          open={openRewardDialog}
          onClose={onCloseRewardDialog}
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": dialogStyles.dialogPaper,
          }}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <IconButton
              onClick={onCloseRewardDialog}
              aria-label="close dialog"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(4px)",
                width: "36px",
                height: "36px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.24)",
                  transform: "scale(1.08)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogTitle sx={dialogStyles.dialogTitle}>
            A Game Awaits You!
            <Typography
              variant="h5"
              sx={{
                mt: 1,
                fontWeight: 500,
                opacity: 0.9,
                fontSize: { xs: "20px", sm: "24px" },
              }}
            >
              Scan the QR Code
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ padding: "24px 0", overflow: "visible" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 4 },
                gap: { xs: 4, sm: 3 },
              }}
            >
              <Box sx={{ width: { xs: "100%", sm: "55%" } }}>
                <Box component="ul" sx={{ pl: 0, mt: 1 }}>
                  {[
                    "Open your mobile scanner and aim it at the QR code.",
                    "Or download a QR scanner app to proceed.",
                    "Tap the generated link to download the app.",
                  ].map((text, index) => (
                    <Typography
                      key={index}
                      component="li"
                      variant="body1"
                      sx={{
                        color: "#f0f0f0",
                        mb: 2.5,
                        fontSize: "16px",
                        listStyleType: "none",
                        position: "relative",
                        pl: "32px",
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          left: "0",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(0, 212, 255, 0.15)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        "&:after": {
                          content: `"${index + 1}"`,
                          position: "absolute",
                          left: "7px",
                          color: "#00d4ff",
                          fontWeight: "bold",
                          fontSize: "14px",
                        },
                      }}
                    >
                      {text}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: { xs: 4, sm: 5 },
                    mb: 2,
                    justifyContent: { xs: "center", sm: "flex-start" },
                    gap: "20px",
                  }}
                >
                  {[
                    {
                      src: andlogo,
                      alt: "Google Play Store",
                      href: "https://play.google.com/store/apps/details?id=com.pyscustomer&hl=en_IN",
                    },
                    {
                      src: iphonelogo,
                      alt: "Apple App Store",
                      href: "https://apps.apple.com/in/app/pick-your-slot/id1614806838",
                    },
                  ].map((store, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Download from ${store.alt}`}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        padding: "12px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.08)",
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Image
                        src={store.src}
                        alt={store.alt}
                        style={{ width: "36px", height: "36px" }}
                      />
                    </IconButton>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", sm: "45%" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: { xs: 2, sm: 0 },
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(0,136,255,0.05) 50%, rgba(0,0,0,0) 70%)",
                    animation: `${pulse} 2s infinite ease-in-out`,
                  },
                }}
              >
                <Box sx={dialogStyles.qrContainer}>
                  <Image
                    src={qrcode}
                    alt="QR Code"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openOrganizerDialog}
          onClose={onCloseOrganizerDialog}
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": dialogStyles.dialogPaper,
          }}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <IconButton
              onClick={onCloseOrganizerDialog}
              aria-label="close dialog"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(4px)",
                width: "36px",
                height: "36px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.24)",
                  transform: "scale(1.08)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogTitle sx={dialogStyles.dialogTitle}>
            Organizer Registration
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: 400,
                opacity: 0.85,
                fontSize: { xs: "16px", sm: "18px" },
              }}
            >
              Join us and manage your services
            </Typography>
          </DialogTitle>

          <DialogContent
            sx={{
              padding: "24px 32px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "linear-gradient(180deg, #00d4ff, #0088ff)",
                borderRadius: "10px",
                "&:hover": {
                  background: "linear-gradient(180deg, #00b8e6, #0070cc)",
                },
              },
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                }}
              />

              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                margin="normal"
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, mobileNumber: onlyNums });
                }}
                inputProps={{ maxLength: 10 }}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                }}
              />
              {!mobileVerified && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    color: "#00d4ff",
                    borderColor: "#00d4ff",
                    "&:hover": {
                      borderColor: "#00b8e6",
                      backgroundColor: "rgba(0, 212, 255, 0.1)",
                    },
                  }}
                  onClick={() => {
                    // await sendMobileOtpApi();
                    setShowMobileOtpField(true);
                  }}
                >
                  Send OTP
                </Button>
              )}

              {showMobileOtpField && !mobileVerified && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    label="Enter Mobile OTP"
                    margin="normal"
                    value={mobileOtp}
                    onChange={(e) => setMobileOtp(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      mb: 1,
                      background: "linear-gradient(45deg, #00d4ff, #0088ff)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #00b8e6, #0070cc)",
                      },
                    }}
                    onClick={() => {
                      // const res = await verifyMobileOtpApi(mobileOtp);
                      // if (res.success) {
                      setMobileVerified(true);
                      setShowMobileOtpField(false);
                      // }
                    }}
                  >
                    Verify
                  </Button>
                </Box>
              )}

              {mobileVerified && (
                <Typography sx={{ mt: 1, color: "#4ade80", fontSize: "14px" }}>
                  ✅ Mobile Verified
                </Typography>
              )}

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                }}
              />

              {!emailVerified && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    color: "#00d4ff",
                    borderColor: "#00d4ff",
                    "&:hover": {
                      borderColor: "#00b8e6",
                      backgroundColor: "rgba(0, 212, 255, 0.1)",
                    },
                  }}
                  onClick={() => {
                    // await sendEmailOtpApi();
                    setShowEmailOtpField(true);
                  }}
                >
                  Send OTP
                </Button>
              )}

              {showEmailOtpField && !emailVerified && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    label="Enter Email OTP"
                    margin="normal"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      mb: 1,
                      background: "linear-gradient(45deg, #00d4ff, #0088ff)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #00b8e6, #0070cc)",
                      },
                    }}
                    onClick={() => {
                      // const res = await verifyEmailOtpApi(emailOtp);
                      // if (res.success) {
                      setEmailVerified(true);
                      setShowEmailOtpField(false);
                      // }
                    }}
                  >
                    Verify
                  </Button>
                </Box>
              )}

              {emailVerified && (
                <Typography sx={{ mt: 1, color: "#4ade80", fontSize: "14px" }}>
                  ✅ Email Verified
                </Typography>
              )}

              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            "&:hover": { color: "#00d4ff" },
                          }}
                        >
                          {showPassword ? (
                            <RemoveRedEyeIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          "&:hover": { color: "#00d4ff" },
                        }}
                      >
                        {showConfirmPassword ? (
                          <RemoveRedEyeIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00d4ff" },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "12px",
                  background: "linear-gradient(45deg, #00d4ff, #0088ff)",
                  boxShadow: "0 4px 15px rgba(0, 212, 255, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00b8e6, #0070cc)",
                    boxShadow: "0 6px 20px rgba(0, 212, 255, 0.6)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Register as Organizer
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Other Sections */}
        <Categories />
        <Offer />
        {/* <DifferentBookings/> */}
        <Testimonials />
        <Locations />
        <Footer />
      </Box>
    </div>
  );
};

export default Page;
