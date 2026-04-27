import React, { useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import "aos/dist/aos.css";
import Aos from "aos";
import BgImg from "@/Assets/video-bg.png";
const DifferentBookings = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const bookingFeatures = [
    {
      title: "Hosting",
      description:
        // "Create and host your own Games or services with complete control over pricing, slots, and availability.",
        //"Easily create and manage your own games, events, or services in minutes. Set your schedule, control pricing, and decide how many bookings you accept — all from one simple dashboard."
        "Create and manage your own services, games, or events easily. Set your schedule, control pricing, and manage bookings from one simple dashboard."
    },
    {
      title: "Partial Payment",
      description:
        // "Allow customers to confirm bookings with a small advance and pay the remaining balance later.",
            //"Let customers secure their booking with a small advance instead of paying the full amount upfront. This makes it easier for people to commit while giving you guaranteed reservations."
            "Allow customers to confirm bookings with a small advance payment. This reduces cancellations while making bookings more convenient."
    },

    {
      title: "Bulk Bookings",
      description:
        // "Enable multiple bookings at once — perfect for teams, corporate events, and group reservations.",
        //"Perfect for teams and large groups. Allow multiple participants to book together in a single reservation, saving time and making group planning quick and hassle-free."
        "Perfect for groups and teams. Multiple participants can book together in one reservation, making group planning fast and easy."
    },
  ];

  return (
   <Box
         sx={{
                 position: "relative",
                 py: { xs: 12, md: 20 },
                 backgroundImage: `url(${BgImg.src})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 backgroundRepeat: "no-repeat",
                 overflow: "hidden",
                 "&:before": {
                   content: '""',
                   position: "absolute",
                   top: 0,
                   left: 0,
                   right: 0,
                   bottom: 0,
                   // background: "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
                   zIndex: 1,
                 },
               }}
             >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box textAlign="center" mb={{ xs: 8, md: 12 }}>
          <Typography
            variant="h3"
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              mb: 3,
            }}
            data-aos="fade-up"
          >
            Flexible Booking Options
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
            }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Powerful features designed to handle simple, advanced, and large-scale bookings effortlessly.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={5}>
          {bookingFeatures.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  background: `url(${BgImg.src})`,
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                  transition: "0.4s ease",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    mb: 3,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
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

export default DifferentBookings;