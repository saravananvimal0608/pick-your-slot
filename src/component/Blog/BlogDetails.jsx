"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Share as ShareIcon,
  Facebook,
  Twitter,
  WhatsApp,
  Instagram,
  Link as LinkIcon,
  Close as CloseIcon, 
} from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import parse from "html-react-parser";
import { Poppins } from "next/font/google";
import Footer from "../Home/Footer";
import NavBar from "../Home/NavBar";
import { ImageUrl } from "@/controller/common";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const defaultBlogDetails = {
  title: "Blog Post Title",
  date: new Date().toISOString(),
  image: null,
  description: "<p>Loading content...</p>",
  author: "Pickyourslot",
};

export default function BlogDetails({ blogDetails = defaultBlogDetails }) {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [minHeight, setMinHeight] = useState("70vh");
  const [currentUrl, setCurrentUrl] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy Link");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // console.log("Blog Details:", blogDetails);
  

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => setMinHeight("60vh"), 500);
    return () => clearTimeout(timeout);
  }, []);

useEffect(() => {
  if (blogDetails?.date) {
    setFormattedDate(moment(blogDetails.date).format("MMMM DD, YYYY"));
  } else {
    setFormattedDate("Date not available");
  }

  if (blogDetails?.keyBlog) {
    setBackgroundImage(
      `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${blogDetails.keyBlog})`
    );
  } else {
    setBackgroundImage(
      "linear-gradient(to bottom, rgba(20, 20, 30, 0.9), rgba(10, 10, 15, 0.9))"
    );
  }
}, [blogDetails]);

  const handleOpenShareModal = () => {
    setOpenShareModal(true);
    setCopyStatus("Copy Link");
  };

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };

  const handleCopyLink = useCallback(async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopyStatus("Copied!");
      setSnackbarOpen(true);
      setTimeout(() => setCopyStatus("Copy Link"), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyStatus("Failed");
      setTimeout(() => setCopyStatus("Copy Link"), 2000);
    }
  }, [currentUrl]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!blogDetails) {
    return (
      <>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#0a0a0f",
          }}
        >
          <CircularProgress color="inherit" sx={{ color: "#fff" }} />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Box sx={{ backgroundColor: "#0a0a0f", color: "#e0e0e0" }}>
        <Box
          sx={{
            padding: { xs: "60px 16px", sm: "80px 24px", md: "100px 32px" },
            background: "linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)",
            mt: { xs: 5, md: 5 },
          }}
        >
          <Container maxWidth="md">
            <Typography
              fontWeight={800}
              className={poppins.className}
              sx={{
                fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.5rem" },
                letterSpacing: "-0.03em",
                marginBottom: 3,
                lineHeight: 1.15,
                textAlign: "center",
                color: "#ffffff",
                textShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              {blogDetails?.title || "Blog Post Title"}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 1.5, sm: 4 }}
              sx={{ opacity: 0.85, mb: 6 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarTodayIcon fontSize="small" sx={{ color: "#a0a0b0" }} />
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ color: "#c0c0d0" }}
                >
                  {formattedDate}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ color: "#c0c0d0" }}
                >
                  By:
                </Typography>
                <Typography
                  component="a"
                  href="https://pickyourslot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: 600,
                    borderBottom: "1px solid transparent",
                    transition: "color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      color: "#4dabf7",
                      borderBottomColor: "#4dabf7",
                    },
                  }}
                >
                  {blogDetails?.author || "Pickyourslot"}
                </Typography>
              </Stack>
            </Stack>

            <Box
              sx={{
                position: "relative",
                background:
                  backgroundImage || "linear-gradient(to bottom, #222, #111)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: { xs: "40vh", sm: "50vh", md: minHeight },
                display: "flex",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                transition: "min-height 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)",
                mb: { xs: 6, md: 8 },
              }}
            />
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ pb: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              padding: { xs: "32px", sm: "48px", md: "64px" },
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              component="div"
              className={poppins.className}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
                color: "#d0d0d5",
                textAlign: "left",

                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  fontFamily: "'Poppins', sans-serif",
                  color: "#ffffff",
                  fontWeight: 700,
                  lineHeight: 1.4,
                  mt: { xs: 4, md: 5 },
                  mb: 2,
                  letterSpacing: "-0.01em",
                },
                "& h1": { fontSize: { xs: "2rem", md: "2.5rem" } },
                "& h2": { fontSize: { xs: "1.75rem", md: "2.1rem" } },
                "& h3": { fontSize: { xs: "1.5rem", md: "1.7rem" } },
                "& p": {
                  marginBottom: "1.5em",
                  color: "#c5c5cc",
                },
                "& a": {
                  color: "#69b1ff",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(105, 177, 255, 0.5)",
                  transition:
                    "color 0.3s ease, text-decoration-color 0.3s ease",
                  "&:hover": {
                    color: "#9accff",
                    textDecorationColor: "rgba(154, 204, 255, 0.8)",
                  },
                },
                "& strong, & b": {
                  fontWeight: 600,
                  color: "#ffffff",
                },
                "& ul, & ol": {
                  paddingLeft: { xs: 3, md: 4 },
                  marginBottom: "1.5em",
                  color: "#c5c5cc",
                },
                "& li": {
                  marginBottom: "0.8em",
                  lineHeight: 1.7,
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  display: "block",
                  margin: "2em auto",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                },
                "& blockquote": {
                  borderLeft: "4px solid #4dabf7",
                  paddingLeft: "1.5em",
                  margin: "2em 0",
                  fontStyle: "italic",
                  color: "#a0a0b0",
                },
                "& code": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "0.2em 0.4em",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                  fontFamily: "monospace",
                  color: "#f0f0f0",
                },
                "& pre": {
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  padding: "1em",
                  borderRadius: "8px",
                  overflowX: "auto",
                  my: "2em",
                  "& code": {
                    backgroundColor: "transparent",
                    padding: 0,
                  },
                },
              }}
            >
              {parse(
                blogDetails?.description || "<p>Content not available.</p>"
              )}
            </Typography>

            <Box
              sx={{
                marginTop: { xs: 6, md: 8 },
                padding: { xs: 3, md: 4 },
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 28px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Grid container alignItems="center" spacing={{ xs: 3, sm: 2 }}>
                <Grid item xs={12} sm="auto" display="flex" alignItems="center">
                  <IconButton
                    onClick={handleOpenShareModal}
                    aria-label="Share this post"
                    sx={{
                      backgroundColor: "#ffffff",
                      color: "#0a0a0f",
                      padding: "10px",
                      transition: "all 0.3s ease",
                      mr: 1.5,
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <ShareIcon fontSize="medium" />
                  </IconButton>
                  <Typography
                    fontWeight={600}
                    className={poppins.className}
                    sx={{
                      color: "#ffffff",
                      fontSize: "1rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Share This Post
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm
                  display="flex"
                  flexWrap="wrap"
                  gap={1.5}
                  justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                >
                  {[
                    "Badminton",
                    "Cricket",
                    "Swimming",
                    "Pickleball",
                    "Gym",
                    "Salon",
                  ].map((tag) => (
                    <Button
                      key={tag}
                      variant="outlined"
                      size="small"
                      className={poppins.className}
                      sx={{
                        color: "#b0b0c0",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "16px",
                        px: 2,
                        py: 0.5,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          cursor: "text",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(255, 255, 255, 0.4)",
                          color: "#ffffff",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Dialog
          open={openShareModal}
          onClose={handleCloseShareModal}
          PaperProps={{
            sx: {
              borderRadius: "20px",
              backgroundColor: "#f8f9fa",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
              width: { xs: "90%", sm: "450px" },
              position: "relative",
            },
          }}
        >
          <DialogTitle
            className={poppins.className}
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1.4rem",
              pb: 1, 
              pt: 3, 
              color: "#1a1a2e",
              position: "relative",
            }}
          >
            Share via
            <IconButton
              aria-label="close"
              onClick={handleCloseShareModal}
              sx={{
                position: "absolute",
                right: 12, 
                top: 12, 
                color: (theme) => theme.palette.grey[600], 
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2, px: 3 }}>
            {" "}
            {/* Added horizontal padding */}
            <Grid container spacing={2} justifyContent="center">
              {[
                {
                  icon: WhatsApp,
                  color: "#25D366",
                  name: "WhatsApp",
                  url: `https://wa.me/?text=${encodeURIComponent(
                    blogDetails?.title || ""
                  )}%20${encodeURIComponent(currentUrl)}`,
                },
                {
                  icon: Facebook,
                  color: "#1877F2",
                  name: "Facebook",
                  url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                  )}`,
                },
                {
                  icon: Twitter,
                  color: "#1DA1F2",
                  name: "Twitter",
                  url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentUrl
                  )}&text=${encodeURIComponent(blogDetails?.title || "")}`,
                },
                {
                  icon: Instagram,
                  color: "#E1306C",
                  name: "Instagram",
                  url: `https://www.instagram.com/`,
                },
              ].map((item) => (
                <Grid
                  item
                  key={item.name}
                  xs={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <IconButton
                    component="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${item.name}`}
                    sx={{
                      color: item.color,
                      backgroundColor: `${item.color}20`,
                      width: 56,
                      height: 56,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.1)",
                        backgroundColor: `${item.color}30`,
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <item.icon fontSize="medium" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    textAlign="center"
                    className={poppins.className}
                    sx={{ mt: 1, color: "#343a40", fontWeight: 500 }}
                  >
                    {item.name}
                  </Typography>
                </Grid>
              ))}

              <Grid
                item
                xs={12}
                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  onClick={handleCopyLink}
                  startIcon={<LinkIcon />}
                  disabled={copyStatus !== "Copy Link"}
                  className={poppins.className}
                  sx={{
                    backgroundColor:
                      copyStatus === "Copied!" ? "#28a745" : "#6c757d",
                    color: "#ffffff",
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    transition:
                      "background-color 0.3s ease, transform 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        copyStatus === "Copied!" ? "#218838" : "#5a6268",
                      transform: "scale(1.03)",
                    },
                    "&:disabled": {
                      backgroundColor: "#28a745",
                      color: "#ffffff",
                      opacity: 0.8,
                    },
                  }}
                >
                  {copyStatus}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%", borderRadius: "8px", boxShadow: 3 }}
          >
            Link copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
      <Footer />
    </>
  );
}
