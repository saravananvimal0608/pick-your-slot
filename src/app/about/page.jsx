"use client";
import React from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import mobileView from "@/Assets/mobile3.png";
import BgImg from "@/Assets/video-bg.png";
import Link from "next/link";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import Image from "next/image";
import schema from "@/lib/schema";

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
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
              { "@type": "ListItem", position: 1, name: "Home", item: "https://pickyourslot.com" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://pickyourslot.com/about" },
            ],
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema?.localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema?.organization) }} />

      <NavBar />
      <Box
        sx={{
          pt: { xs: 10, md: 12 },
          pb: 16,
          backgroundImage: `url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))",
            zIndex: 1,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Box
            py={{ xs: 4, md: 6 }}
            textAlign="center"
            sx={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.9), transparent)",
              color: "#fff",
              minHeight: { xs: "30vh", md: "40vh" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
            Who We Are
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Link href="/" style={{ color: "#a1a1ff", textDecoration: "none", "&:hover": { color: "#fff" } }}>
                Home
              </Link>{" "}
              / <span>About</span>
            </Typography>
          </Box>

          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center" sx={{ mt: { xs: 4, md: 2 } }}>
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                    <Image
                      priority
                      src={mobileView}
                      alt="Pick Your Slot Mobile App Preview"
                      style={{
                        width: "100%",
                        maxWidth: isMobile ? "300px" : "500px",
                        height: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.3))",
                      }}
                    />
                  </motion.div>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <motion.div {...fadeInUp}>
                  <Box
                    sx={{
                      background: "rgba(25, 22, 36, 0.9)",
                      p: { xs: 3, md: 5 },
                      borderRadius: "24px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.8rem", md: "2.8rem" },
                        background: "linear-gradient(90deg, #ffffff, #a1a1ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      About Pick Your Slot
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        mt: 2,
                        lineHeight: 1.8,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                      }}
                    >
                      At Pick Your Slot, we’re transforming how business and customers connect with a seamless, all-in-one platform. Easily discover and book services while businesses expand their global reach.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        mt: 2,
                        lineHeight: 1.8,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                      }}
                    >
                      Our mission is to simplify bookings, enhance accessibility, and empower providers in fitness, sports, and more with tools to manage schedules, boost sales, and satisfy clients.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
            <Box sx={{ mt: { xs: 8, md: 12 }, textAlign: "center" }}>
              <motion.div {...fadeInUp}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "3.2rem" },
                    mb: 4,
                    background: "linear-gradient(90deg, #ffffff, #a1a1ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  How It Works For Customers
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.7,
                    maxWidth: "850px",
                    mx: "auto",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  <b>Explore Services:</b> Find fitness, salon, and sports options nearby with ease.<br />
                  <b>Book Instantly:</b> Pick your time, check availability, and reserve your spot in seconds.<br />
                  <b>Manage Bookings:</b> Adjust or cancel bookings with ease, plus get timely reminders.
                </Typography>
              </motion.div>

              <Grid container spacing={4} sx={{ mt: 6 }}>
                {[
                  {
                    number: "01",
                    title: "Create Account",
                    description: "Sign up quickly to personalize your experience and set preferences.",
                  },
                  {
                    number: "02",
                    title: "Post Your Business",
                    description: "List your services and slots effortlessly after joining.",
                  },
                  {
                    number: "03",
                    title: "Book & Grow",
                    description: "See clients book instantly, growing your reach and profits.",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #1e1e3a, #3b008a)",
                          p: { xs: 3, md: 4 },
                          borderRadius: "20px",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                          color: "#fff",
                          minHeight: "280px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          "&:hover": {
                            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                            background: "linear-gradient(135deg, #2a2a50, #4b00b0)",
                          },
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            color: "#a1a1ff",
                          }}
                        >
                          {item.number}
                          <Box sx={{ flexGrow: 1, height: "2px", bgcolor: "rgba(255, 255, 255, 0.25)", mx: 2 }} />
                          <Box
                            sx={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              bgcolor: "#fff",
                              position: "relative",
                              "&:after": {
                                content: '""',
                                position: "absolute",
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                bgcolor: "#3b008a",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              },
                            }}
                          />
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mt: 3,
                            fontSize: { xs: "1.2rem", md: "1.5rem" },
                            color: "#fff",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.9)",
                            mt: 2,
                            lineHeight: 1.6,
                            fontSize: "1rem",
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </motion.div>
      </Box>
      <Footer />
    </>
  );
};

export default Page;