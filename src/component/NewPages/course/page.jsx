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
    content: '""',
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

const features = [
  {
    title: 'Manage Members',
    desc: 'Easily manage a large number of members of the club from the app.',
    icon: '🏠', // Replace with actual icon component or image
  },
  {
    title: 'Communicate The Way You Like',
    desc: 'Direct call option, send text sms, whatsapp alert and push notifications to members.',
    icon: '📞',
  },
  {
    title: 'Manage And Schedule The Plans',
    desc: 'Organize the membership plans and scheduling plans to the members.',
    icon: '📅',
  },
  {
    title: 'Manage Accounts',
    desc: 'Generate invoices, collect payment with dynamic links and reconcile the membership payments.',
    icon: '💰',
  },
  {
    title: 'Automate Payments',
    desc: 'Automate monthly fee collection and management by digital transactions.',
    icon: '🔄',
  },
  {
    title: 'Reports And Analytics',
    desc: 'Optimize business with real-time performance dashboards and insightful reports.',
    icon: '📊',
  },
];
export default function CoursePage() {
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

  const handleBackWithoutUpdate = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmExit = () => {
    // Logic to navigate back
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
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Hero Section */}
          <HeroBox>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, mb: 3, fontSize: { xs: "2rem", md: "3.5rem" } }}
            >
              Course Management
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, fontWeight: 300, maxWidth: 800, mx: "auto" }}
            >
              Seamlessly create, manage, and track courses, students, coaches, payments, attendance, and notifications for your sports academy.
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
            <Typography
              variant="body1"
              sx={{ maxWidth: 700, mx: "auto", mt: 4, lineHeight: 1.8 }}
            >
              PlaySpots empowers sports academies with comprehensive course management tools. From creating courses and assigning coaches to tracking student attendance and payments, our platform ensures efficient operations and timely communications.
            </Typography>
          </HeroBox>

          {/* What We Offer */}
          <OfferBox>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 4, color: "#1e3a8a" }}
            >
              What We Offer
            </Typography>
            <Grid container spacing={3}>
              {[
                { title: "Course Creation & Management", desc: "Easily create and manage courses with detailed schedules and assignments." },
                { title: "Student & Coach Handling", desc: "Register students and coaches, view profiles, and assign them to courses." },
                { title: "Payment & Attendance Tracking", desc: "Monitor course payments and mark student attendance with automated records." },
              ].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StyledCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 500, color: "#1e3a8a" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: "#4b5563" }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </OfferBox>

          {/* Features */}
       <FeatureBox>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        Features
      </Typography>
      <Grid container spacing={3}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#fff' }}>
                  {item.icon} {item.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#e5e7eb' }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>
    </FeatureBox>

          {/* CTA Section */}
          <CTABox>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 3, color: "#fff" }}
            >
              Ready to Optimize Your Course Management?
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, maxWidth: 600, mx: "auto", color: "#ffffff" }}
            >
              Experience how PlaySpots can streamline your academy’s course operations.
            </Typography>
            <Button
              href="/contact"
              variant="contained"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                background: "linear-gradient(45deg, #4caf50, #22c55e)",
                borderRadius: "9999px",
                fontSize: "1.1rem",
                "&:hover": {
                  background: "linear-gradient(45deg, #22c55e, #4caf50)",
                  transform: "scale(1.05)",
                },
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
          >
            <DialogTitle id="confirmation-dialog-title">Confirm Navigation</DialogTitle>
            <DialogContent>
              <DialogContentText id="confirmation-dialog-description">
                You have unsaved changes. Are you sure you want to leave without saving?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelExit} variant="outlined" autoFocus>
                No
              </Button>
              <Button onClick={handleConfirmExit} variant="contained" color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          {/* Footer */}
        </Container>
      </Box>
          <Footer />
    </>
  );
}