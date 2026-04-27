import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box, Chip } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { instance } from "@/controller/common";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import BgImg from "@/Assets/video-bg.png";
import parse from "html-react-parser";

const HomePageBlog = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState([]);

  const handleNavigate = (slug) => {
    router.push(`/blog/${slug}`);
  };

  const getBlogData = async () => { 
    try {
      const response = await instance.get(`/api/service/rest/blog/getBlog?limit=10&offset=0`);
      const data = response.data.map((i) => {
        const slug = i.title.replace(/\s+/g, "-");
        return {
          slug,
          ...i,
        };
      });
      setBlogData(data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    getBlogData();
  }, []);

  const StyledBlogBox = styled(Box)(({ theme }) => ({
    borderRadius: "12px",
    transition: "all 0.3s ease-in-out",
    "&:hover": { 
      transform: "translateY(-8px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
    },
    backgroundColor: "#1E1E1E",
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflow: 'hidden'
  }));

  const StyledButton = styled(Button)({
    background: "linear-gradient(45deg, #6a6484 0%, #8a56ac 100%)",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "50px",
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(106, 100, 132, 0.3)",
    "&:hover": {
      background: "linear-gradient(45deg, #8a56ac 0%, #6a6484 100%)",
      boxShadow: "0 6px 20px rgba(106, 100, 132, 0.4)"
    }
  });

  return (
    <section className="blog-section">
      <Box
        sx={{
          py: 10,
          position: "relative",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} data-aos="fade-up">
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  color: "#fff",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                  background: "linear-gradient(45deg, #fff 30%, #aaa 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Latest Blog Posts
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)", 
                  fontSize: "1.1rem",
                  maxWidth: { xs: "100%", md: "80%" }
                }}
              >
                Discover insightful articles and stay updated with our latest content.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 1, px: { xs: 2, sm: 4 } }}>
        <Grid container spacing={4} justifyContent="center">
          {blogData.slice(0, 3).map((blog, index) => (
            <Grid
              item
              lg={4}
              md={6}
              sm={6}
              xs={12}
              key={blog.id}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <StyledBlogBox>
                <Box sx={{ 
                  height: "240px", 
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <Image
                    src={`data:image/png;base64,${blog?.image}` || "/placeholder-blog.jpg"}
                    alt={blog.title}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    className="blog-image"
                  />
                </Box>
                <Box sx={{ 
                  padding: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  flexGrow: 1 
                }}>
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2
                  }}>
                    <CalendarMonthIcon sx={{ 
                      fontSize: 18, 
                      color: '#8a56ac' 
                    }} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.85rem"
                      }}
                    >
                      {blog.date}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      mb: 2,
                      "&:hover": { 
                        color: "#8a56ac",
                        cursor: "pointer" 
                      },
                      transition: "color 0.3s ease"
                    }}
                    onClick={() => handleNavigate(blog.slug, blog)}
                  >
                    {blog.title.length > 40
                      ? `${blog.title.slice(0, 40)}...`
                      : blog.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      mb: 3,
                      flexGrow: 1,
                      fontSize: "0.95rem",
                      lineHeight: 1.6
                    }}
                  >
                    {parse(blog.description.length > 120
                      ? `${blog.description.slice(0, 120)}...`
                      : blog.description)}
                  </Typography>
                  
                  <Box>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        color: "#8a56ac",
                        fontWeight: 600,
                        textTransform: "none",
                        padding: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "#fff",
                          "& .MuiSvgIcon-root": {
                            transform: "translateX(4px)"
                          }
                        },
                        "& .MuiSvgIcon-root": {
                          transition: "transform 0.3s ease",
                          fontSize: "1.1rem"
                        }
                      }}
                      onClick={() => handleNavigate(blog.slug, blog)}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </StyledBlogBox>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Button Container */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 8,
          mb: 4
        }} data-aos="fade-up">
          <Link href="/blog" passHref>
            <StyledButton sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem'
            }}>
              Explore All Articles
            </StyledButton>
          </Link>
        </Box>
      </Container>
    </section>
  );
};

export default HomePageBlog;