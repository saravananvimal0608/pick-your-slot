"use client";
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  TextField,
  Button,
} from "@mui/material";
import swal from "sweetalert";
import { motion } from "framer-motion";
// import { Helmet } from 'react-helmet';
import BgImg from "@/Assets/video-bg.png";
import contact from "@/Assets/contact.png";
import Link from "next/link";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import NewsletterSection from "@/component/LandingPage/NewsletterSection";
import Image from "next/image";
import schema from "@/lib/schema";
import { instance } from "@/controller/common";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [query, setQuery] = useState("");

  const handleNameChange = (e) => {
    // Remove leading space
    const value = e.target.value.replace(/^\s+/g, "");
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Validate email format and log the result
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value) && value !== "") {
      console.log("Invalid email format");
    }
  };

  const handleMobileChange = (e) => {
    // Only allow numbers and exactly 10 digits
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const createEnroll = async () => {
    if (name && email && mobile && organizationName && query) {
      try {
        const response = await instance.post(
          `/service/rest/reports/createEnroll`,
          {
            name,
            email,
            mobile,
            organizationName,
            query,
          }
        );
        if (response.status === 200) {
          swal("Enroll has been Send!", "success");
          setName("");
          setEmail("");
          setMobile("");
          setOrganizationName("");
          setQuery("");
        }
      } catch (e) {
        swal({
          title: `Something went wrong!`,
          text: "Please check all the fields!",
          icon: "error",
          dangerMode: true,
        });
      }
    } else {
      swal({
        title: `Something went wrong!`,
        text: "Please check all the fields!",
        icon: "error",
        dangerMode: true,
      });
    }
  };
  return (
    <>
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
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: "https://pickyourslot.com/contact",
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
        sx={{
          py: 8,
          backgroundImage: `url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                py={2}
                textAlign="center"
                sx={{
                  backgroundImage: `url(${BgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "30vh",
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  fontWeight={900}
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 900,
                color: "#fff",
                textShadow: "0 6px 20px rgba(0,0,0,0.6)",
                mb: 2,
                letterSpacing: "-0.02em",
                backgroundImage: "linear-gradient(135deg, #ffffff 20%, #81d4fa 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
                >
                  Contact Us
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 3,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  <Link
                    href="/"
                    style={{
                      color: "#a1a1ff",
                      textDecoration: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                      },
                    }}
                  >
                    Home
                    </Link>{" "}
                / <span style={{ color: "#fff", fontWeight: 500 }}>Contact</span>
              </Typography>
              </Box>
            </motion.div>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="center"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* Image section */}
            <Grid item lg={5} md={5} xs={12}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Box
                  sx={{
                    "& img": {
                      maxWidth: "100%",
                      height: "auto",
                    },
                  }}
                >
                  <Image src={contact} alt="Contact" />
                </Box>
              </motion.div>
            </Grid>

            {/* Form section */}
            <Grid item lg={7} md={7} xs={12}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Box
                  sx={{
                    backgroundColor: "#211d2e",
                    p: 4,
                    borderRadius: "12px",
                    boxShadow: 3,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {/* <form> */}
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleNameChange}
                    value={name}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      input: { color: "#fff" },
                      label: { color: "#ddd" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#ddd",
                        "&.Mui-focused": { color: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleEmailChange}
                    value={email}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      input: { color: "#fff" },
                      label: { color: "#ddd" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#ddd",
                        "&.Mui-focused": { color: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={handleMobileChange}
                    value={mobile}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      input: { color: "#fff" },
                      label: { color: "#ddd" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#ddd",
                        "&.Mui-focused": { color: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Shop Name"
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={(e) => setOrganizationName(e.target.value)}
                    value={organizationName}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      input: { color: "#fff" },
                      label: { color: "#ddd" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#ddd",
                        "&.Mui-focused": { color: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Enter Query"
                    multiline
                    rows={4}
                    variant="outlined"
                    margin="normal"
                    required
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      "& .MuiInputBase-input": { color: "#fff" }, // Ensures input text color is white
                      "& .MuiInputLabel-root": {
                        color: "#ddd",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#ddd" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />

                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                      onClick={createEnroll}
                      sx={{
                        mt: 3,
                        mb: 3,
                        bgcolor: "white",
                        color: "black",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.9)",
                        },
                        py: 1.5,
                        textTransform: "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                  {/* </form> */}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <br />
        {/* <NewsletterSection /> */}
      </Box>
      <Footer />
    </>
  );
};

export default Contact;
