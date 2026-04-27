"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { toast, Toaster } from "sonner";
import {
  Clock,
  MapPin,
  Building,
  User,
  CreditCard,
  Banknote as Bank,
  Calendar,
  ChevronRight,
} from "lucide-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import { BaseUrl } from "@/controller/common";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
    secondary: { main: "#ec407a", light: "#f06292", dark: "#c2185b" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#212121", secondary: "#757575" },
    error: { main: "#d32f2f" },
  },
  shape: { borderRadius: 16 },
  typography: {
    h3: { fontWeight: 700, letterSpacing: "-0.02em", fontSize: "2.5rem" },
    h6: { fontWeight: 600, fontSize: "1.25rem", color: "#424242" },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
    caption: { color: "#757575", fontSize: "0.875rem" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          padding: "14px 28px",
          fontSize: "1.1rem",
          fontWeight: 700,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)" },
          "&.Mui-disabled": {
            backgroundColor: "#bdbdbd",
            color: "#757575",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#fff",
            "& fieldset": { borderColor: "#e0e0e0" },
            "&:hover fieldset": { borderColor: "#1976d2" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: "#bdbdbd", "&.Mui-checked": { color: "#1976d2" } },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: { color: "#bdbdbd", "&.Mui-checked": { color: "#1976d2" } },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "1rem",
          padding: "8px 16px",
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
        },
      },
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
}));

