"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ActivityTab({ data, getId }) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const selectedActivity = data[newValue];
    console.log("selectedActivity", selectedActivity);

    if (selectedActivity) {
      getId(selectedActivity.activityId);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: "#eef2ff",
            color: "#4338ca",
            borderRadius: "20px",
            textTransform: "none",
            mr: 2,
            "&:hover": {
              backgroundColor: "#e0e7ff",
            },
          }}
        >
          Amenities
        </Button>
      </Box> */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="sports categories tabs"
        sx={{
          mb: 4,
          "& .MuiTabs-indicator": {
            backgroundColor: "#fff",
            height: "3px",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            minWidth: 0,
            padding: "12px 16px",
          },
          "& .Mui-selected": {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      >
        {data.map((item) => (
          <Tab label={item.activity} key={item.activityId} />
        ))}
      </Tabs>
    </Container>
  );
}
