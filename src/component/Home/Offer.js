import React, { useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import "aos/dist/aos.css";
import Aos from "aos";
import fastbooking from "@/Assets/global.webp";
import idea from "@/Assets/instantbook.webp";
import booking from "@/Assets/managebook.webp";
import Image from "next/image";
// import BgImg from "@/Assets/bg-img-4.png";
import near from "@/Assets/nearimg.webp";

const Offer = () => {
  useEffect(() => {
    Aos.init({ duration: 1200, easing: "ease-in-out" });
  }, []);

  const features = [
    {
      title: "Discover Nearby",
      description: "Check out the best local services right around you without any hassle.",
      image: near,
      alt: "Discover Nearby Options",
    },
    {
      title: "Instant Booking",
      description: "Grab your spot in just a few taps!",
      image: idea,
      alt: "Instant Booking",
    },
    {
      title: "Manage Easily",
      description: "Keep track of your bookings with clear info.",
      image: booking,
      alt: "Manage with Ease",
    },
    {
      title: "Global Access",
      description: "Find services wherever you are, any time you need them.",
      image: fastbooking,
      alt: "Global Access",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 3
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .card-hover {
            transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            overflow: hidden;
          }
          .card-hover:hover {
            transform: translateY(-16px) scale(1.03);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          .image-container {
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-radius: 50%;
            overflow: hidden;
            width: 130px;
            height: 130px;
            border: 4px solid rgba(255, 255, 255, 0.1);
          }
          .card-hover:hover .image-container {
            transform: scale(1.12);
            box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .feature-title {
            position: relative;
            display: inline-block;
          }
          .feature-title:after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: -6px;
            left: 50%;
            background: linear-gradient(90deg, #4f46e5, #8b5cf6);
            transition: all 0.4s ease;
            transform: translateX(-50%);
          }
          .card-hover:hover .feature-title:after {
            width: 80%;
          }
          .main-heading {
            animation: gradientShift 8s ease infinite;
            background-size: 200% 200%;
          }
        `}
      </style>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Grid
          container
          sx={{ justifyContent: "center", mb: { xs: 10, md: 14 } }}
        >
          <Grid item xs={12} md={10} lg={8}>
            <Typography
              className="main-heading"
              sx={{
                fontSize: { xs: "2.75rem", sm: "3.75rem", md: "4.75rem" },
                color: "#ffffff",
                fontWeight: 900,
                textAlign: "center",
                lineHeight: 1.1,
                mb: 4,
                background: "linear-gradient(90deg, #fff 0%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
              data-aos="zoom-in"
            >
              What’s in the App
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.6rem" },
                color: "#e0e7ff",
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.7,
                fontWeight: 400,
                textShadow: "1px 1px 8px rgba(0, 0, 0, 0.4)",
                letterSpacing: "0.01em",
              }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
            Your go-to spot for browsing and booking local services.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={{ xs: 5, md: 6, lg: 7 }}
          sx={{ justifyContent: "center" }}
        >
          {features.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <Box
                className="card-hover"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: { xs: 4, md: 5, lg: 6 },
                  bgcolor: "rgba(255, 255, 255, 0.06)",
                  borderRadius: 6,
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  height: "100%",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background:
                      "linear-gradient(180deg, rgba(79, 70, 229, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
                    borderRadius: "6px 6px 0 0",
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  className="image-container"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Typography
                  className="feature-title"
                  sx={{
                    color: "#ffffff",
                    fontSize: { xs: "1.5rem", md: "1.7rem" },
                    fontWeight: 800,
                    mt: 4,
                    mb: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#d1d9ff",
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    fontWeight: 500,
                    padding: "0 15px",
                    opacity: 0.9,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Offer;
