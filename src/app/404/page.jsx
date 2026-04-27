"use client";
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import fournotfour from '@/Assets/404.jpg';
import NavBar from '@/component/Home/NavBar';
import Footer from '@/component/Home/Footer';

const Page404 = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <>
    <NavBar />
    <Container
      sx={{
        mt: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}
    >
      <Image
        src={fournotfour}
        alt="404 Error"
        layout="fill"
        objectFit="cover"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
      />
      <Typography
        variant="h2"
        sx={{
          color: '#1A237E',
          mt: 4,
          fontWeight: 'bold',
          textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
          zIndex: 1,
        }}
      >
        Oops! Something Went Wrong
      </Typography>
      <Button
        variant="contained"
        sx={{
          mb: 4,
          backgroundColor: '#1976D2',
          '&:hover': { backgroundColor: '#1565C0' },
          padding: '12px 30px',
          borderRadius: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontSize: '16px',
          textTransform: 'none',
          zIndex: 1,
        }}
        onClick={handleBackHome}
      >
        Back to Home
      </Button>
    </Container>
    <Footer />
    </>
  );
};

export default Page404;