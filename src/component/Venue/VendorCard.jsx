import React from "react";
import {
  styled,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MapPin } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import logo from "@/Assets/logo2.png";

// const VendorImage = styled(CardMedia)(({}) => ({
//   minHeight: "200px",
//   maxHeight: "200px",
//   borderTopLeftRadius: "10px",
//   borderTopRightRadius: "10px",
//   backgroundColor: "#475569",
//   objectFit: "cover",
// }));

export const VendorImageWrapper = styled(Box)({
  position: "relative",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  overflow: "hidden",
  minHeight: "200px",
  maxHeight: "200px",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.2)", // adjust opacity as needed
    zIndex: 1,
  },
});

export const VendorImage = styled(CardMedia)({
  width: "100%",
  height: "100%",
  // objectFit: "cover",
  // objectFit: "contain",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 0,
});
const VendorContent = styled(CardContent)(({}) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "flex-start",
  //   background: "rgba(255, 255, 255, 0.05)",
  background: "#272a2e",
}));

const VendorTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 700,
  fontSize: { xs: "1.25rem", md: "1.5rem" },
  color: "#e2e8f0",
  marginBottom: theme.spacing(1),
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const VendorSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  color: "#94a3b8",
  marginBottom: theme.spacing(1),
  lineHeight: 1.6,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const RatingChip = styled(Chip)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "0.85rem",
  backgroundColor: "#fff",
  color: "#000",
  marginBottom: theme.spacing(2),
  borderRadius: "8px",
  zIndex: 2,
}));
const ActivityChip = styled(Chip)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "0.85rem",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  marginBottom: theme.spacing(2),
  borderRadius: "8px",
}));

const VendorCard = ({ vendor }) => {
  const theme = useTheme();
  const roueter = useRouter();

  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        background: `linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`,
        overflow: "hidden",
        position: "relative",
      }}
      key={vendor.VendorId}
      onClick={() => roueter.push(`/venue/${vendor.vendorSlug}`)}
    >
      {/* <VendorImage
        component="img"
        image={`data:image/png;base64,${vendor.vendorImage}`}
        alt={`${vendor.vendorName} image`}
      /> */}
      <VendorImageWrapper>
        <VendorImage
          component="img"
          image={
            vendor?.vendorImage !== null
              ? `data:image/png;base64,${vendor.vendorImage}`
              : logo.src
          }
          alt={`${vendor.vendorName} image`}
          style={{
            objectFit: vendor?.vendorImage !== null ? "cover" : "contain",
            opacity: vendor?.vendorImage !== null ? "1" : "0.5",
            padding: vendor?.vendorImage !== null ? "0px" : "5px",
          }}
        />
      </VendorImageWrapper>
      {vendor?.rating !== 0 && (
        <RatingChip
          label={`${vendor?.rating}.0 (${vendor?.customerRatingCount})`}
          icon={<StarIcon style={{ color: "#ffca28" }} />}
          size="small"
          sx={{ fontSize: "10px", position: "absolute", left: 5, top: 160 }}
        />
      )}
      <VendorContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <VendorTitle>{vendor.vendorName}</VendorTitle>
          <ActivityChip
            label={vendor.activity}
            size="small"
            sx={{ fontSize: "10px" }}
          />
        </Box>
        <VendorSubtitle>
          <MapPin size={10} style={{ marginTop: 5 }} /> &nbsp;
          {vendor.area}
        </VendorSubtitle>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            value={vendor?.rating}
            readOnly
            precision={0.1}
            sx={{ color: "#ffca28" }}
            emptyIcon={<Star style={{ color: "#555" }} fontSize="inherit" />}
          />
          <Typography
            variant="body2"
            color="#b0bec5"
            fontWeight={500}
            sx={{ ml: 1 }}
          >
            {vendor?.rating}
          </Typography>
        </Box> */}
      </VendorContent>
    </Card>
  );
};

export default VendorCard;
