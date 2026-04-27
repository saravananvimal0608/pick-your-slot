"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { Box, Container, Grid, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fitness from "@/Assets/featured/Fitness.webp";
import Badminton from "@/Assets/featured/Badminton.webp";
import Carwash from "@/Assets/featured/Carwash.webp";
import Salon from "@/Assets/featured/Saloon.webp";
import Football from "@/Assets/featured/football.webp";
import NetPractice from "@/Assets/featured/Net Practies.webp";
import Image from "next/image";
// import BgImg from "@/Assets/bg-img-4.png";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Fitness", image: Fitness },
  { name: "Badminton", image: Badminton },
  { name: "Carwash", image: Carwash },
  { name: "Salon", image: Salon },
  { name: "Football", image: Football },
  { name: "Net Practice", image: NetPractice },
];

function Categories() {
  const slideRef = useRef(null);
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    customPaging: (i) => (
      <Box
        sx={{
          width: { xs: 16, md: 64 },
          height: 8,
          borderRadius: 4,
          bgcolor: "#fff",
          opacity: 0.5,
          transition: "opacity 0.3s ease",
          "&.slick-active": {
            opacity: 1,
            bgcolor: "#fff",
          },
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
        },
      },
    ],
  };

  const handleSlideChange = (index) => {
    if (slideRef.current) {
      slideRef.current.slickGoTo(index);
    }
  };

  // const handleCardClick = (categoryName) => {
  //   router.push(`/venue/vendor?category=${encodeURIComponent(categoryName)}`);
  // };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3.5rem" },
                color: "#fff",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                mb: 2,
              }}
            >
              What We’ve Got for You
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: { xs: "1rem", md: "1.5rem" },
                fontWeight: 400,
                maxWidth: "600px",
                margin: "auto",
              }}
            >
              The Coolest Local Services Are Here
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            ".slick-dots": {
              bottom: "-50px",
              "& li": {
                mx: 1,
                width: "auto",
                height: "auto",
              },
              position: "relative",
              zIndex: 1,
            },
            px: { xs: 1, sm: 2 },
            ".slick-slide > div": {
              margin: { xs: "0 4px", sm: "0 8px" },
            },
            ".slick-list": {
              margin: { xs: "0 -4px", sm: "0 -8px" },
            },
          }}
        >
          <Slider ref={slideRef} {...settings}>
            {categories.map((category, index) => (
              <Box key={index} onClick={() => handleCardClick(category.name)}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    height: 320,
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                    }}
                    priority={index < settings.slidesToShow}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                      zIndex: 0,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      bottom: 24,
                      left: 24,
                      right: 24,
                      color: "#fff",
                      fontWeight: "bold",
                      zIndex: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}

export default Categories;
