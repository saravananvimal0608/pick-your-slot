import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Star,
  Phone,
  Map,
  Share,
  Comment,
  Flag,
  Favorite,
} from "@mui/icons-material";
import { WhatsApp, Facebook, X } from "@mui/icons-material";
import BgImg from "@/Assests/video-bg.png";
import check from "@/Assests/featured/check.png";
import avatar from "@/Assests/profiles/avatar-01.jpg";
import webiste from "@/Assests/website.svg";
import coverImg from "@/Assests/gallery/gallery-01.jpg";

const HeaderImage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        backgroundImage: `url(${coverImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

const VenueDetails = ({ venueId, onBookNowClick }) => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteVenues")) || {};
    setIsFavorite(!!storedFavorites[venueId]);
  }, [venueId]);

  const toggleFavorite = () => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteVenues")) || {};
    const newStatus = !isFavorite;

    storedFavorites[venueId] = newStatus;
    setIsFavorite(newStatus);
    localStorage.setItem("favoriteVenues", JSON.stringify(storedFavorites));
  };

  const handleClickOpen = () => {
    setOpenShareModal(true);
  };

  const handleClickClose = () => {
    setOpenShareModal(false);
  };

  return (
    <>
      {/* <NavBar /> */}
      <HeaderImage />
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          backgroundImage: `url(${BgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Popins,serif",
        }}
      >
        <Container sx={{ marginTop: 5 }}>
          <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 3 }}>
            <Box sx={{ marginRight: 2 }}>
              <img
                src={avatar}
                alt="author"
                style={{ borderRadius: "50%", width: 60, height: 60 }}
              />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Poppins, serif", fontWeight: "bold" }}
              >
                Sleep In a Room in Apartment
              </Typography>{" "}
              <br />
              <Typography
                variant="body2"
                color="#fff"
                sx={{
                  textAlign: "left",
                  fontFamily: "Poppins, serif",
                  fontSize: "16px",
                }}
              >
                Luxury hotel in the heart of Blommsbury
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                {[...Array(4)].map((_, index) => (
                  <Star key={index} sx={{ color: "gold" }} />
                ))}
                <Star sx={{ color: "grey" }} />
                <Typography
                  variant="body2"
                  sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                >
                  4.5
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              sx={{
                border: "1px solid #fff",
                color: "white",
                padding: "10px 20px",
                borderRadius: 2,
                fontFamily: "Poppins, serif",
              }}
              onClick={onBookNowClick} // Use the passed prop here
            >
              <Phone /> Book Now
            </IconButton>
          </Box>
          <Divider
            sx={{
              marginY: 3,
              borderColor: "#fff",
              height: 1,
            }}
          />

          <Box sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item>
                <IconButton
                  onClick={() => {
                    const destination = encodeURIComponent("Thambaram");
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
                      "_blank"
                    );
                  }}
                  sx={{ color: "#fff" }}
                >
                  <Map />
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                  >
                    Get Directions
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href="#popup1" sx={{ color: "#fff" }}>
                  <img
                    src={webiste}
                    alt="website"
                    style={{ width: 20, marginRight: 10 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                  >
                    Website
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClickOpen} sx={{ color: "#fff" }}>
                  <Share />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    Share
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setOpenReviewModal(true)}
                  sx={{ color: "#fff" }}
                >
                  <Comment />
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                  >
                    Write a Review
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setOpenReportModal(true)}
                  sx={{ color: "#fff" }}
                >
                  <Flag />
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                  >
                    Report
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={toggleFavorite}
                  sx={{
                    color: isFavorite ? "red" : "#fff",
                    transition: "0.3s",
                  }}
                >
                  <Favorite />
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, fontFamily: "Poppins, serif" }}
                  >
                    {isFavorite ? "Favorited" : "Favorite"}
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Dialog
            open={openShareModal}
            onClose={handleClickClose}
            aria-labelledby="share-modal-title"
            aria-describedby="share-modal-description"
          >
            <DialogTitle id="share-modal-title">
              Share on Social Media
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item>
                  <IconButton
                    href="https://wa.me/"
                    target="_blank"
                    sx={{ color: "#25D366" }}
                  >
                    <WhatsApp />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      WhatsApp
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    href="https://www.facebook.com/sharer/sharer.php?u="
                    target="_blank"
                    sx={{ color: "#1877F2" }}
                  >
                    <Facebook />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      Facebook
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    href="https://twitter.com/intent/tweet?url="
                    target="_blank"
                    sx={{ color: "#1DA1F2" }}
                  >
                    <X />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      Twitter
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openReviewModal}
            onClose={() => setOpenReviewModal(false)}
            aria-labelledby="review-modal-title"
          >
            <DialogTitle id="review-modal-title">Write a Review</DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Share your experience about this venue:
              </Typography>
              <textarea
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="Write your review here..."
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenReviewModal(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => alert("Review submitted!")}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openReportModal}
            onClose={() => setOpenReportModal(false)}
            aria-labelledby="report-modal-title"
          >
            <DialogTitle id="report-modal-title">Report This Venue</DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Please select a reason for reporting:
              </Typography>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "15px",
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
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenReportModal(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!reportReason) {
                    alert("Please select a reason for reporting.");
                    return;
                  }
                  alert(`Report submitted for reason: ${reportReason}`);
                  setOpenReportModal(false);
                }}
                color="primary"
                variant="contained"
              >
                Submit Report
              </Button>
            </DialogActions>
          </Dialog>

          <Card
            sx={{
              marginTop: 5,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardHeader
              sx={{ color: "#fff", textAlign: "left" }}
              title="Listing Features"
            />
            <CardContent>
              <Grid container spacing={2}>
                {[
                  {
                    img: check,
                    label: "Room amenities",
                  },
                  {
                    img: check,
                    label: "Bathroom amenities",
                  },
                  {
                    img: check,
                    label: "Media & Technology",
                  },
                  {
                    img: check,
                    label: "Food & Security",
                  },
                  {
                    img: check,
                    label: "Services & Extra",
                  },
                  {
                    img: check,
                    label: "Outdoor & View",
                  },
                  {
                    img: check,
                    label: "Accessibility",
                  },
                  {
                    img: check,
                    label: "Safety & Security",
                  },
                ].map((feature, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={feature.img}
                      alt={feature.label}
                      style={{
                        width: 30,
                        marginRight: 10,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: 5,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontFamily: "Poppins, serif" }}
                    >
                      {feature.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default VenueDetails;
