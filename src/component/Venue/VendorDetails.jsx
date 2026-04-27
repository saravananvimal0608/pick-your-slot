"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "@mui/icons-material/Map";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import AdjustIcon from "@mui/icons-material/Adjust";
import FlagIcon from "@mui/icons-material/Flag";
import Tooltip from "@mui/material/Tooltip";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import BgImg from "@/Assets/video-bg.png";
import avatar from "@/Assets/avatar-01.jpg";
import qrcode from "@/Assets/pys_qr.jpg";
import andlogo from "@/Assets/playstore.png";
import iphonelogo from "@/Assets/iphone.png";
import NavBar from "@/component/Home/NavBar";
import { Dot } from "lucide-react";
import Carousel from "./Carousel";
import { BaseUrl, ImageUrl } from "@/controller/common";
import Footer from "../Home/Footer";

// Updated HeaderImage component to handle multiple images with slideshow
const HeaderImage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: 300, md: 500 },
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No image available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 300, md: 500 },
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Image
        src={images[currentImageIndex]}
        alt={`Venue Image ${currentImageIndex + 1}`}
        fill
        style={{
          objectFit: "cover",
          filter: "brightness(0.85)",
          borderRadius: "20px",
        }}
        priority
      />
      {images.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            zIndex: 2,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor:
                  index === currentImageIndex
                    ? "white"
                    : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </Box>
      )}
      {images.length > 1 && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }
          >
            ←
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }
          >
            →
          </IconButton>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 1,
            fontSize: "0.875rem",
            zIndex: 2,
          }}
        >
          {currentImageIndex + 1} / {images.length}
        </Box>
      )}
    </Box>
  );
};

