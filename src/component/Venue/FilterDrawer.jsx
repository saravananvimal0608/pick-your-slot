import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Slider,
  Checkbox,
  FormGroup,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: "linear-gradient(145deg, #1a1a2e, #16213e)",
    color: theme.palette.common.white,
    width: 350,
    padding: theme.spacing(3),
    borderRadius: "0 16px 16px 0",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[700],
      borderRadius: "10px",
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  fontSize: "1.1rem",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  opacity: 0.9,
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.grey[500],
  "&.Mui-checked": {
    color: "#003566",
  },
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#003566",
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: "#003566",
  "& .MuiSlider-thumb": {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 8px rgba(0, 212, 255, 0.5)",
    "&:hover": {
      boxShadow: "0 0 12px rgba(0, 212, 255, 0.8)",
    },
  },
  "& .MuiSlider-track": {
    background: "linear-gradient(to right, #003566, #00b4d8)",
  },
  "& .MuiSlider-rail": {
    backgroundColor: theme.palette.grey[800],
    opacity: 0.5,
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#003566",
    color: theme.palette.common.white,
    fontWeight: 500,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey[500],
  "&.Mui-checked": {
    color: "#003566",
  },
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#003566",
  },
}));

const OrderButton = styled(Button)(({ theme, active }) => ({
  background: active
    ? "linear-gradient(45deg, #003566, #00b4d8)"
    : "transparent",
  color: active ? theme.palette.common.white : theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: "12px",
  padding: theme.spacing(1, 2),
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #003566, #00b4d8)",
    color: theme.palette.common.white,
    transform: "scale(1.05)",
  },
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #003566, #00b4d8)",
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: "1rem",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(3),
  width: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    // background: "linear-gradient(45deg, #00b4d8, #0096c7)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 53, 102, 0.2)",
  },
}));

const FilterDrawer = ({ open, onClose, onApply, amenitiesList }) => {
  const [gender, setGender] = useState("");
  const [orderByCost, setOrderByCost] = useState("");
  const [bookingCost, setBookingCost] = useState(0);
  const [amenities, setAmenities] = useState(
    Object.fromEntries(Object.keys(amenitiesList).map((key) => [key, false]))
  );

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleOrderByCostChange = (direction) => {
    setOrderByCost(direction);
  };

  const handleBookingCostChange = (event, newValue) => {
    setBookingCost(newValue);
  };

  const handleAmenityChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  const handleApply = () => {
    onApply(gender, bookingCost, orderByCost, amenities);
  };

  return (
    <StyledDrawer anchor="left" open={open} onClose={onClose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "1px",
            // background: "linear-gradient(to right, #003566, #00b4d8)",
            // WebkitBackgroundClip: "text",
            // WebkitTextFillColor: "transparent",
          }}
        >
          Filters
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "grey.400" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <StyledTypography>Gender</StyledTypography>
      <RadioGroup row value={gender} onChange={handleGenderChange}>
        <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
        <FormControlLabel
          value="female"
          control={<StyledRadio />}
          label="Female"
        />
        <FormControlLabel
          value="unisex"
          control={<StyledRadio />}
          label="Unisex"
        />
      </RadioGroup>

      <Divider sx={{ backgroundColor: "grey.800", my: 2, opacity: 0.5 }} />

      <StyledTypography>Order By Cost</StyledTypography>
      <Box display="flex" gap={2} mb={2}>
        <OrderButton
          active={orderByCost === "desc"}
          onClick={() => handleOrderByCostChange("desc")}
          startIcon={<ArrowDownwardIcon />}
        >
          ₹
        </OrderButton>
        <OrderButton
          active={orderByCost === "asc"}
          onClick={() => handleOrderByCostChange("asc")}
          startIcon={<ArrowUpwardIcon />}
        >
          ₹
        </OrderButton>
      </Box>

      <Divider sx={{ backgroundColor: "grey.800", my: 2, opacity: 0.5 }} />

      <StyledTypography>Booking Cost</StyledTypography>
      <StyledSlider
        value={bookingCost}
        onChange={handleBookingCostChange}
        min={0}
        max={10000}
        step={100}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `₹ ${value}`}
      />

      <Divider sx={{ backgroundColor: "grey.800", my: 2, opacity: 0.5 }} />

      <StyledTypography>Amenities</StyledTypography>
      <FormGroup>
        {Object.entries(amenitiesList).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <StyledCheckbox
                checked={!!amenities[key]}
                onChange={handleAmenityChange}
                name={key}
              />
            }
            label={key}
            sx={{ color: "grey.300", "&:hover": { color: "white" } }}
          />
        ))}
      </FormGroup>

      <ApplyButton onClick={handleApply}>Apply Filters</ApplyButton>
    </StyledDrawer>
  );
};

export default FilterDrawer;
