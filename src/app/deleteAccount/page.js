"use client";
import Image from "next/image";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import im from "@/Assets/locations/Delete.jpg";

function Delete() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#150e36",
        padding: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 600,
          minWidth: 400,
          padding: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Image src={im} width={300} height={300} alt="Delete Account" />
        <Typography variant="h5" fontWeight="bold" color="black" gutterBottom>
          How to Delete Your Account
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          You can delete your account from within Pick Your Slot App.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Deleting your account is irreversible. We can’t reverse this even if you delete it by accident.
        </Typography>
        
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          To delete your account:
        </Typography>
        <List>
          {["Open PYS App", "Tap Profile", "You can find Delete Account Option on bottom", "Tap Delete account", "Click Confirm"].map((step, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${step}`} />
            </ListItem>
          ))}
        </List>
        
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Deleting your account will:
        </Typography>
        <List>
          {["Delete your account from PYS and all your devices.", "Erase your Booking history.", "Delete you from all of your PYS Membership groups.", "Delete if there aren’t additional Courses you joined."].map((effect, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${effect}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Delete;