const VendorDetails = ({ data, imageKey, galleryImage }) => {
  // console.log("galleryImage", galleryImage);

  const imageKeys = Array.isArray(imageKey)
    ? imageKey
    : imageKey
    ? [imageKey]
    : [];
  const galleryImages = Array.isArray(galleryImage)
    ? galleryImage
    : galleryImage
    ? [galleryImage]
    : [];
  const [currentUrl, setCurrentUrl] = useState("");
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [openRewardDialog, setOpenRewardDialog] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const initialImages = [];
    if (imageKeys && imageKeys.length > 0) {
      imageKeys.forEach((key) => {
        initialImages.push(
          `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${key}`
        );
      });
    } else if (data.VendorImage) {
      initialImages.push(`data:image/png;base64,${data.VendorImage}`);
    } else {
      initialImages.push("/default-image.jpg");
    }
    if (galleryImages && galleryImages.length > 0) {
      galleryImages.forEach((img) => {
        initialImages.push(img);
      });
    }

    setImages(initialImages);
  }, [data.VendorImage, imageKeys, galleryImages]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.scrollTo(0, 0);
  }, []);

  const onOpenRewardDialog = () => {
    setOpenRewardDialog(true);
  };

  const onCloseRewardDialog = (event) => {
    event.stopPropagation();
    setOpenRewardDialog(false);
  };

  const handleClickOpen = () => setOpenShareModal(true);
  const handleClickClose = () => setOpenShareModal(false);

  const formatTime = ({ hour, minute }) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          backgroundImage: `url(${BgImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          minHeight: "100vh",
          py: 6,
          marginTop: 10,
          fontFamily: "Poppins, serif",
        }}
      >
        <Container maxWidth="lg">
          <HeaderImage images={images} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              padding: { xs: "20px 20px 20px 0px", md: "50px 20px 20px 0px" },
              gap: { xs: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "18px", md: "20px" },
                    color: "#f0f5f4",
                  }}
                >
                  {data.VendorName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "18px", md: "20px" },
                    color: "#9b9e9e",
                    textAlign: "left",
                    letterSpacing: 1,
                  }}
                >
                  {data.City}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: 3,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <AdjustIcon fontSize="small" />
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "14px", md: "16px" },
                    color: "#fafffe",
                  }}
                >
                  {data.Activity}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  {[...Array(5)].map((_, index) => (
                    <Tooltip key={index} title={`Rating: ${index + 1}`}>
                      {index + 1 <= data?.Ratings ? (
                        <StarIcon
                          sx={{
                            color: "#FFCA28",
                            fontSize: "1.4rem",
                            "&:hover": { color: "#FFB300" },
                          }}
                        />
                      ) : (
                        <StarBorderIcon
                          sx={{
                            color: "#90A4AE",
                            fontSize: "1.4rem",
                            "&:hover": { color: "#B0BEC5" },
                          }}
                        />
                      )}
                    </Tooltip>
                  ))}
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "0.9rem",
                      color: "gold",
                    }}
                  >
                    ({data?.Ratings || 0}/5)
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: { xs: 3, md: 0 },
                width: { xs: "100%", md: "100%" },
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
                onClick={onOpenRewardDialog}
                sx={{
                  background: `radial-gradient(circle,#517fe2 0%,  #2745db 100%)`,
                  color: "#fff",
                  px: 3,
                  py: 1.5,
                  borderRadius: 8,
                  fontWeight: "bold",
                  width: { xs: "100%", sm: "auto" },
                  transition:
                    "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    bgcolor: "#00897B",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Book Now
              </Button>
            </Box>
          </Box>

          <Dialog
            open={openRewardDialog}
            onClose={onCloseRewardDialog}
            maxWidth="sm"
            fullWidth
            sx={{
              "& .MuiDialog-paper": {
                borderRadius: "24px",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
                padding: "28px",
                width: "90vw",
                maxWidth: "800px",
                background:
                  "linear-gradient(145deg, #001427 0%, #002870 60%, #004899 100%)",
                color: "white",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 100 }}>
              <IconButton
                onClick={onCloseRewardDialog}
                aria-label="close dialog"
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(4px)",
                  width: "36px",
                  height: "36px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    transform: "scale(1.1) rotate(90deg)",
                    transition:
                      "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogTitle
              sx={{
                fontSize: { xs: "28px", sm: "36px" },
                fontWeight: 800,
                textAlign: "left",
                color: "#ffffff",
                pt: 2,
                pb: 1,
                letterSpacing: "0.5px",
                lineHeight: 1.1,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "60px",
                  height: "3px",
                  background: "linear-gradient(90deg, #00d4ff, #0088ff)",
                  borderRadius: "2px",
                },
              }}
            >
              A Slot Awaits You!
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  fontWeight: 500,
                  opacity: 0.9,
                  fontSize: { xs: "20px", sm: "24px" },
                }}
              >
                Scan the QR Code
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ padding: "24px 0", overflow: "visible" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: { xs: 2, sm: 4 },
                  gap: { xs: 4, sm: 3 },
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "55%" } }}>
                  <Box component="ul" sx={{ pl: 0, mt: 1 }}>
                    {[
                      "Open your mobile scanner and aim it at the QR code.",
                      "Or download a QR scanner app to proceed.",
                      "Tap the generated link to download the app.",
                    ].map((text, index) => (
                      <Typography
                        key={index}
                        component="li"
                        variant="body1"
                        sx={{
                          color: "#f0f0f0",
                          mb: 2.5,
                          fontSize: "16px",
                          listStyleType: "none",
                          position: "relative",
                          pl: "32px",
                          display: "flex",
                          alignItems: "center",
                          "&:before": {
                            content: '""',
                            position: "absolute",
                            left: "0",
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0, 212, 255, 0.15)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          },
                          "&:after": {
                            content: `"${index + 1}"`,
                            position: "absolute",
                            left: "7px",
                            color: "#00d4ff",
                            fontWeight: "bold",
                            fontSize: "14px",
                          },
                        }}
                      >
                        {text}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mt: { xs: 4, sm: 5 },
                      mb: 2,
                      justifyContent: { xs: "center", sm: "flex-start" },
                      gap: "20px",
                    }}
                  >
                    {[
                      {
                        src: andlogo,
                        alt: "Google Play Store",
                        href: "https://play.google.com/store/apps/details?id=com.pyscustomer&hl=en_IN",
                      },
                      {
                        src: iphonelogo,
                        alt: "Apple App Store",
                        href: "https://apps.apple.com/in/app/pick-your-slot/id1614806838",
                      },
                    ].map((store, index) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={store.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download from ${store.alt}`}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          padding: "12px",
                          borderRadius: "12px",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.08)",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                      >
                        <Image
                          src={store.src}
                          alt={store.alt}
                          style={{ width: "36px", height: "36px" }}
                        />
                      </IconButton>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", sm: "45%" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: 2, sm: 0 },
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(0,136,255,0.05) 50%, rgba(0,0,0,0) 70%)",
                      animation: "pulse 2s infinite ease-in-out",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(0.95)", opacity: 0.7 },
                        "50%": { transform: "scale(1.05)", opacity: 0.9 },
                        "100%": { transform: "scale(0.95)", opacity: 0.7 },
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 160, sm: 200 },
                      height: { xs: 160, sm: 200 },
                      backgroundColor: "white",
                      borderRadius: "16px",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                      position: "relative",
                      transition:
                        "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "scale(1.05) rotate(2deg)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: "4px",
                        borderRadius: "12px",
                        border: "1px dashed rgba(0, 0, 0, 0.1)",
                        pointerEvents: "none",
                      },
                    }}
                  >
                    <Image
                      src={qrcode}
                      alt="QR Code"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />
          <Box padding={"20px 20px 20px 0px"}>
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Address
            </Typography>
            <br />
            <Typography
              sx={{
                color: "#d9dedd",
                fontWeight: "400",
                fontSize: "16px",
                textAlign: "left",
                letterSpacing: 1,
              }}
            >
              {data.Area}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                mt: 1,
              }}
            >
              <AccessTimeIcon />
              &nbsp;
              <Typography
                sx={{
                  color: "#d9dedd",
                  fontWeight: "400",
                  fontSize: "16px",
                  textAlign: "left",
                  letterSpacing: 1,
                }}
              >
                {formatTime(data.OpeningTime)} - {formatTime(data.ClosingTime)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                gap: 4,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                startIcon={<MapIcon />}
                href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                sx={{
                  background: `linear-gradient(0deg,rgba(182, 191, 191, 1) 0%, #abacad 100%)`,
                  color: "#171616",
                  px: 3,
                  py: 1.5,
                  borderRadius: 8,
                  fontWeight: "bold",
                  transition:
                    "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    bgcolor: "#fcffff",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    color: "black",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Get Directions
              </Button>
              <Button
                variant="contained"
                startIcon={<ShareIcon />}
                onClick={handleClickOpen}
                sx={{
                  background: `linear-gradient(0deg,rgba(182, 191, 191, 1) 0%, #abacad 100%)`,
                  color: "#171616",
                  px: 3,
                  py: 1.5,
                  borderRadius: 8,
                  fontWeight: "bold",
                  transition:
                    "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    bgcolor: "#fcffff",
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    color: "black",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Share
              </Button>
            </Box>
          </Box>
          <Dialog
            open={openShareModal}
            onClose={() => setOpenShareModal(false)}
            PaperProps={{
              sx: {
                borderRadius: "16px",
                padding: "16px",
                backgroundColor: "#fff",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "1.5rem",
                pb: 1,
              }}
            >
              Share This Post
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    icon: WhatsAppIcon,
                    color: "#25D366",
                    name: "WhatsApp",
                    url: `https://wa.me/?text=${encodeURIComponent(
                      currentUrl
                    )}`,
                  },
                  {
                    icon: FacebookIcon,
                    color: "#1877F2",
                    name: "Facebook",
                    url: `https://www.facebook.com/share_channel?u=${encodeURIComponent(
                      currentUrl
                    )}`,
                  },
                  {
                    icon: TwitterIcon,
                    color: "#1DA1F2",
                    name: "Twitter",
                    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      currentUrl
                    )}`,
                  },
                  {
                    icon: InstagramIcon,
                    color: "#E1306C",
                    name: "Instagram",
                    url: `https://www.instagram.com/?url=${encodeURIComponent(
                      currentUrl
                    )}`,
                  },
                ].map((item, index) => (
                  <Grid item key={index}>
                    <IconButton
                      href={item.url}
                      target="_blank"
                      sx={{
                        color: item.color,
                        backgroundColor: `${item.color}20`,
                        p: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.15)",
                          backgroundColor: `${item.color}40`,
                        },
                      }}
                    >
                      <item.icon fontSize="large" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{ mt: 1, color: "#333" }}
                    >
                      {item.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenShareModal(false)}
                sx={{
                  color: "#fff",
                  backgroundColor: "#0a0a0f",
                  borderRadius: "20px",
                  px: 3,
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openReviewModal}
            onClose={() => setOpenReviewModal(false)}
            sx={{ "& .MuiPaper-root": { borderRadius: 3 } }}
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              Write a Review
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 2 }}>
                Share your experience about this venue:
              </Typography>
              <textarea
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  resize: "none",
                  fontFamily: "Poppins, serif",
                }}
                placeholder="Write your review here..."
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenReviewModal(false)}
                sx={{ color: "#FF5252" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => alert("Review submitted!")}
                variant="contained"
                sx={{ bgcolor: "#FFD700", color: "#000" }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openReportModal}
            onClose={() => setOpenReportModal(false)}
            sx={{ "& .MuiPaper-root": { borderRadius: 3 } }}
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              Report This Venue
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 2 }}>
                Please select a reason for reporting:
              </Typography>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  mb: 2,
                  fontFamily: "Poppins, serif",
                }}
              >
                <option value="">Select a reason</option>
                <option value="Spam">Spam</option>
                <option value="Inappropriate Content">
                  Inappropriate Content
                </option>
                <option value="Fake Listing">Fake Listing</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                rows="3"
                placeholder="Additional details (optional)"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontFamily: "Poppins, serif",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenReportModal(false)}
                sx={{ color: "#FF5252" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!reportReason)
                    return alert("Please select a reason for reporting.");
                  alert(`Report submitted for reason: ${reportReason}`);
                  setOpenReportModal(false);
                }}
                variant="contained"
                sx={{ bgcolor: "#FFD700", color: "#000" }}
              >
                Submit Report
              </Button>
            </DialogActions>
          </Dialog>
          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />
          <Box padding={"20px 20px 20px 0px"}>
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Activities
            </Typography>
            <Grid container spacing={3} marginTop={"10px"}>
              {data.SubActivities.map((activity, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IndeterminateCheckBoxIcon
                    style={{ color: "#4555ce", fontSize: "1.5rem" }}
                  />
                  &nbsp; &nbsp;
                  <Typography
                    sx={{
                      color: "#e8dfdf",
                      fontSize: "1rem",
                      fontFamily: "poppins",
                    }}
                  >
                    {activity.subActivityType}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />
          <Box padding={"20px 20px 20px 0px"} marginBottom={10}>
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Amenities
            </Typography>
            <Grid container spacing={3} marginTop={"10px"}>
              {data.Amenities.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IndeterminateCheckBoxIcon
                    style={{ color: "#4555ce", fontSize: "1.5rem" }}
                  />
                  &nbsp; &nbsp;
                  <Typography
                    sx={{
                      color: "#e8dfdf",
                      fontSize: "1rem",
                      fontFamily: "poppins",
                    }}
                  >
                    {feature}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default VendorDetails;
