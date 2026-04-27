"use client";
import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import BgImg from "@/Assets/footer-bg.png";

const NewsletterSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: 6,
        borderRadius: "8px",
      }}
    >
      <Image
        src={BgImg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{ zIndex: -1, position: "absolute" }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 300,
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Stay Tuned With Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              opacity: 0.9,
              mb: 3,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Subscribe to our newsletter and never miss our latest news and
            promotions. Our newsletter is sent once a week, every Thursday.
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            maxWidth: "800px",
            mx: "auto",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              backgroundColor: "white",
              borderRadius: "4px",
              alignItems: "center",
              px: 2,
            }}
          >
            <EmailIcon sx={{ color: "#666" }} />
            <TextField
              fullWidth
              variant="standard"
              placeholder="Enter Email Address"
              InputProps={{
                disableUnderline: true,
                sx: {
                  ml: 1,
                  "& input": {
                    p: 1.5,
                  },
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#211d2e",
              color: "white",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#2c2640",
              },
              whiteSpace: "nowrap",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsletterSection;