const Register = () => {
  const initialFormData = {
    shopName: "",
    ownerName: "",
    mobileNo: "",
    supervisorName: "",
    supervisorMobile: "",
    supervisorEmail: "",
    secondaryEmail: "",
    otherBranch: "",
    openTime: null,
    closeTime: null,
    area: "",
    address: "",
    latitude: "",
    longitude: "",
    activities: {
      gym: {
        selected: false,
        subActivities: {
          gymTraining: false,
          coach: false,
          personalTrainer: false,
        },
      },
      salon: {
        selected: false,
        subActivities: { hairCut: false, styling: false, coloring: false },
      },
      beautyParlour: {
        selected: false,
        subActivities: { facial: false, makeup: false, waxing: false },
      },
      yoga: {
        selected: false,
        subActivities: { meditation: false, asanas: false, pranayama: false },
      },
      music: {
        selected: false,
        subActivities: { guitar: false, piano: false, singing: false },
      },
      dance: {
        selected: false,
        subActivities: { hipHop: false, ballet: false, contemporary: false },
      },
      zumba: {
        selected: false,
        subActivities: { cardio: false, strength: false, flexibility: false },
      },
      crossFit: {
        selected: false,
        subActivities: {
          weightLifting: false,
          cardio: false,
          endurance: false,
        },
      },
      karate: {
        selected: false,
        subActivities: { kata: false, kumite: false, selfDefense: false },
      },
      silambam: {
        selected: false,
        subActivities: { kickboxing: false, strength: false, agility: false },
      },
      swimmingPool: {
        selected: false,
        subActivities: { freestyle: false, backstroke: false, diving: false },
      },
      cricket: {
        selected: false,
        subActivities: { batting: false, bowling: false, fielding: false },
      },
      netPractice: {
        selected: false,
        subActivities: { batting: false, bowling: false, drills: false },
      },
      boxCricket: {
        selected: false,
        subActivities: { shortPitch: false, indoor: false, teamPlay: false },
      },
      badminton: {
        selected: false,
        subActivities: { singles: false, doubles: false, smashTraining: false },
      },
      tennis: {
        selected: false,
        subActivities: { singles: false, doubles: false, servePractice: false },
      },
      football: {
        selected: false,
        subActivities: { dribbling: false, shooting: false, passing: false },
      },
      kickBoxing: {
        selected: false,
        subActivities: { punching: false, kicking: false, conditioning: false },
      },
      archery: {
        selected: false,
        subActivities: { target: false, longRange: false, precision: false },
      },
      pickleBall: {
        selected: false,
        subActivities: { singles: false, doubles: false, volley: false },
      },
      skating: {
        selected: false,
        subActivities: { inline: false, roller: false, speed: false },
      },
      mixedMartialArts: {
        selected: false,
        subActivities: { grappling: false, striking: false, jiuJitsu: false },
      },
    },
    amenities: {
      ac: false,
      cardAccepted: false,
      carParking: false,
      restRoom: false,
      locker: false,
      drinkingWater: false,
      ups: false,
      firstAidBox: false,
      refreshRoom: false,
      streamBath: false,
    },
    slotType: "",
    gender: "",
    courtsAllocated: "",
    chairsOrWashBay: "",
    remarks: "",
    courtAvailability: {
      mondayToFriday: { open: null, close: null },
      saturday: { open: null, close: null },
      sunday: { open: null, close: null },
    },
    noOfCourtsAvailable: "",
    noOfSlotsPerBooking: "",
    maxAllowedPersonsPerTeam: "",
    perHourBookingCost: {
      mondayToFriday: "",
      saturday: "",
      sunday: "",
    },
    bankAccountHolder: "",
    bankName: "",
    accountNumber: "",
    bankBranch: "",
    ifscCode: "",
    holderContactNumber: "",
    accountType: "",
    paymentMode: "",
    paymentDetails: {
      gpay: "",
      phonepe: "",
      upiId: "",
    },
  };

  // Initialize errors state for all fields
  const initialErrors = {
    shopName: "",
    ownerName: "",
    mobileNo: "",
    supervisorName: "",
    supervisorMobile: "",
    supervisorEmail: "",
    secondaryEmail: "",
    otherBranch: "",
    openTime: "",
    closeTime: "",
    area: "",
    address: "",
    latitude: "",
    longitude: "",
    activities: "",
    slotType: "",
    gender: "",
    courtsAllocated: "",
    chairsOrWashBay: "",
    remarks: "",
    courtAvailability: {
      mondayToFriday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
    noOfCourtsAvailable: "",
    noOfSlotsPerBooking: "",
    maxAllowedPersonsPerTeam: "",
    perHourBookingCost: {
      mondayToFriday: "",
      saturday: "",
      sunday: "",
    },
    bankAccountHolder: "",
    bankName: "",
    accountNumber: "",
    bankBranch: "",
    ifscCode: "",
    holderContactNumber: "",
    accountType: "",
    paymentMode: "",
    paymentDetails: {
      gpay: "",
      phonepe: "",
      upiId: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(
    Object.keys(formData.activities)
  );
  const [mobileExists, setMobileExists] = useState(false);

  // Validation regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountNumberRegex = /^[0-9]{9,18}$/;

  const checkVendorNumberExists = async (mobileNo) => {
    try {
      const response = await axios.get(
        `/api/service/rest/vendorRegistration/getisVendorNumExists?vendorNumber=${mobileNo}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking vendor number:", error);
      toast.error("Failed to validate mobile number. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();
  }, []);

  useEffect(() => {
    const activities = Object.keys(formData.activities);
    const filtered = activities.filter((activity) =>
      activity.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm, formData.activities]);

  const validateField = (name, value) => {
    switch (name) {
      case "shopName":
      case "ownerName":
      case "supervisorName":
      case "area":
      case "bankAccountHolder":
      case "bankName":
      case "bankBranch":
      case "remarks":
        return value.trim() ? "" : `${name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`;
      case "mobileNo":
      case "supervisorMobile":
      case "holderContactNumber":
        return mobileRegex.test(value) ? "" : "Must be a valid 10-digit mobile number";
      case "supervisorEmail":
        return value.trim() ? (emailRegex.test(value) ? "" : "Invalid email format") : "Email is required";
      case "secondaryEmail":
        return value.trim() ? (emailRegex.test(value) ? "" : "Invalid email format") : "";
      case "accountNumber":
        return accountNumberRegex.test(value) ? "" : "Must be a valid account number (9-18 digits)";
      case "ifscCode":
        return ifscRegex.test(value) ? "" : "Must be a valid IFSC code (e.g., SBIN0001234)";
      case "accountType":
        return value.trim() ? "" : "Account type is required";
      case "noOfCourtsAvailable":
      case "noOfSlotsPerBooking":
      case "maxAllowedPersonsPerTeam":
        return value && !isNaN(value) && parseInt(value) > 0 ? "" : "Must be a positive number";
      case "perHourBookingCost.mondayToFriday":
      case "perHourBookingCost.saturday":
      case "perHourBookingCost.sunday":
        return value && !isNaN(value) && parseFloat(value) >= 0 ? "" : "Must be a valid amount";
      case "paymentMode":
        return value ? "" : "Payment mode is required";
      case "slotType":
        return value ? "" : "Slot type is required";
      case "gender":
        return value ? "" : "Gender is required";
      case "courtsAllocated":
        return value ? "" : "Number of courts is required";
      case "address":
        return value.trim() ? "" : "Address is required";
      case "latitude":
      case "longitude":
        return value ? "" : "Please select a valid address";
      default:
        return "";
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "mobileNo" && mobileRegex.test(value)) {
      const exists = await checkVendorNumberExists(value);
      setMobileExists(exists);
      setErrors((prev) => ({
        ...prev,
        mobileNo: exists ? "Mobile number already exists" : error,
      }));
    } else if (name === "mobileNo") {
      setMobileExists(false);
    }
  };

  const handleNestedInputChange = (category, subCategory, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [field]: value,
        },
      },
    }));

    // Validate nested fields if necessary
    if (category === "courtAvailability") {
      const error = value ? "" : `${subCategory.replace(/([A-Z])/g, " $1")} time is required`;
      setErrors((prev) => ({
        ...prev,
        courtAvailability: {
          ...prev.courtAvailability,
          [subCategory]: {
            ...prev.courtAvailability[subCategory],
            [field]: error,
          },
        },
      }));
    }
  };

  const handleNestedTextInputChange = (category, subCategory, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: value,
      },
    }));

    // Validate nested text fields
    const error = validateField(`${category}.${subCategory}`, value);
    setErrors((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: error,
      },
    }));
  };

  const handleCheckboxChange = (category, name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [name]: checked },
    }));
  };

  const handleActivitySelect = (event) => {
    const activity = event.target.value;
    setSelectedActivity(activity);
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: { ...prev.activities[activity], selected: true },
      },
    }));
    setSearchTerm("");
    setErrors((prev) => ({ ...prev, activities: "" }));
  };

  const handleSubActivityChange = (activity, subActivity, checked) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: {
          ...prev.activities[activity],
          subActivities: {
            ...prev.activities[activity].subActivities,
            [subActivity]: checked,
          },
        },
      },
    }));

    // Validate activities after change
    const anyActivitySelected = Object.values(formData.activities).some(
      (act) => act.selected && Object.values(act.subActivities).some((sub) => sub)
    );
    setErrors((prev) => ({
      ...prev,
      activities: anyActivitySelected ? "" : "At least one activity and sub-activity must be selected",
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddressChange = (address) => {
    setFormData((prev) => ({ ...prev, address }));
    setErrors((prev) => ({ ...prev, address: address.trim() ? "" : "Address is required" }));
  };

  const handleAddressSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setFormData((prev) => ({
        ...prev,
        address,
        latitude: latLng.lat.toString(),
        longitude: latLng.lng.toString(),
      }));
      setErrors((prev) => ({
        ...prev,
        address: "",
        latitude: "",
        longitude: "",
      }));
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      toast.error("Failed to fetch coordinates. Please try again.");
      setErrors((prev) => ({
        ...prev,
        latitude: "Failed to fetch coordinates",
        longitude: "Failed to fetch coordinates",
      }));
    }
  };

  const handleOpenTimeChange = (newValue) => {
    setFormData((prev) => ({ ...prev, openTime: newValue }));
    setErrors((prev) => ({
      ...prev,
      openTime: newValue ? "" : "Open time is required",
      closeTime:
        newValue && formData.closeTime && formData.closeTime < newValue
          ? "Close time must be after open time"
          : prev.closeTime,
    }));
  };

  const handleCloseTimeChange = (newValue) => {
    if (formData.openTime && newValue < formData.openTime) {
      toast.error("Closing time must be after opening time!");
      setErrors((prev) => ({
        ...prev,
        closeTime: "Close time must be after open time",
      }));
    } else {
      setFormData((prev) => ({ ...prev, closeTime: newValue }));
      setErrors((prev) => ({
        ...prev,
        closeTime: newValue ? "" : "Close time is required",
      }));
    }
  };

  const handleCourtAvailabilityTimeChange = (dayCategory, field, newValue) => {
    setFormData((prev) => ({
      ...prev,
      courtAvailability: {
        ...prev.courtAvailability,
        [dayCategory]: {
          ...prev.courtAvailability[dayCategory],
          [field]: newValue,
        },
      },
    }));

    const otherField = field === "open" ? "close" : "open";
    const otherValue = formData.courtAvailability[dayCategory][otherField];
    let error = newValue ? "" : `${field.replace(/([A-Z])/g, " $1")} time is required`;

    if (field === "close" && newValue && formData.courtAvailability[dayCategory].open && newValue < formData.courtAvailability[dayCategory].open) {
      error = "Close time must be after open time";
      toast.error(`Close time must be after open time for ${dayCategory.replace(/([A-Z])/g, " $1")}`);
    }

    setErrors((prev) => ({
      ...prev,
      courtAvailability: {
        ...prev.courtAvailability,
        [dayCategory]: {
          ...prev.courtAvailability[dayCategory],
          [field]: error,
        },
      },
    }));
  };

  const handlePaymentDetailsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, [field]: value },
    }));
    setErrors((prev) => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [field]: value.trim() ? "" : `${field.replace(/([A-Z])/g, " $1")} is optional but must be valid if provided`,
      },
    }));
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = { ...initialErrors };

    // Validate simple fields
    const fieldsToValidate = [
      "shopName",
      "ownerName",
      "mobileNo",
      "supervisorName",
      "supervisorMobile",
      "supervisorEmail",
      "area",
      "address",
      "latitude",
      "longitude",
      "remarks",
      "noOfCourtsAvailable",
      "noOfSlotsPerBooking",
      "maxAllowedPersonsPerTeam",
      "bankAccountHolder",
      "bankName",
      "accountNumber",
      "bankBranch",
      "ifscCode",
      "holderContactNumber",
      "accountType",
      "slotType",
      "gender",
      "courtsAllocated",
      "paymentMode",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) isValid = false;
    });

    // Validate mobile number existence
    if (formData.mobileNo && mobileRegex.test(formData.mobileNo)) {
      const exists = await checkVendorNumberExists(formData.mobileNo);
      if (exists) {
        newErrors.mobileNo = "Mobile number already exists";
        setMobileExists(true);
        isValid = false;
      }
    }

    // Validate emails (secondaryEmail is optional)
    if (formData.secondaryEmail && !emailRegex.test(formData.secondaryEmail)) {
      newErrors.secondaryEmail = "Invalid email format";
      isValid = false;
    }

    // Validate time fields
    if (!formData.openTime) {
      newErrors.openTime = "Open time is required";
      isValid = false;
    }
    if (!formData.closeTime) {
      newErrors.closeTime = "Close time is required";
      isValid = false;
    } else if (formData.openTime && formData.closeTime < formData.openTime) {
      newErrors.closeTime = "Close time must be after open time";
      isValid = false;
    }

    // Validate court availability
    const courtAvailabilityDays = ["mondayToFriday", "saturday", "sunday"];
    let hasValidAvailability = false;
    courtAvailabilityDays.forEach((day) => {
      const { open, close } = formData.courtAvailability[day] || {};
      if (open && close) {
        if (close < open) {
          newErrors.courtAvailability[day].close = "Close time must be after open time";
          isValid = false;
        } else {
          hasValidAvailability = true;
        }
      } else {
        newErrors.courtAvailability[day].open = open ? "" : "Open time is required";
        newErrors.courtAvailability[day].close = close ? "" : "Close time is required";
        // Allow partial availability, but at least one day must be fully valid
      }
    });

    if (!hasValidAvailability) {
      newErrors.courtAvailability.mondayToFriday.open = "At least one day's availability is required";
      isValid = false;
    }

    // Validate per hour booking cost
    const bookingCostDays = ["mondayToFriday", "saturday", "sunday"];
    let hasValidBookingCost = false;
    bookingCostDays.forEach((day) => {
      const value = formData.perHourBookingCost[day];
      const error = validateField(`perHourBookingCost.${day}`, value);
      newErrors.perHourBookingCost[day] = error;
      if (!error) hasValidBookingCost = true;
    });

    if (!hasValidBookingCost) {
      newErrors.perHourBookingCost.mondayToFriday = "At least one day's booking cost is required";
      isValid = false;
    }

    // Validate activities
    const anyActivitySelected = Object.values(formData.activities).some(
      (activity) =>
        activity.selected &&
        Object.values(activity.subActivities).some((sub) => sub)
    );
    if (!anyActivitySelected) {
      newErrors.activities = "At least one activity and its sub-activity must be selected";
      isValid = false;
    }

    // Validate payment details (optional but must be valid if provided)
    ["gpay", "phonepe", "upiId"].forEach((field) => {
      if (formData.paymentDetails[field] && !formData.paymentDetails[field].trim()) {
        newErrors.paymentDetails[field] = `${field.replace(/([A-Z])/g, " $1")} must be valid if provided`;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Please correct the errors in the form before submitting.");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validateForm())) return;

    const submittedData = {
      shopName: formData.shopName,
      ownerName: formData.ownerName,
      mobileNo: formData.mobileNo,
      supervisorName: formData.supervisorName,
      supervisorMobileNo: formData.supervisorMobile,
      supervisorEmailId: formData.supervisorEmail,
      secondaryEmailId: formData.secondaryEmail,
      otherBranch: formData.otherBranch,
      shopTimingOpen: formData.openTime
        ? formData.openTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      shopTimingClose: formData.closeTime
        ? formData.closeTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      area: formData.area,
      address: formData.address,
      mappingAddress: formData.address,
      slotType: formData.slotType,
      gender: formData.gender,
      noOfCourtsAllotted: parseInt(formData.courtsAllocated) || 0,
      modeOfPaymentToVendor: formData.paymentMode,
      guidelines: formData.remarks,
      amenities: Object.keys(formData.amenities)
        .filter((key) => formData.amenities[key])
        .join(","),
      activitiesInShop: Object.keys(formData.activities)
        .filter((key) => formData.activities[key].selected)
        .map((key) =>
          Object.keys(formData.activities[key].subActivities)
            .filter((sub) => formData.activities[key].subActivities[sub])
            .join(",")
        )
        .join(","),
      noOfChairs: parseInt(formData.chairsOrWashBay) || 0,
      bankAccountHolderName: formData.bankAccountHolder,
      bankName: formData.bankName,
      bankAccountNumber: formData.accountNumber,
      bankBranch: formData.bankBranch,
      bankIfscCode: formData.ifscCode,
      bankAccountContactNumber: formData.holderContactNumber,
      paymentDetails: {
        gpay: formData.paymentDetails.gpay || "",
        phonepe: formData.paymentDetails.phonepe || "",
        upiId: formData.paymentDetails.upiId || "",
      },
      courtSchedule: [
        {
          day: "Monday",
          timings:
            formData.courtAvailability.mondayToFriday.open &&
            formData.courtAvailability.mondayToFriday.close
              ? `${formData.courtAvailability.mondayToFriday.open.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${formData.courtAvailability.mondayToFriday.close.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "",
          noOfCourtsAvailable: parseInt(formData.noOfCourtsAvailable) || 0,
          noOfSlotsPerBooking: parseInt(formData.noOfSlotsPerBooking) || 0,
          maxPersonsPerTeam: parseInt(formData.maxAllowedPersonsPerTeam) || 0,
          perHourBookingCost:
            parseFloat(formData.perHourBookingCost.mondayToFriday) || 0,
        },
        {
          day: "Saturday",
          timings:
            formData.courtAvailability.saturday.open &&
            formData.courtAvailability.saturday.close
              ? `${formData.courtAvailability.saturday.open.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${formData.courtAvailability.saturday.close.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "",
          noOfCourtsAvailable: parseInt(formData.noOfCourtsAvailable) || 0,
          noOfSlotsPerBooking: parseInt(formData.noOfSlotsPerBooking) || 0,
          maxPersonsPerTeam: parseInt(formData.maxAllowedPersonsPerTeam) || 0,
          perHourBookingCost: parseFloat(formData.perHourBookingCost.saturday) || 0,
        },
        {
          day: "Sunday",
          timings:
            formData.courtAvailability.sunday.open &&
            formData.courtAvailability.sunday.close
              ? `${formData.courtAvailability.sunday.open.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${formData.courtAvailability.sunday.close.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "",
          noOfCourtsAvailable: parseInt(formData.noOfCourtsAvailable) || 0,
          noOfSlotsPerBooking: parseInt(formData.noOfSlotsPerBooking) || 0,
          maxPersonsPerTeam: parseInt(formData.maxAllowedPersonsPerTeam) || 0,
          perHourBookingCost: parseFloat(formData.perHourBookingCost.sunday) || 0,
        },
      ].filter((schedule) => schedule.timings !== ""),
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/api/service/rest/vendorRegistration/registerVendor`,
        submittedData
      );
      console.log("API Response:", response.data);
      toast.success("Registration submitted successfully!");
      setFormData(initialFormData);
      setErrors(initialErrors);
      setSelectedActivity("");
      setSearchTerm("");
      setFilteredActivities(Object.keys(initialFormData.activities));
      setMobileExists(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <>
      <NavBar />
      <Toaster richColors position="top-right" />
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyBg7L39I7RsEKJazpA7MydrK6146O70k&libraries=places"
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Google Maps script failed to load:", e);
          toast.error("Failed to load Google Maps API.");
        }}
      />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box
            sx={{
              minHeight: "100vh",
              bgcolor: "#000",
              py: 10,
              px: { xs: 3, sm: 5, md: 8 },
            }}
          >
            {!isGoogleMapsLoaded ? (
              <Box
                sx={{ maxWidth: 600, mx: "auto", textAlign: "center", py: 12 }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Loading Google Maps...
                </Typography>
              </Box>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                sx={{ maxWidth: 1200, mx: "auto" }}
              >
                <motion.div variants={itemVariants} sx={{ textAlign: "center", mb: 8 }}>
                  <Typography variant="h3" color="primary" gutterBottom sx={{ mt: 10 }}>
                    Pick Your Slot
                  </Typography>
                  <Typography variant="body1" color="#fff" gutterBottom>
                    Complete the vendor registration to unlock seamless slot booking and management.
                  </Typography>
                </motion.div>

                <motion.form onSubmit={handleSubmit} variants={containerVariants}>
                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<User size={20} style={{ color: "#1976d2" }} />}
                          label="Basic Information"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          {[
                            { label: "Shop Name", name: "shopName", required: true },
                            { label: "Owner Name", name: "ownerName", required: true },
                            {
                              label: "Mobile Number",
                              name: "mobileNo",
                              type: "tel",
                              required: true,
                            },
                            { label: "Supervisor Name", name: "supervisorName", required: true },
                            { label: "Supervisor Mobile", name: "supervisorMobile", type: "tel", required: true },
                            { label: "Supervisor/Owner Email", name: "supervisorEmail", type: "email", required: true },
                            { label: "Secondary Email (Optional)", name: "secondaryEmail", type: "email" },
                            { label: "Other Branch (Optional)", name: "otherBranch" },
                          ].map((field) => (
                            <Grid item xs={12} sm={6} key={field.name}>
                              <TextField
                                fullWidth
                                label={field.label}
                                name={field.name}
                                type={field.type || "text"}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                required={field.required}
                                variant="outlined"
                                size="medium"
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                                sx={{ "& .MuiInputLabel-root": { fontSize: "0.95rem" } }}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<Clock size={20} style={{ color: "#1976d2" }} />}
                          label="Shop Timing & Location"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={3}>
                            <TimePicker
                              label="Open Time"
                              value={formData.openTime}
                              onChange={handleOpenTimeChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                  size="medium"
                                  required
                                  error={!!errors.openTime}
                                  helperText={errors.openTime}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TimePicker
                              label="Close Time"
                              value={formData.closeTime}
                              onChange={handleCloseTimeChange}
                              minTime={formData.openTime}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                  size="medium"
                                  required
                                  error={!!errors.closeTime}
                                  helperText={errors.closeTime}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Area"
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                              required
                              variant="outlined"
                              size="medium"
                              error={!!errors.area}
                              helperText={errors.area}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <PlacesAutocomplete
                              value={formData.address}
                              onChange={handleAddressChange}
                              onSelect={handleAddressSelect}
                            >
                              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <Box position="relative">
                                  <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    size="medium"
                                    required
                                    {...getInputProps({ placeholder: "Search for your address" })}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                  />
                                  {loading && (
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                      Loading...
                                    </Typography>
                                  )}
                                  {suggestions.length > 0 && (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        zIndex: 1000,
                                        width: "100%",
                                        bgcolor: "background.paper",
                                        borderRadius: 3,
                                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                                        mt: 1.5,
                                        maxHeight: 240,
                                        overflowY: "auto",
                                      }}
                                    >
                                      {suggestions.map((suggestion) => (
                                        <Typography
                                          key={suggestion.placeId}
                                          variant="body2"
                                          sx={{
                                            p: 2,
                                            cursor: "pointer",
                                            bgcolor: suggestion.active ? "primary.light" : "background.paper",
                                            color: suggestion.active ? "white" : "text.primary",
                                            "&:hover": { bgcolor: "primary.light", color: "white" },
                                          }}
                                          {...getSuggestionItemProps(suggestion)}
                                        >
                                          {suggestion.description}
                                        </Typography>
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              )}
                            </PlacesAutocomplete>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Latitude"
                              name="latitude"
                              value={formData.latitude}
                              onChange={handleInputChange}
                              variant="outlined"
                              size="medium"
                              disabled
                              error={!!errors.latitude}
                              helperText={errors.latitude}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Longitude"
                              name="longitude"
                              value={formData.longitude}
                              onChange={handleInputChange}
                              variant="outlined"
                              size="medium"
                              disabled
                              error={!!errors.longitude}
                              helperText={errors.longitude}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<Building size={20} style={{ color: "#1976d2" }} />}
                          label="Activities"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" size="medium" error={!!errors.activities}>
                              <InputLabel id="activity-select-label">Select Activity</InputLabel>
                              <Select
                                labelId="activity-select-label"
                                value={selectedActivity}
                                onChange={handleActivitySelect}
                                label="Select Activity"
                                MenuProps={{
                                  PaperProps: {
                                    style: { maxHeight: 400, width: 250 },
                                  },
                                }}
                                renderValue={(selected) =>
                                  selected
                                    ? selected
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())
                                    : "Select an Activity"
                                }
                              >
                                <Box
                                  sx={{
                                    p: 2,
                                    position: "sticky",
                                    top: 0,
                                    bgcolor: "background.paper",
                                    zIndex: 1,
                                  }}
                                >
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    autoFocus
                                  />
                                </Box>
                                {filteredActivities.length === 0 ? (
                                  <MenuItem disabled>
                                    <Typography variant="body2" color="text.secondary">
                                      No activities found
                                    </Typography>
                                  </MenuItem>
                                ) : (
                                  filteredActivities.map((activity) => (
                                    <MenuItem key={activity} value={activity}>
                                      {activity
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                    </MenuItem>
                                  ))
                                )}
                              </Select>
                              {errors.activities && (
                                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                  {errors.activities}
                                </Typography>
                              )}
                            </FormControl>
                          </Grid>
                          {selectedActivity && (
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                                Sub-Activities for{" "}
                                {selectedActivity
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </Typography>
                              <Grid container spacing={1}>
                                {Object.keys(formData.activities[selectedActivity].subActivities).map(
                                  (subActivity) => (
                                    <Grid item xs={6} sm={4} md={3} key={subActivity}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={
                                              formData.activities[selectedActivity].subActivities[subActivity]
                                            }
                                            onChange={(e) =>
                                              handleSubActivityChange(
                                                selectedActivity,
                                                subActivity,
                                                e.target.checked
                                              )
                                            }
                                            size="medium"
                                          />
                                        }
                                        label={subActivity
                                          .replace(/([A-Z])/g, " $1")
                                          .replace(/^./, (str) => str.toUpperCase())}
                                        sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                                      />
                                    </Grid>
                                  )
                                )}
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<MapPin size={20} style={{ color: "#1976d2" }} />}
                          label="Amenities"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={1}>
                          {Object.keys(formData.amenities).map((amenity) => (
                            <Grid item xs={6} sm={4} md={3} key={amenity}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={formData.amenities[amenity]}
                                    onChange={(e) =>
                                      handleCheckboxChange("amenities", amenity, e.target.checked)
                                    }
                                    size="medium"
                                  />
                                }
                                label={amenity
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                                sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<Calendar size={20} style={{ color: "#1976d2" }} />}
                          label="Slot Type"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        {[
                          {
                            label: "Slot Type",
                            name: "slotType",
                            options: [
                              "Predefined Slot",
                              "Consecutive Slot",
                              "Badminton",
                              "Net Practice",
                              "Membership",
                              "Course",
                            ],
                          },
                          {
                            label: "Gender",
                            name: "gender",
                            options: ["Male", "Female", "Unisex"],
                          },
                          {
                            label: "Courts Allotted",
                            name: "courtsAllocated",
                            options: ["1", "2", "3", "4", "5", "6", "7"],
                          },
                          {
                            label: "Salon Chairs/Car Wash Bay",
                            name: "chairsOrWashBay",
                            options: ["1", "2", "3"],
                          },
                        ].map((field, index) => (
                          <Box key={field.name} sx={{ mb: index < 3 ? 3 : 0 }}>
                            <FormControl component="fieldset" error={!!errors[field.name]}>
                              <FormLabel
                                component="legend"
                                sx={{ fontSize: "1rem", fontWeight: 600, mb: 1.5 }}
                              >
                                {field.label}
                              </FormLabel>
                              <RadioGroup
                                row
                                name={field.name}
                                value={formData[field.name]}
                                onChange={(e) => handleRadioChange(field.name, e.target.value)}
                              >
                                {field.options.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio size="medium" />}
                                    label={option}
                                    sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                                  />
                                ))}
                              </RadioGroup>
                              {errors[field.name] && (
                                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                  {errors[field.name]}
                                </Typography>
                              )}
                            </FormControl>
                            {index < 3 && <Divider sx={{ my: 2.5 }} />}
                          </Box>
                        ))}
                        <br />
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                            variant="outlined"
                            size="medium"
                            required
                            error={!!errors.remarks}
                            helperText={errors.remarks}
                          />
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<Calendar size={20} style={{ color: "#1976d2" }} />}
                          label="Service Templates"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5 }}>
                              Court Availability
                            </Typography>
                            <Grid container spacing={3}>
                              {[
                                { label: "Monday to Friday", key: "mondayToFriday" },
                                { label: "Saturday", key: "saturday" },
                                { label: "Sunday", key: "sunday" },
                              ].map((day) => (
                                <Grid item xs={12} sm={4} key={day.key}>
                                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                                    {day.label}
                                  </Typography>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <TimePicker
                                        label="Open"
                                        value={formData.courtAvailability[day.key].open}
                                        onChange={(newValue) =>
                                          handleCourtAvailabilityTimeChange(day.key, "open", newValue)
                                        }
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            size="medium"
                                            required
                                            error={!!errors.courtAvailability[day.key].open}
                                            helperText={errors.courtAvailability[day.key].open}
                                          />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TimePicker
                                        label="Close"
                                        value={formData.courtAvailability[day.key].close}
                                        onChange={(newValue) =>
                                          handleCourtAvailabilityTimeChange(day.key, "close", newValue)
                                        }
                                        minTime={formData.courtAvailability[day.key].open}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            variant="outlined"
                                            size="medium"
                                            required
                                            error={!!errors.courtAvailability[day.key].close}
                                            helperText={errors.courtAvailability[day.key].close}
                                          />
                                        )}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="No of Courts Available"
                              name="noOfCourtsAvailable"
                              value={formData.noOfCourtsAvailable}
                              onChange={handleInputChange}
                              variant="outlined"
                              size="medium"
                              type="number"
                              required
                              error={!!errors.noOfCourtsAvailable}
                              helperText={errors.noOfCourtsAvailable}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="No of Slots per Booking"
                              name="noOfSlotsPerBooking"
                              value={formData.noOfSlotsPerBooking}
                              onChange={handleInputChange}
                              variant="outlined"
                              size="medium"
                              type="number"
                              required
                              error={!!errors.noOfSlotsPerBooking}
                              helperText={errors.noOfSlotsPerBooking}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Max Allowed Persons per Team"
                              name="maxAllowedPersonsPerTeam"
                              value={formData.maxAllowedPersonsPerTeam}
                              onChange={handleInputChange}
                              variant="outlined"
                              size="medium"
                              type="number"
                              required
                              error={!!errors.maxAllowedPersonsPerTeam}
                              helperText={errors.maxAllowedPersonsPerTeam}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5 }}>
                              Per Hour Booking Cost (Rs.)
                            </Typography>
                            <Grid container spacing={3}>
                              {[
                                { label: "Monday to Friday", key: "mondayToFriday" },
                                { label: "Saturday", key: "saturday" },
                                { label: "Sunday", key: "sunday" },
                              ].map((day) => (
                                <Grid item xs={12} sm={4} key={day.key}>
                                  <TextField
                                    fullWidth
                                    label={day.label}
                                    value={formData.perHourBookingCost[day.key]}
                                    onChange={(e) =>
                                      handleNestedTextInputChange("perHourBookingCost", day.key, e.target.value)
                                    }
                                    variant="outlined"
                                    size="medium"
                                    type="number"
                                    InputProps={{
                                      startAdornment: <Typography sx={{ mr: 1.5 }}>Rs.</Typography>,
                                    }}
                                    error={!!errors.perHourBookingCost[day.key]}
                                    helperText={errors.perHourBookingCost[day.key]}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<Bank size={20} style={{ color: "#1976d2" }} />}
                          label="Banking Details"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          {[
                            { label: "Account Holder Name", name: "bankAccountHolder", required: true },
                            { label: "Bank Name", name: "bankName", required: true },
                            { label: "Account Number", name: "accountNumber", required: true },
                            { label: "Bank Branch", name: "bankBranch", required: true },
                            { label: "IFSC Code", name: "ifscCode", required: true },
                            { label: "Holder Contact Number", name: "holderContactNumber", required: true },
                            { label: "Account Type", name: "accountType", required: true },
                          ].map((field) => (
                            <Grid item xs={12} sm={6} key={field.name}>
                              <TextField
                                fullWidth
                                label={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                required={field.required}
                                variant="outlined"
                                size="medium"
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<CreditCard size={20} style={{ color: "#1976d2" }} />}
                          label="Payment Mode"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <FormControl component="fieldset" error={!!errors.paymentMode}>
                          <RadioGroup
                            row
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={(e) => handleRadioChange("paymentMode", e.target.value)}
                          >
                            {["Daily", "Weekly", "Monthly"].map((mode) => (
                              <FormControlLabel
                                key={mode}
                                value={mode}
                                control={<Radio size="medium" />}
                                label={mode}
                                sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                              />
                            ))}
                          </RadioGroup>
                          {errors.paymentMode && (
                            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                              {errors.paymentMode}
                            </Typography>
                          )}
                        </FormControl>
                        <Box sx={{ mt: 2.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            • Daily: Credited by 6:00 PM (post-6:00 PM rolls over).
                            <br />
                            • Weekly: Credited every Saturday by 6:00 PM.
                            <br />
                            • Monthly: Credited on the last day by 6:00 PM.
                          </Typography>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledCard>
                      <Box sx={{ px: 3, pt: 3 }}>
                        <Chip
                          icon={<CreditCard size={20} style={{ color: "#1976d2" }} />}
                          label="Payment Details"
                          sx={{ mb: 2 }}
                        />
                      </Box>
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="GPay"
                              name="gpay"
                              value={formData.paymentDetails.gpay}
                              onChange={(e) => handlePaymentDetailsChange("gpay", e.target.value)}
                              variant="outlined"
                              size="medium"
                              error={!!errors.paymentDetails.gpay}
                              helperText={errors.paymentDetails.gpay}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="PhonePe"
                              name="phonepe"
                              value={formData.paymentDetails.phonepe}
                              onChange={(e) => handlePaymentDetailsChange("phonepe", e.target.value)}
                              variant="outlined"
                              size="medium"
                              error={!!errors.paymentDetails.phonepe}
                              helperText={errors.paymentDetails.phonepe}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="UPI ID"
                              name="upiId"
                              value={formData.paymentDetails.upiId}
                              onChange={(e) => handlePaymentDetailsChange("upiId", e.target.value)}
                              variant="outlined"
                              size="medium"
                              error={!!errors.paymentDetails.upiId}
                              helperText={errors.paymentDetails.upiId}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </motion.div>

                  <motion.div variants={itemVariants} sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<ChevronRight />}
                      sx={{ px: 5, py: 1.5 }}
                      disabled={mobileExists || Object.values(errors).some((error) => typeof error === "string" && error)}
                    >
                      Submit Registration
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default Register;