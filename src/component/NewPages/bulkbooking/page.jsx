"use client";
import * as React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Image from "next/image";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import BgImg from "@/Assets/video-bg.png";
import mobileView from "@/Assets/mobile3.png";

// Enhanced animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const HeroBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 4),
  textAlign: "center",
  color: "#fff",
  position: "relative",
  zIndex: 2,
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(6, 2),
  backdropFilter: "blur(10px)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
}));

const OfferBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 3),
  textAlign: "center",
  background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
  borderRadius: "32px",
  margin: theme.spacing(8, 0),
  boxShadow: "0 20px 40px rgba(23, 31, 92, 0.1)",
  position: "relative",
  overflow: "hidden",
  animation: `${fadeInUp} 1s ease-out 0.2s both`,
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
    animation: `${float} 6s ease-in-out infinite`,
  },
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 3),
  textAlign: "center",
  color: "#fff",
  background:
    "linear-gradient(135deg, rgba(23, 31, 92, 0.95), rgba(45, 55, 125, 0.9), rgba(99, 102, 241, 0.85))",
  borderRadius: "32px",
  margin: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  animation: `${fadeInUp} 1s ease-out 0.4s both`,
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(45deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.15))",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const CTABox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 3),
  textAlign: "center",
  background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
  borderRadius: "32px",
  margin: theme.spacing(8, 0),
  boxShadow: "0 24px 48px rgba(23, 31, 92, 0.15)",
  position: "relative",
  overflow: "hidden",
  animation: `${fadeInUp} 1s ease-out 0.6s both`,
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-3px",
    left: "-3px",
    right: "-3px",
    bottom: "-3px",
    background: "linear-gradient(45deg, #171f5c, #6366f1, #8b5cf6, #171f5c)",
    borderRadius: "32px",
    zIndex: -1,
    backgroundSize: "300% 300%",
    animation: `${gradientShift} 4s ease-in-out infinite`,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(23, 31, 92, 0.2)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    transform: "scaleX(0)",
    transition: "transform 0.4s ease",
  },
  "&:hover:before": {
    transform: "scaleX(1)",
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.15)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
    transform: "scaleX(0)",
    transition: "transform 0.4s ease",
  },
  "&:hover:before": {
    transform: "scaleX(1)",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  borderRadius: "50px",
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  color: "#fff",
  border: "none",
  boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: "0 12px 32px rgba(99, 102, 241, 0.5)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
    transition: "left 0.5s",
  },
  "&:hover:before": {
    left: "100%",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "12px 32px",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  border: "2px solid #6366f1",
  color: "#6366f1",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.3)",
    border: "2px solid transparent",
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
  filter: "blur(40px)",
  animation: `${float} 8s ease-in-out infinite`,
  zIndex: 0,
}));

const StatChip = styled(Chip)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
  "&:hover": {
    background:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
    transform: "scale(1.05)",
  },
  "& .MuiChip-avatar": {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
}));

const MobileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  position: "relative",
  mt: 6,
  "& img": {
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "translateY(-8px) rotate(2deg)",
    },
  },
}));

