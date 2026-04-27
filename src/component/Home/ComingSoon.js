import React from "react";
import { Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/Assets/logo2.png";
import ComingSoonImg from "@/Assets/comming Soon.png";
import BgImg from "@/Assets/video-bg.png";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ComingSoon = () => {
  return (
    <>
    <NavBar />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundImage: `url(${BgImg.src})`, // Use the .src property
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        px: 2,
      }}
    >

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          fontWeight: "bold",
          fontSize: { xs: "30px", md: "45px" },
          fontFamily: "Encode Sans, sans-serif",
        }}
      >
        We are Updating Soon in <br />
        Your Nearby Location
      </Typography>

      {/* Coming Soon Image */}
      <Box sx={{ mt: -2, mb: 3 }}>
        <Image
          src={ComingSoonImg}
          alt="Coming Soon"
          width={500}
          height={300}
          style={{ maxWidth: "100%", maxHeight: "50vh", width: "auto" }}
        />
      </Box>

      {/* Back to Home Button */}
      <Link href="/" passHref>
        <Button
          variant="contained"
          sx={{
            borderRadius: "50px",
            backgroundColor: "#fff",
            color: "black",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            px: 4,
            py: 1,
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Box>
    <Footer />
    </>
  );
};

export default ComingSoon;