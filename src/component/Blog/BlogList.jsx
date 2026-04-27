"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/component/Home/Footer";
import NavBar from "@/component/Home/NavBar";
import BgImg from "@/Assets/video-bg.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import parse from "html-react-parser";
import pageNotFound from "@/app/pageNotFound";
import { BaseUrl } from "@/controller/common";

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [CategoryId, setCategoryId] = useState("");
  const [offSet, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef(null);
  const router = useRouter();
  const blogContainerRef = useRef(null);
  const categoryRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleNavigate = (slug) => {
    router.push(`/blog/${slug}`);
  };

  const fetchBlogs = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);

      const currentOffset = reset ? 0 : offSet;

      try {
        const params = new URLSearchParams({
          limit: "5",
          offset: currentOffset.toString(),
          blogCategoryId: CategoryId,
          title: searchQuery,
        });

        if (selectedCategory) {
          params.append("category", selectedCategory);
        }

        const response = await axios.get(
          `${BaseUrl}/api/service/rest/blog/getBlog?${params.toString()}`
        );

        const newBlogs = response.data.map((i) => ({
          slug: i.title.replace(/\s+/g, "-").toLowerCase(),
          ...i,
        }));

        setHasMore(newBlogs.length === 5);
        setBlogData((prev) => (reset ? newBlogs : [...prev, ...newBlogs]));
        setOffset(currentOffset + newBlogs.length);
      } catch (error) {
        setHasMore(false);
        pageNotFound();
      } finally {
        setLoading(false);
      }
    },
    [offSet, hasMore, loading, selectedCategory, searchQuery]
  );

  const lastBlogRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            fetchBlogs();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, fetchBlogs]
  );

  const getAllBlogCategory = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/service/rest/blog/getBlogCategory`
      );
      setCategories(
        response.data.map((cat) => ({
          blogCategory: cat.blogCategory,
          id: cat.blogCategoryId,
        })) || []
      );
    } catch (error) { }
  };

  const handleCategoryClick = (category, id) => {
    setSelectedCategory(category);
    setCategoryId(id);
    setOffset(0);
    setHasMore(true);
    setBlogData([]);
  };

  const handleAllBlogsClick = () => {
    setSelectedCategory(null);
    setCategoryId("");
    setOffset(0);
    setHasMore(true);
    setBlogData([]);
  };

  useEffect(() => {
    fetchBlogs(true);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    getAllBlogCategory();
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!blogContainerRef.current || !categoryRef.current) return;

      const blogContainer = blogContainerRef.current;
      const categoryContainer = categoryRef.current;
      const blogRect = blogContainer.getBoundingClientRect();
      const footer = document.querySelector("footer");
      const footerRect = footer ? footer.getBoundingClientRect() : null;

      const categoryHeight = categoryContainer.offsetHeight;
      const windowHeight = window.innerHeight;

      if (window.innerWidth < 900) {
        setIsSticky(false);
        categoryContainer.style.position = "relative";
        categoryContainer.style.top = "auto";
        return;
      }

      if (footerRect && footerRect.top <= windowHeight) {
        setIsSticky(false);
        categoryContainer.style.position = "absolute";
        categoryContainer.style.top = `${blogContainer.offsetHeight - categoryHeight
          }px`;
      } else if (blogRect.top <= 0) {
        setIsSticky(true);
        categoryContainer.style.position = "fixed";
        categoryContainer.style.top = "0";
      } else {
        setIsSticky(false);
        categoryContainer.style.position = "relative";
        categoryContainer.style.top = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
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
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4))",
              zIndex: 1,
            },
          }}
        >
          <Box
            py={{ xs: 6, md: 8 }}
            textAlign="center"
            sx={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.4) 80%, rgba(17, 16, 24, 0.8) 100%)",
              color: "#fff",
              minHeight: { xs: "35vh", md: "45vh" },
              mt: { xs: 0, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                component="h1"
                fontWeight={900}
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  color: "#fff",
                  textShadow: "0 6px 20px rgba(0,0,0,0.6)",
                  mb: 2,
                  letterSpacing: "-0.02em",
                  backgroundImage:
                    "linear-gradient(135deg, #ffffff 20%, #81d4fa 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Blogs
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 4,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: "#a1a1ff",
                    textDecoration: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                    fontWeight: 500,
                  }}
                  onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Home
                </Link>{" "}
                / <span style={{ color: "#fff", fontWeight: 500 }}>Blogs</span>
              </Typography>
            </motion.div>
          </Box>

          <Box
            sx={{
              py: { xs: 4, md: 0 },
              position: "relative",
              zIndex: 2,
              backgroundColor: "#111018",
              backgroundPosition: "center",
              backgroundRepeat: "repeat-y",
              flexGrow: 1,
              pb: { xs: 4, md: 0 },
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                px: { xs: 2, md: 4 },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                order={{ xs: 1, md: 1 }}
                sx={{ zIndex: 3 }}
              >
                <Paper
                  ref={categoryRef}
                  sx={{
                    padding: 3,
                    backgroundColor: "rgba(33, 29, 46, 0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                    width: { xs: "100%", md: "300px" },
                    maxHeight: { xs: "none", md: "calc(100vh - 170px)" },
                    overflowY: "auto",
                    zIndex: 3,
                    position: { xs: "relative", md: isSticky ? "sticky" : "relative" },
                    top: { xs: "auto", md: isSticky ? 0 : "auto" },
                    mb: { xs: 4, md: 0 },
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "2px",
                    },
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFF",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      pb: 1.5,
                      mb: 2,
                      fontSize: "1.2rem",
                    }}
                    variant="h6"
                    component="h3"
                  >
                    <BusinessCenterIcon
                      sx={{ color: "#a1a1ff", marginRight: 1.5 }}
                    />{" "}
                    Categories
                  </Typography>
                  <List sx={{ py: 0 }}>
                    <ListItem
                      button
                      onClick={handleAllBlogsClick}
                      sx={{
                        padding: "10px 4px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "6px",
                        transition: "background-color 0.2s ease",
                        cursor: "pointer",
                        backgroundColor: !selectedCategory
                          ? "rgba(89, 41, 215, 0.3)"
                          : "transparent",
                        borderLeft: !selectedCategory
                          ? "3px solid #a1a1ff"
                          : "3px solid transparent",
                        pl: !selectedCategory ? "13px" : "16px",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "unset",
                          marginRight: 1.5,
                          color: !selectedCategory ? "#e0e0e0" : "#828f94",
                        }}
                      >
                        <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                      </ListItemIcon>
                      <Typography
                        sx={{
                          color: !selectedCategory
                            ? "#ffffff"
                            : "rgba(255, 255, 255, 0.85)",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: !selectedCategory ? 500 : 400,
                          fontSize: "0.95rem",
                        }}
                      >
                        All Blogs
                      </Typography>
                    </ListItem>
                    {categories.map((category, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() =>
                          handleCategoryClick(
                            category.blogCategory,
                            category.id
                          )
                        }
                        sx={{
                          textTransform: "capitalize",
                          padding: "10px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "6px",
                          transition: "background-color 0.2s ease",
                          cursor: "pointer",
                          backgroundColor:
                            selectedCategory === category.blogCategory
                              ? "rgba(89, 41, 215, 0.3)"
                              : "transparent",
                          borderLeft:
                            selectedCategory === category.blogCategory
                              ? "3px solid #a1a1ff"
                              : "3px solid transparent",
                          pl:
                            selectedCategory === category.blogCategory
                              ? "13px"
                              : "16px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "unset",
                            marginRight: 1.5,
                            color:
                              selectedCategory === category.blogCategory
                                ? "#e0e0e0"
                                : "#828f94",
                          }}
                        >
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                        </ListItemIcon>
                        <Typography
                          sx={{
                            color:
                              selectedCategory === category.blogCategory
                                ? "#ffffff"
                                : "rgba(255, 255, 255, 0.85)",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight:
                              selectedCategory === category.blogCategory
                                ? 500
                                : 400,
                            fontSize: "0.95rem",
                          }}
                        >
                          {category.blogCategory}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                order={{ xs: 2, md: 2 }}
                ref={blogContainerRef}
                sx={{ zIndex: 2 }}
              >

                <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setOffset(0);
                      setBlogData([]);
                      setHasMore(true);
                    }}
                    InputProps={{
                      startAdornment: (
                        <SearchIcon sx={{ color: "#a1a1ff", mr: 1 }} />
                      ),
                      sx: {
                        backgroundColor: "rgba(33, 29, 46, 0.85)",
                        color: "#fff",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 0.2)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255, 255, 255, 0.4)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#a1a1ff",
                        },
                      },
                    }}
                    sx={{
                      width: { xs: "100%", sm: "70%", md: "50%" },
                    }}
                  />
                </Box>
                <Grid container spacing={4}>
                  {blogData.map((post, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      key={post.blogId ? `${post.blogId}-${index}` : index}
                      ref={index === blogData.length - 1 ? lastBlogRef : null}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          backgroundColor: "rgba(33, 29, 46, 0.85)",
                          color: "white",
                          borderRadius: "16px",
                          fontFamily: "Poppins, sans-serif",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          position: "relative",
                          overflow: "hidden",
                          backdropFilter: "blur(8px)",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            "& .card-image": {
                              transform: "scale(1.05)",
                            },
                            "& .card-overlay": {
                              opacity: 0.2,
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            overflow: "hidden",
                            height: "250px",
                          }}
                        >
                          <Box
                            className="card-overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(33,29,46,0.9) 100%)",
                              opacity: 0.4,
                              transition: "opacity 0.4s ease",
                              zIndex: 1,
                            }}
                          />
                          <CardMedia
                            component="img"
                            height="250"
                            image={`data:image/png;base64,${post.image}`}
                            alt={post.title}
                            className="card-image"
                            sx={{
                              cursor: "pointer",
                              transition:
                                "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onClick={() => handleNavigate(post.slug)}
                          />
                        </Box>
                        <CardContent
                          sx={{
                            padding: "20px",
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            zIndex: 2,
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              opacity: 0.85,
                            }}
                          >
                            <CalendarMonthIcon
                              sx={{ fontSize: 16, color: "#a1a1ff" }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#b0bec5",
                                fontWeight: 500,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {post.date || new Date().toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography
                            variant="h6"
                            component="h3"
                            onClick={() => handleNavigate(post.slug)}
                            sx={{
                              color: "#fff",
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "1.15rem",
                              fontWeight: 600,
                              lineHeight: 1.4,
                              transition: "color 0.3s ease",
                              marginTop: "4px",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#c5cae9",
                              },
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              minHeight: "calc(1.4em * 2)",
                            }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255, 255, 255, 0.75)",
                              fontWeight: 400,
                              lineHeight: 1.6,
                              fontSize: "0.875rem",
                              marginBottom: "12px",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              minHeight: "calc(1.6em * 3)",
                            }}
                          >
                            {parse(post?.description)}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => handleNavigate(post.slug)}
                            sx={{
                              mt: "auto",
                              backgroundColor: "rgba(89, 41, 215, 0.2)",
                              color: "#e0e0e0",
                              fontWeight: 500,
                              fontFamily: "Poppins, sans-serif",
                              textTransform: "capitalize",
                              fontSize: "0.875rem",
                              padding: "6px 14px",
                              borderRadius: "8px",
                              border: "1px solid #5929d7",
                              transition: "all 0.3s ease",
                              alignSelf: "flex-start",
                              "&:hover": {
                                backgroundColor: "#5929d7",
                                color: "#fff",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 10px rgba(89, 41, 215, 0.4)",
                              },
                              "& .MuiButton-endIcon": {
                                marginLeft: 1,
                                transition: "transform 0.3s ease",
                              },
                            }}
                            endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {loading && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", py: 4 }}
                  >
                    <DotLottieReact
                      src="/loading-animation.lottie"
                      loop
                      autoplay
                      speed={1.5}
                      style={{ width: "60px", height: "60px" }}
                    />
                  </Grid>
                )}
                {!hasMore && !loading && blogData.length > 0 && (
                  <Grid item xs={12} sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body2" color="rgba(255,255,255,0.6)">
                      You've reached the end!
                    </Typography>
                  </Grid>
                )}
                {!loading && blogData.length === 0 && (
                  <Grid item xs={12} sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" color="rgba(255,255,255,0.7)">
                      No blog posts found matching your criteria.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </motion.div>
      <Footer />
    </div>
  );
};

export default BlogList;