export default function BulkBookingPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const offerItems = [
    {
      title: "Increased Visibility & Reach",
      desc: "Expand your audience and attract more players to your venues with advanced marketing tools and SEO optimization.",
      icon: "🚀",
      delay: "0.1s",
      color: "#6366f1",
    },
    {
      title: "Hassle-Free Booking",
      desc: "Simplify the booking process with our intuitive platform, automated workflows, and smart conflict resolution.",
      icon: "📅",
      delay: "0.2s",
      color: "#8b5cf6",
    },
    {
      title: "Optimized Growth",
      desc: "Leverage advanced analytics and AI insights to drive business growth and operational efficiency.",
      icon: "📊",
      delay: "0.3s",
      color: "#a855f7",
    },
  ];

  const features = [
    {
      title: "Smart Booking Management",
      desc: "AI-powered system to handle large volumes of bookings with intelligent slot optimization and automated confirmations.",
      icon: "🎯",
      color: "#6366f1",
    },
    {
      title: "Omnichannel Communication",
      desc: "Unified messaging across calls, SMS, WhatsApp, and push notifications in one centralized dashboard.",
      icon: "💬",
      color: "#8b5cf6",
    },
    {
      title: "Dynamic Scheduling",
      desc: "Flexible scheduling system with drag-and-drop interface, conflict resolution, and real-time updates.",
      icon: "⚡",
      color: "#a855f7",
    },
    {
      title: "Advanced Analytics",
      desc: "Real-time insights with predictive analytics, revenue tracking, and customizable reporting dashboards.",
      icon: "📈",
      color: "#c084fc",
    },
  ];

  return (
    <>
      <NavBar />
      <Box
        sx={{
          pt: { xs: 12, md: 14 },
          pb: 16,
          backgroundImage: `url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          position: "relative",
          "&:before": {
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))",
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: 1,
          },
        }}
      >
        {/* Floating background elements */}
        <FloatingElement
          sx={{
            width: 250,
            height: 250,
            top: "15%",
            left: "8%",
            animationDelay: "0s",
          }}
        />
        <FloatingElement
          sx={{
            width: 180,
            height: 180,
            top: "50%",
            right: "12%",
            animationDelay: "2s",
          }}
        />
        <FloatingElement
          sx={{
            width: 120,
            height: 120,
            bottom: "25%",
            left: "15%",
            animationDelay: "4s",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Enhanced Hero Section */}
          <HeroBox>
            <Box sx={{ mb: 4 }}>
              <StatChip
                avatar={
                  <Avatar sx={{ bgcolor: "#6366f1", width: 24, height: 24 }}>
                    ✨
                  </Avatar>
                }
                label="Revolutionary Booking System"
                sx={{ mb: 3, fontSize: "1rem" }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Transform Your
              <Box
                component="span"
                sx={{
                  display: "block",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mt: 1,
                }}
              >
                Booking Experience
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 6,
                fontWeight: 400,
                maxWidth: 750,
                mx: "auto",
                opacity: 0.95,
                lineHeight: 1.6,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Revolutionary bulk booking management that connects sports venues
              with academies and players through intelligent automation and
              seamless user experiences.
            </Typography>

            <MobileContainer>
              <Box
                sx={{
                  animation: `${slideInFromLeft} 1s ease-out 0.8s both`,
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
                }}
              >
                <Image
                  src={mobileView}
                  alt="PlaySpots Mobile App"
                  width={220}
                  height={440}
                  style={{
                    borderRadius: "28px",
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  animation: `${slideInFromRight} 1s ease-out 1s both`,
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
                }}
              >
                <Image
                  src={mobileView}
                  alt="PlaySpots Dashboard"
                  width={220}
                  height={440}
                  style={{
                    borderRadius: "28px",
                    border: "3px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </Box>
            </MobileContainer>

            <Box
              sx={{
                mt: 8,
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: `${fadeInUp} 1s ease-out 1.2s both`,
              }}
            >
              <StatChip label="200+ Venues Connected" />
              <StatChip label="6K+ Active Users" />
              <StatChip label="99.9% Uptime" />
              <StatChip label="24/7 Support" />
            </Box>
          </HeroBox>

          {/* Enhanced What We Offer */}
          <OfferBox>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(135deg, #171f5c, #6366f1)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              What We Offer
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 8,
                color: "#000",
                maxWidth: 650,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Comprehensive solutions designed to elevate your sports venue
              management and maximize your business potential
            </Typography>

            <Grid
              container
              spacing={4}
              sx={{ position: "relative", zIndex: 2 }}
            >
              {offerItems.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StyledCard
                    sx={{
                      animation: `${fadeInUp} 0.8s ease-out`,
                      animationDelay: item.delay,
                      animationFillMode: "both",
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box
                        sx={{
                          fontSize: "3.5rem",
                          mb: 3,
                          animation: `${pulse} 3s ease-in-out infinite`,
                          animationDelay: item.delay,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#000",
                          mb: 2,
                          fontSize: "1.3rem",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#000",
                          lineHeight: 1.7,
                          fontSize: "1rem",
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </OfferBox>

          {/* Enhanced Features */}
          <FeatureBox>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 8,
                color: "rgba(255, 255, 255, 0.8)",
                maxWidth: 650,
                mx: "auto",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Everything you need to manage your sports venue efficiently and
              scale your business
            </Typography>

            <Grid container spacing={4}>
              {features.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard
                    sx={{
                      animation: `${fadeInUp} 0.8s ease-out`,
                      animationDelay: `${0.2 * index}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box
                        sx={{
                          fontSize: "3.5rem",
                          mb: 3,
                          animation: `${float} 4s ease-in-out infinite`,
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#fff",
                          mb: 2,
                          fontSize: "1.2rem",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.85)",
                          lineHeight: 1.6,
                          mb: 3,
                        }}
                      >
                        {item.desc}
                      </Typography>
                      <Box
                        sx={{
                          width: 50,
                          height: 4,
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`,
                          borderRadius: "50px",
                          mx: "auto",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            width: 70,
                          },
                        }}
                      />
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </FeatureBox>

          {/* Enhanced CTA Section */}
          <CTABox>
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(135deg, #171f5c, #6366f1)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Ready to Transform Your Academy?
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 6,
                  maxWidth: 750,
                  mx: "auto",
                  color: "#fff",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Join thousands of sports academies already using PlaySpots to
                streamline operations, increase bookings, and deliver
                exceptional experiences to their members.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mb: 6,
                }}
              >
                <GradientButton href="/contact">Get Free Demo</GradientButton>
              </Box>
            </Box>
          </CTABox>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
