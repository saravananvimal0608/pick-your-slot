import React, { useEffect } from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Import images directly
import chennaiImage from "@/Assets/locations/chennai.png";
import coimbatoreImage from "@/Assets/locations/Coiambatore.png";
import maduraiImage from "@/Assets/locations/Madurai.png";
import tirunelveliImage from "@/Assets/locations/Tirunelveli.png";
import trichyImage from "@/Assets/locations/Trichy.png";
import pondicherryImage from "@/Assets/locations/pondicherry.png";
// import bgImage from "@/Assets/bg-img-4.png";

const locations = [
  {
    id: "chennai",
    name: "Chennai",
    ads: "500+ Ads Posted",
    img: chennaiImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    ads: "Coming Soon",
    img: coimbatoreImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
  {
    id: "madurai",
    name: "Madurai",
    ads: "Coming Soon",
    img: maduraiImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    ads: "Coming Soon",
    img: tirunelveliImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    ads: "Coming Soon",
    img: trichyImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
  {
    id: "puducherry",
    name: "Puducherry",
    ads: "Coming Soon",
    img: pondicherryImage,
    link: "/comingsoon",
    status: "Coming Soon",
  },
];

const Locations = () => {
  const navigate = useRouter();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleNavigate = (link) => navigate.push(link);

  return (
    <Box
     sx={{
        position: "relative",
        zIndex: 3
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          my: 0,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.25rem", md: "4rem" },
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "capitalize",
              color: "#fff",
              transition: "all 0.5s ease",
              mb: 3,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              "&:hover": {
                letterSpacing: 2,
              },
            }}
          >
            Hotspots You’ll Love
          </Typography>
          <Typography
            variant="subtitle1"
            data-aos="fade-up"
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.25rem",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
         Pick your favorite area and check out what’s available:
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <Grid container spacing={4} justifyContent="center">
            {locations.map((location, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3.5}
                key={location.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "40%" },
                      height: { xs: "160px", sm: "auto" },
                      position: "relative",
                      minHeight: { sm: "180px" },
                    }}
                  >
                    <Image
                      src={location.img}
                      alt={location.name}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 3,
                      width: { xs: "100%", sm: "60%" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: { xs: "auto", sm: "100%" },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          mb: 1,
                          textAlign: { xs: "center", sm: "left" },
                        }}
                      >
                        {location.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          mb: 2,
                          textAlign: { xs: "center", sm: "left" },
                        }}
                      >
                        {location.ads}
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => handleNavigate(location.link)}
                      variant="contained"
                      sx={{
                        width: "100%",
                        textTransform: "capitalize",
                        backgroundColor: "#0247bd",
                        py: 1,
                        borderRadius: "6px",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#0056b3",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Locations;
