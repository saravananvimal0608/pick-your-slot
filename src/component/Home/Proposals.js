import React, { useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import tick from "@/Assets/tick.png";
import Image from "next/image";
import BgImg from "@/Assets/video-bg.png";

const Proposals = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic" });
  }, []);

  const proposalItems = [
    "Take your business online in minutes Effortlessly transition to the cloud and manage your operations anytime anywhere",
    "Effortless booking anytime anywhere streamlined just for you",
    "All in one solutions tailored for your services",
    "Instant bookings with a promise of punctuality",
    "Effortless service bookings with pay as you go convenience",
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 8, md: 0 },
        mb: { xs: 8, md: 10 },
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 5 },
        backgroundImage: `url(${BgImg.src})`, // Set background image
        backgroundSize: "cover", // Ensure the image covers the area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 6, md: 12 },
          px: { xs: 2, md: 10 },
          position: "relative",
          zIndex: 1,
        }}
        data-aos="fade-down"
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            fontWeight: 800,
            letterSpacing: { xs: 0.5, md: 1 },
            textTransform: "capitalize",
            color: "#fff",
            background: "linear-gradient(90deg, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: { xs: 1.2, md: 1.3 },
            mb: 2,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              borderRadius: "2px",
            },
          }}
        >
          Innovative Solutions
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.25rem" },
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Transform your business and elevate your client experience with our cutting-edge tools.
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 3, md: 4 }} sx={{ justifyContent: "center", zIndex: 1 }}>
        {proposalItems.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            data-aos="zoom-in-up"
            data-aos-delay={100 + index * 100}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: { xs: 3, md: 4 },
                height: "100%",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 15px 30px rgba(139, 92, 246, 0.2)",
                  background: "rgba(255, 255, 255, 0.12)",
                  borderColor: "#8b5cf6",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)",
                  transition: "all 0.5s ease",
                  opacity: 0,
                },
                "&:hover:before": {
                  opacity: 1,
                  transform: "scale(1.2)",
                },
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                  mr: 3,
                  background: "linear-gradient(45deg, #8b5cf6, #ec4899)",
                  borderRadius: "12px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "rotate(10deg) scale(1.15)",
                    boxShadow: "0 6px 20px rgba(139, 92, 246, 0.5)",
                  },
                }}
              >
                <Image
                  src={tick}
                  alt="verified"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    fontWeight: 600,
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Proposals;