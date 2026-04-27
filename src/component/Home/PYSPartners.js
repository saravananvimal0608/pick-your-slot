import React, { useEffect } from "react";
import { Box, Typography, Grid, Container, keyframes } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import BgImg from "@/Assets/video-bg.png";

const PYSPartners = () => {
  const floatAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  `;

  const pulseAnimation = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(75, 94, 170, 0.5); }
    70% { box-shadow: 0 0 0 15px rgba(75, 94, 170, 0); }
    100% { box-shadow: 0 0 0 0 rgba(75, 94, 170, 0); }
  `;

  const shimmerAnimation = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  `;

  const glowAnimation = keyframes`
    0% { opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { opacity: 0.3; }
  `;

  const features = [
    "User IOS/Android app",
    "User Website",
    "Slot creation",
    "Offer Management",
    "Groups Creation",
    "Role-based access",
    "Tournament Management",
    "Block and unblock Slots",
    "Course creation",
    "Membership creation",
    "Student maintenance",
    "Mark attendance",
    "Paperless Report",
    "Cancellation and Refunds",
  ];

  useEffect(() => {
    Aos.init({ duration: 1000, once: false, mirror: true, easing: "ease-out-cubic" });
  }, []);

  const itemBoxStyles = {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(75, 94, 170, 0.18))",
    backdropFilter: "blur(16px)",
    padding: "1.8rem 1.5rem",
    borderRadius: "18px",
    marginBottom: "1.5rem",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.28)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      transform: "translateY(-10px) scale(1.03)",
      background: "linear-gradient(145deg, rgba(75, 94, 170, 0.35), rgba(85, 105, 185, 0.45))",
      boxShadow: "0 15px 40px rgba(75, 94, 170, 0.4)",
      "& p": {
        color: "#ffffff",
        fontWeight: 700,
        letterSpacing: "0.3px",
      },
      "&::before": {
        transform: "scaleX(1)",
      },
      "&::after": {
        opacity: 1,
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #4B5EAA, #A5B4FC, #4B5EAA)",
      backgroundSize: "200% 100%",
      opacity: 0.8,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.5s ease",
      animation: `${shimmerAnimation} 3s infinite linear`,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "10%",
      right: "10%",
      height: "1px",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 8, md: -8 },
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.72)), url(${BgImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: { xs: 9, md: 14 },
        borderRadius: { xs: "20px", md: "28px" },
        overflow: "hidden",
        boxShadow: "0 25px 90px rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 0,
        }}
      />
      
      <Box
        className="particle-container"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
          "& .particle": {
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(165, 180, 252, 0.2)",
            pointerEvents: "none",
          },
        }}
      >
        {Array(12).fill().map((_, i) => (
          <Box 
            key={i}
            className="particle"
            sx={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `${glowAnimation} ${3 + Math.random() * 4}s infinite ease-in-out`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          />
        ))}
      </Box>
      
      <Box
        sx={{
          padding: { xs: "2rem 1rem", sm: "3.5rem 2rem", md: "5.5rem 3rem" },
          textAlign: "center",
          maxWidth: "1400px",
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            mb: { xs: 6, md: 8 },
            "&::before": {
              content: '""',
              position: "absolute",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "rgba(75, 94, 170, 0.18)",
              filter: "blur(50px)",
              top: "-30px",
              left: "20%",
              zIndex: -1,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "rgba(165, 180, 252, 0.12)",
              filter: "blur(60px)",
              bottom: "-30px",
              right: "20%",
              zIndex: -1,
            }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.25rem", md: "4.25rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#fff",
              mb: 2.5,
              position: "relative",
              display: "inline-block",
              background: "linear-gradient(90deg, #ffffff, #A5B4FC, #ffffff)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${shimmerAnimation} 4.5s linear infinite`,
              textShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
            data-aos="fade-down"
          >
            Exclusive Benefits for PYS Partners
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.88)",
              mb: { xs: 6, md: 9 },
              fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.5rem" },
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.8,
              fontWeight: 300,
              letterSpacing: "0.3px",
            }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Unlock a suite of powerful tools and features crafted to elevate your business and streamline operations.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2.5, sm: 3.5, md: 4.5 }}
          sx={{
            justifyContent: "center",
          }}
        >
          {features.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              <Box
                sx={itemBoxStyles}
                data-aos="zoom-in-up"
                data-aos-delay={(index % 6) * 100}
                data-aos-duration={700 + (index % 3) * 100}
              >
                <Box 
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "rgba(165, 180, 252, 0.8)",
                    boxShadow: "0 0 12px rgba(165, 180, 252, 0.6)",
                    animation: `${pulseAnimation} ${2 + (index % 3) * 0.5}s infinite`,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    height: "48px",
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: { xs: "0.98rem", sm: "1.05rem", md: "1.15rem" },
                    transition: "all 0.4s ease",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PYSPartners;