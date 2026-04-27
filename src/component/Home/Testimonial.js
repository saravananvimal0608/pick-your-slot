"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Rating,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Slider from "react-slick";
import { BaseUrl } from "@/controller/common";
// import BgImg from "@/Assets/bg-img-4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TestimonialCard = styled(Card)(({ theme }) => ({
  margin: "20px auto", 
  background: "linear-gradient(145deg, #1A1A55 0%, #3B3B9A 100%)",
  borderRadius: "20px",
  height: "320px",
  width: "90%",
  border: "1px solid rgba(99, 102, 241, 0.15)",
  boxShadow: "0 10px 35px rgba(31, 38, 135, 0.25)",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 15px 50px rgba(99, 102, 241, 0.35)",
    borderColor: "rgba(99, 102, 241, 0.4)",
  },
  padding: "24px",
  animation: "slideIn 0.8s ease-out forwards",
  "@keyframes slideIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(30px) scale(0.95)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
  },
}));

// Custom styles for slick
const slickStyles = `
  .slick-slider {
    overflow: hidden;
  }
  .slick-list {
    margin: 0 -10px;
    overflow: visible;
  }
  .slick-slide {
    padding: 0 10px;
    transition: transform 0.5s ease;
  }
  .slick-dots {
    bottom: -40px;
    li {
      margin: 0 6px;
    }
    li button:before {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.3);
      opacity: 0.5;
      transition: all 0.3s ease;
    }
    li.slick-active button:before {
      color: #6366f1;
      opacity: 1;
      transform: scale(1.5);
    }
    li button:hover:before {
      color: #818cf8;
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
`;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/service/rest/cms/getAllReviews`
        );
        if (response.status === 200) {
          const filteredData = response.data
            .filter((item) => item.rating >= 4)
            .slice(0, 6);
          setTestimonials(filteredData);
        }
      } catch (error) {
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3, 
    arrows: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: false, 
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <Box
       sx={{
        position: "relative",
        zIndex: 3
      }}
    >
      <style>{slickStyles}</style>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mt: 10,
            mb: 5,
            color: "#fff",
            fontSize: { xs: "2.25rem", md: "4.5rem" },
            fontWeight: 900,
            letterSpacing: "1.5px",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            animation: "fadeIn 1.2s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(-20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
        Happy Customers Say:
        </Typography>

        <Slider {...sliderSettings}>
          {testimonials?.map((testimonial, index) => (
            <Box key={index}>
              <TestimonialCard>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        mr: 2,
                        bgcolor: "#6366f1",
                        boxShadow: "0 0 12px rgba(99, 102, 241, 0.4)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                      }}
                      src={testimonial.avatarUrl || undefined}
                    >
                      {!testimonial.avatarUrl && testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#fff",
                          fontWeight: 700,
                          letterSpacing: "0.8px",
                          fontSize: "1.1rem",
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating
                    value={testimonial.rating}
                    precision={0.5}
                    readOnly
                    sx={{
                      mb: 2,
                      "& .MuiRating-iconFilled": {
                        filter: "drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#fff4",
                      },
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#e0e7ff",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                      fontStyle: "italic",
                      position: "relative",
                      "&:before": {
                        content: '"“"',
                        position: "absolute",
                        left: -20,
                        top: -10,
                        color: "#818cf8",
                        fontSize: "2rem",
                        opacity: 0.4,
                      },
                      "&:after": {
                        content: '"”"',
                        position: "absolute",
                        right: -20,
                        bottom: -10,
                        color: "#818cf8",
                        fontSize: "2rem",
                        opacity: 0.4,
                      },
                    }}
                  >
                    {testimonial.description}
                  </Typography>
                </CardContent>
              </TestimonialCard>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials;