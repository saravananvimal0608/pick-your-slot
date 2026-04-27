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
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Chip
} from "@mui/material";
import { styled ,keyframes} from "@mui/material/styles";
import Image from "next/image";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import BgImg from "@/Assets/video-bg.png";
import mobileView from "@/Assets/mobile3.png";

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



// Styled components with improved design
const HeroBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 3),
  textAlign: "center",
  color: "#fff",
  position: "relative",
  zIndex: 2,
  backdropFilter: "blur(10px)",
  borderRadius: "24px",
  margin: theme.spacing(6, 2),
  overflow: "hidden",
  animation: `${fadeInUp} 1s ease-out`,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  "&:before": {
    content: '',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    backgroundSize: "200% 200%",
    animation: `${gradientShift} 3s ease infinite`,
    zIndex: 1,
  },
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
  padding: theme.spacing(6, 2),
  textAlign: 'center',
  color: '#fff',
  background:
    "linear-gradient(135deg, rgba(23, 31, 92, 0.95), rgba(45, 55, 125, 0.9), rgba(99, 102, 241, 0.85))",
  borderRadius: "32px",
  borderRadius: '16px',
  margin: theme.spacing(4, 0),
  position: 'relative',
  overflow: 'hidden',
  '& > *': {
    position: 'relative',
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
const FloatingShape = styled(Box)(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
  filter: "blur(40px)",
  animation: `${float} 8s ease-in-out infinite`,
  zIndex: 0,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));


export default function MembershipPage() {
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleBackWithoutUpdate = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmExit = () => {
    setOpenConfirmationDialog(false);
    window.history.back();
  };

  const handleCancelExit = () => {
    setOpenConfirmationDialog(false);
  };

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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          position: "relative",
          "&:before": {
               background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))",
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: 1,
          },
        }}
      >
        {/* Floating shapes for visual interest */}
        <FloatingShape sx={{ width: 200, height: 200, top: "10%", left: "5%", animation: "float 8s ease-in-out infinite" }} />
        <FloatingShape sx={{ width: 150, height: 150, bottom: "15%", right: "10%", animation: "float 10s ease-in-out infinite 1s" }} />
        <FloatingShape sx={{ width: 100, height: 100, top: "40%", right: "15%", animation: "float 12s ease-in-out infinite 2s" }} />
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Hero Section */}
          <Zoom in={true} timeout={1000}>
            <HeroBox>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  background: "linear-gradient(135deg, #fff, #e0f2fe)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Membership Management
              </Typography>
              <Typography
                variant="h5"
                sx={{ 
                  mb: 4, 
                  fontWeight: 300, 
                  maxWidth: 800, 
                  mx: "auto",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                Effortlessly manage group memberships, track payments, and stay
                connected with your sports academy members.
              </Typography>
              <Box
                sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  mt: 4, 
                  gap: { xs: 2, md: 4 },
                  flexWrap: isMobile ? "wrap" : "nowrap"
                }}
              >
                      <MobileContainer>
                <Fade in={true} timeout={1500}>
                  <Box    sx={{
                  animation: `${slideInFromRight} 1s ease-out 1s both`,
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
                }}>
                    <Image
                      src={mobileView}
                      alt="App Mockup 1"
                      width={220}
                      height={440}
                      style={{
                        borderRadius: "24px",
                        boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  </Box>
                </Fade>
                <Fade in={true} timeout={1500} style={{ transitionDelay: "300ms" }}>
                  <Box 
                     sx={{
                  animation: `${slideInFromRight} 1s ease-out 1s both`,
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
                }}
                  >
                    <Image
                      src={mobileView}
                      alt="App Mockup 2"
                      width={220}
                      height={440}
                      style={{
                        borderRadius: "24px",
                        boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  </Box>
                </Fade>
                </MobileContainer>
              </Box>
              <Typography
                variant="body1"
                sx={{ 
                  maxWidth: 700, 
                  mx: "auto", 
                  mt: 4, 
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                }}
              >
                PlaySpots simplifies membership management for sports academies,
                offering tools to organize groups, automate notifications, and
                track payment statuses, ensuring a seamless experience for both
                admins and members.
              </Typography>
            </HeroBox>
          </Zoom>

          {/* What We Offer */}
          <OfferBox>
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 6, 
                color: "primary.main",
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 4,
                  background: "linear-gradient(90deg, #3b82f6, #10b981)",
                  borderRadius: 2,
                }
              }}
            >
              What We Offer
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Streamlined Group Management",
                  desc: "Easily create, edit, and manage member groups with confirmation prompts.",
                  icon: "👥",
                },
                {
                  title: "Automated Notifications",
                  desc: "Send welcome, suspension, or reminder messages to keep members informed.",
                  icon: "🔔",
                },
                {
                  title: "Payment Tracking",
                  desc: "Monitor payment statuses beyond cash for accurate financial records.",
                  icon: "💰",
                },
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                    <StyledCard>
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Box sx={{ fontSize: "3rem", mb: 2 }}>
                          {item.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary", lineHeight: 1.6 }}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </OfferBox>

          {/* Features */}
          <FeatureBox>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 6,
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 4,
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                }
              }}
            >
              Powerful Features
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Group Schedule Management",
                  desc: "Edit group schedules with confirmation prompts to prevent accidental changes.",
                  icon: "📅",
                },
                {
                  title: "Member Search",
                  desc: "Quickly find members with an optimized, fully functional search bar.",
                  icon: "🔍",
                },
                {
                  title: "Automated Alerts",
                  desc: "Send customized notifications for suspensions or welcome messages for reinstated members.",
                  icon: "📢",
                },
                {
                  title: "Payment Status Tracking",
                  desc: "Track payment confirmations with detailed statuses for better financial oversight.",
                  icon: "✅",
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                    <FeatureCard>
                      <CardContent sx={{ p: 4, display: "flex", alignItems: "flex-start" }}>
                        <Box sx={{ fontSize: "2.5rem", mr: 3, flexShrink: 0 }}>
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#fff", mb: 1 }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.6 }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>
                      </CardContent>
                    </FeatureCard>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </FeatureBox>

          {/* CTA Section */}
          <CTABox>
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: "primary.main",
                background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Elevate Your Membership Management?
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                mb: 4, 
                maxWidth: 600, 
                mx: "auto", 
                color: "text.secondary",
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Discover how PlaySpots can transform your academy's membership
              operations with our powerful management tools.
            </Typography>
            <Button
              href="/contact"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                background: "linear-gradient(135deg, #3b82f6, #10b981)",
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2563eb, #059669)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(59, 130, 246, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get a Demo
            </Button>
          </CTABox>

          {/* Confirmation Dialog for Back Navigation */}
          <Dialog
            open={openConfirmationDialog}
            onClose={handleCancelExit}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            <DialogTitle 
              id="confirmation-dialog-title"
              sx={{ 
                fontWeight: 600,
                background: "linear-gradient(135deg, #3b82f6, #10b981)",
                backgroundClip: "text",
                textFillColor: "transparent",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Confirm Navigation
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="confirmation-dialog-description" sx={{ mt: 2 }}>
                You have unsaved changes. Are you sure you want to leave without
                updating?
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button 
                onClick={handleCancelExit} 
                variant="outlined" 
                autoFocus
                sx={{ borderRadius: "50px", px: 3 }}
              >
                No, Stay
              </Button>
              <Button
                onClick={handleConfirmExit}
                variant="contained"
                color="primary"
                sx={{ borderRadius: "50px", px: 3 }}
              >
                Yes, Leave
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        
        {/* Add global styles for animations */}
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}</style>
      </Box>
      <Footer />
    </>
  );
}