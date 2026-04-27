"use client";

import React, { useState, useRef } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  CssBaseline,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { toast, Toaster } from "sonner";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import emailjs from "@emailjs/browser";

import vendor from "@/Assets/model-3.png";
import Footer from "@/component/Home/Footer";
import NavBar from "@/component/Home/NavBar";
import BgImg from "@/Assets/video-bg.png";

const initialFormData = {
  businessName: "",
  fullName: "",
  mobileNumber: "",
  email: "",
  city: "",
  businessType: "",
  agreeTerms: false,
};

// --- EmailJS Configuration ---
const SERVICE_ID = "service_zsndgpj";
const TEMPLATE_ID = "template_bnjw0xm";
const PUBLIC_KEY = "XbP6UZhBGmE1dzh3U";
// ----------------------------

const ListYourBusinessPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
    },
    palette: {
      primary: {
        main: "#007bff",
        lighter: "#e6f2ff",
        darker: "#0056b3",
      },
      secondary: {
        main: "#6c757d",
      },
      text: {
        primary: "#212529",
        secondary: "#6c757d",
      },
      background: {
        paper: "#ffffff",
        default: "#f4f7f9",
        black: "#000000",
      },
      success: {
        main: "#28a745",
      },
      divider: "rgba(0, 0, 0, 0.12)",
    },
  });

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!formData.agreeTerms) {
      toast.error("Please agree to the Terms and Conditions.");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS environment variables are not set!");
      toast.error("Configuration error. Could not send registration.");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      business_name: formData.businessName,
      full_name: formData.fullName,
      mobile_number: formData.mobileNumber,
      email: formData.email,
      city: formData.city,
      business_type: formData.businessType,
      reply_to: formData.email,
    };
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log("EmailJS SUCCESS!", response.status, response.text);
        toast.success("Registration submitted successfully!");
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("EmailJS FAILED...", error);
        toast.error("Failed to submit registration. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const growFeatures = [
    "Instant Online Presence",
    "Facility Management",
    "Pay-as-You-Go Convenience",
    "Verified & Trusted Platform",
    "Manage Anytime, Anywhere",
    "Business Report",
  ];
  const cities = [
    "Chennai",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Other",
  ];
  const businessTypes = [
    "Spa",
    "Salon",
    "Gym",
    "Badminton",
    "Cricket",
    "Car wash",
    "Martial Arts",
    "Dance",
    "Parlour",
    "Swimming",
    "Other",
  ];

  const phone = "917200008383";
  const message = "I want to register my business on Pick Your Slot.";
  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" richColors />
        <Box
          sx={{
            backgroundImage: `url(${BgImg?.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ py: { xs: 6, md: 8 }, mt: 10, backdropFilter: "blur(5px)" }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: "#fff" }}
                  >
                    Grow Your Business with Us
                  </Typography>
                  <Typography variant="h6" color="#fff" gutterBottom>
                    Get discovered. Get booked. Get growing.
                  </Typography>
                  <Typography variant="body1" color="#fff" sx={{ mb: 4 }}>
                    Bring your services online in minutes. Seamless bookings,
                    smart tools, and flexible management — all in one platform.
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="600"
                    sx={{ mb: 2, color: "#fff" }}
                  >
                    Feature Highlights
                  </Typography>
                  <Grid container spacing={1}>
                    {growFeatures.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <ListItem disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon
                            sx={{
                              minWidth: "auto",
                              mr: 1.5,
                              color: "success.main",
                            }}
                          >
                            <CheckCircleOutlineIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: "body1",
                              color: "#fff",
                            }}
                          />
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ mt: 5, textAlign: { xs: "center", md: "left" } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 5,
                        py: 1.5,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                      }}
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(
                        message
                      )}`}
                      target="_blank"
                    >
                      Join the Platform
                    </Button>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1.5, fontStyle: "italic", color: "#fff" }}
                    >
                      <small>No setup fees. No hassle. Just growth.</small>
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ textAlign: "center", mt: { xs: 4, md: 0 } }}
                >
                  <Image
                    src={vendor}
                    alt="Pick Your Slot Mobile App Preview"
                    width={isSmallScreen ? 300 : 350}
                    height={isSmallScreen ? 450 : 525}
                    priority
                    style={{
                      marginBottom: "10px",
                      marginTop: "-20px",
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
          {/* <Box
            id="registration-form"
            sx={{ py: { xs: 6, md: 8 }, backdropFilter: "blur(5px)" }}
          >
            <Container maxWidth="md">
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                sx={{ color: "#fff" }}
              >
                Register on Pick Your Slot
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                color="#fff"
                sx={{ mb: 4 }}
              >
                Registration now open for Local Services. Please provide the
                following mandatory information.
              </Typography>
              <Box
                ref={formRef}
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                sx={{
                  p: { xs: 3, sm: 4 },
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  textAlign="center"
                  gutterBottom
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: "rgba(230, 242, 255, 0.9)",
                    color: "primary.darker",
                    borderRadius: "8px 8px 0 0",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    fontWeight: 600,
                  }}
                >
                  Registration Now Open For Spas & Salons
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      id="businessName"
                      name="businessName"
                      label="Enter name of your business"
                      placeholder="Eg. Serene Spa, StyleUp Salon"
                      value={formData.businessName}
                      onChange={handleFormChange}
                      variant="outlined"
                      autoComplete="organization"
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      id="fullName"
                      name="fullName"
                      label="Enter your full name"
                      placeholder="Your Full Name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      variant="outlined"
                      autoComplete="name"
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      id="mobileNumber"
                      name="mobileNumber" // Corresponds to {{mobile_number}} in templateParams
                      label="Enter your mobile number"
                      placeholder="+91 Your mobile number"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleFormChange}
                      variant="outlined"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      id="email"
                      name="email"
                      label="Enter your email address"
                      placeholder="abc@example.com"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      variant="outlined"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                    >
                      <InputLabel id="city-select-label">
                        Select city of business
                      </InputLabel>
                      <Select
                        labelId="city-select-label"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        label="Select city of business"
                      >
                        <MenuItem value="" disabled>
                          <em>Where your business located</em>
                        </MenuItem>
                        {cities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                    >
                      <InputLabel id="business-type-select-label">
                        Select type of business
                      </InputLabel>
                      <Select
                        labelId="business-type-select-label"
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleFormChange}
                        label="Select type of business"
                      >
                        <MenuItem value="" disabled>
                          <em>Type of business</em>
                        </MenuItem>
                        {businessTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.agreeTerms}
                          onChange={handleFormChange}
                          name="agreeTerms"
                          color="primary"
                          required
                          disabled={isSubmitting}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          By registering you agree to Pick Your Slot's
                          <MuiLink
                            href="/terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ ml: 0.5 }}
                          >
                            Terms and conditions
                          </MuiLink>
                        </Typography>
                      }
                      sx={{ alignItems: "center" }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={
                        !formData.agreeTerms ||
                        isSubmitting ||
                        !formData.businessName ||
                        !formData.businessType ||
                        !formData.city ||
                        !formData.email ||
                        !formData.fullName ||
                        !formData.mobileNumber
                      }
                      sx={{
                        px: 6,
                        py: 1.5,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                        position: "relative",
                      }}
                    >
                      {isSubmitting ? "Registering..." : "Register Now"}
                      {isSubmitting && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: theme.palette.primary.contrastText,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                          }}
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box> */}
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default ListYourBusinessPage;
