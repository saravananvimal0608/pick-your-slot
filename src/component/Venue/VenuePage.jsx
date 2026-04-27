"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
  Button,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";
import Carousel from "./Carousel";
import VendorCard from "./VendorCard";
import { BaseUrl } from "@/controller/common";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getActivity } from "@/app/venue/layout";
import FilterDrawer from "./FilterDrawer";
import logo from "@/Assets/logo1.jpg";
import useDebounce from "@/Hooks/useDebounce";

const LIMIT = 10;
const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#003566",
  fontWeight: 600,
  fontSize: "1rem",
  borderRadius: "12px",
  padding: theme.spacing(1, 3),
  textTransform: "none",
  transition: "all 0.3s ease",
  marginLeft: "20px",
  boxShadow: "0 4px 12px rgba(0, 53, 102, 0.2)",
  "&:hover": {
    backgroundColor: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 53, 102, 0.2)",
  },
  "& .MuiButton-endIcon": {
    marginLeft: theme.spacing(1),
  },
}));

const VenuePage = () => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    distance: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [bookingCost, setBookingCost] = useState(0);
  const [orderByCost, setOrderByCost] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      fetchVendors(true, true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("position", position);

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          distance: position.coords.latitude ? 5 : "",
        });
      },
      (err) => {
        setError(err.message);
        fetchVendors(true, true);
      }
    );
  }, [isMounted]);

  const observerRef = useRef(null);

  const HandleId = (id) => {
    if (id !== activityId) {
      setActivityId(id);
      setOffset(0);
      setVendors([]);
      fetchVendors(true, location.latitude !== "" ? true : false, id);
    }
  };

  const fetchVendors = useCallback(
    async (
      reset = false,
      ignoreLocation = false,
      scopedActivityId = activityId
    ) => {
      if ((loading && !reset) || (!hasMore && !reset)) return;

      if (reset) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }

      const currentOffset = reset ? 0 : offset;

      try {
        const amenityIds = selectedAmenities.join(",");
        const params = new URLSearchParams({
          limit: LIMIT.toString(),
          offset: currentOffset.toString(), // optional: switch to count logic if available
          activityId: scopedActivityId,
          vendorName: debouncedSearchQuery,
          lat: ignoreLocation ? "" : location.latitude,
          long: ignoreLocation ? "" : location.longitude,
          distance: ignoreLocation ? "" : location.distance,
          cost: bookingCost.toString(),
          amenityId: amenityIds,
          gender: selectedGender,
          order: orderByCost,
          city: "",
        });

        const response = await axios.get(
          `${BaseUrl}/api/service/rest/vendor/getVendorsByActivity?${params}`
        );

        let newVendors = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

          console.log("newVendors",newVendors);
          
        // ✅ Guard against old responses updating current state
        if (scopedActivityId !== activityId) return;

        setHasMore(newVendors.length === LIMIT);
        setOffset(currentOffset + newVendors.length);
        if (scopedActivityId === activityId) {
          setInitialLoading(false);
          setLoading(false);
        }
        setVendors((prev) => {
          if (reset) return newVendors;
          const existingIds = new Set(prev.map((v) => v.vendorId));
          const uniqueNew = newVendors.filter(
            (v) => !existingIds.has(v.vendorId)
          );
          return [...prev, ...uniqueNew];
        });
      } catch (err) {
        console.error("Error fetching vendors:", err);
        if (scopedActivityId === activityId) {
          setError("Failed to load vendors. Please try again.");
        }
        if (scopedActivityId === activityId) {
          setInitialLoading(false);
          setLoading(false);
        }
      }
    },
    [
      offset,
      loading,
      hasMore,
      activityId,
      debouncedSearchQuery,
      location,
      selectedAmenities,
      selectedGender,
      bookingCost,
      orderByCost,
    ]
  );

  const lastVendorRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchVendors();
          }
        },
        { threshold: 0.1 }
      );
      if (node) observerRef.current.observe(node);
    },
    [fetchVendors, hasMore, loading]
  );

  const handleSearch = () => {
    setInitialLoading(true);
    fetchVendors(true).finally(() => setInitialLoading(false));
  };

  useEffect(() => {
    if (
      isMounted &&
      (location.latitude || location.longitude || !navigator.geolocation)
    ) {
      fetchVendors(true);
    }
  }, [
    isMounted,
    location,
    activityId,
    selectedAmenities,
    selectedGender,
    bookingCost,
    orderByCost,
    debouncedSearchQuery,
  ]);

  const GetAmenities = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/service/rest/utility/getAllAmenities`
      );
      if (response.data.status === 200 || Array.isArray(response.data)) {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];
        const formattedData = data.map((i) => ({
          value: i.amenityId,
          label: i.amenityType,
        }));
        const amenitiesObject = formattedData.reduce((acc, item) => {
          const key = item.label.toLowerCase().replace(/\s+/g, "");
          acc[key] = false;
          return acc;
        }, {});
        setAmenitiesList(amenitiesObject);
        setAmenities(formattedData);
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
    }
  };

  const GetAllActivity = async () => {
    try {
      const data = await getActivity();
      const newData = [
        {
          activity: "All Activities",
          activityId: "",
          activityImage: logo,
          description: "Description",
          noOfVendors: null,
          subActivities: null,
        },
        ...(Array.isArray(data) ? data : []),
      ];
      setActivities(newData);
      setActivityId("");
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    if (isMounted) {
      GetAmenities();
      GetAllActivity();
    }
  }, [isMounted]);

  const handleApplyFilters = (gender, cost, order, selectedAmenitiesObj) => {
    setSelectedGender(gender);
    setBookingCost(cost);
    setOrderByCost(order);
    const selectedAmenityIds = Object.keys(selectedAmenitiesObj)
      .filter((key) => selectedAmenitiesObj[key])
      .map((key) => {
        const amenity = amenities.find(
          (a) => a.label.toLowerCase().replace(/\s+/g, "") === key.toLowerCase()
        );
        return amenity ? amenity.value : null;
      })
      .filter((id) => id !== null);
    setSelectedAmenities(selectedAmenityIds);
    setDrawerOpen(false);
  };

  return (
    <>
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={handleApplyFilters}
        amenitiesList={amenitiesList}
      />
      <NavBar />
      {/* {(initialLoading || !isMounted) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1300,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CircularProgress sx={{ color: "#3b82f6" }} />
        </Box>
      )} */}
      {initialLoading && vendors.length === 0 && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1300,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CircularProgress sx={{ color: "#3b82f6" }} />
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "60vh", md: "70vh" },
          py: 12,
          background: "#0f172a",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          <Typography
            align="left"
            variant="h4"
            sx={{ mt: 0, fontWeight: "bold", color: "#e9e7e7" }}
          >
            Venues
          </Typography>
          <Typography
            align="left"
            variant="body"
            sx={{ mt: 2, color: "#e9e7e7" }}
          >
            Explore venues for your next event
          </Typography>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "left",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search venue..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#8b8b8b" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "13px",
                backgroundColor: "#fff",
                fontFamily: "Poppins, sans-serif",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                p: "3px 8px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
          <FilterButton
            endIcon={<FilterListIcon />}
            onClick={() => setDrawerOpen(true)}
          >
            Filter
          </FilterButton>
        </Container>
        {isMounted && (
          <div suppressHydrationWarning>
            <Carousel
              data={activities}
              arrows={activities?.length !== 0}
              getId={HandleId}
            />
          </div>
        )}
        <br />
        <br />
        <Container maxWidth="lg" sx={{ py: 0 }}>
          <Grid container spacing={3}>
            {isMounted &&
              vendors?.map((vendor, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={vendor.VendorId}
                  ref={index === vendors.length - 1 ? lastVendorRef : null}
                >
                  <VendorCard vendor={vendor} />
                </Grid>
              ))}
            {/* {(loading || initialLoading) && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress sx={{ color: "#3b82f6" }} />
                </Box>
              </Grid>
            )} */}
            {loading && vendors.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress sx={{ color: "#3b82f6" }} />
                </Box>
              </Grid>
            )}{" "}
            {isMounted && error && vendors.length === 0 && (
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "#ef4444",
                    textAlign: "center",
                    py: 2,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default VenuePage;
