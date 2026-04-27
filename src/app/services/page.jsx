"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Box, Typography, Container, Button } from "@mui/material";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";

// Import assets
import model1 from "@/Assets/Model-1.png";
import partialPaymentImg from "@/Assets/partial_payment_pys.png";
import model2 from "@/Assets/course_illustration_pys.png";
import bulkBookingImg from "@/Assets/bulk_booking_cover.png";
import gameHostingImg from "@/Assets/game_hosting_illustration.png";
import passImg from "@/Assets/pys_elite_pass.png";
// import sports from "@/Assets/sports.webp";
import BgImg from "@/Assets/video-bg.png";

const servicesData = [
    {
        id: 1,
        title: "Membership",
        category: "PYS Services",
        description: "Unlock exclusive benefits and premium access to top-rated facilities with our flexible membership plans tailored to your lifestyle.",
        features: ["Priority Booking", "Exclusive Discounts", "Member-only Events"],
        image: model1,
        slug: "membership",
        gradient: "from-blue-400 to-purple-600",
        imagePosition: "right",
    },
    {
        id: 6,
        title: "Partial Payment",
        category: "PYS Services",
        description: "Allow customers to confirm bookings with a small advance payment. This reduces cancellations while making bookings more convenient.",
        features: ["advance Payment Option", "Secure Transactions"],
        image: partialPaymentImg,
        slug: "partial-payment",
        gradient: "from-blue-400 to-purple-600",
        imagePosition: "right",
    },
    {
        id: 2,
        title: "Course",
        category: "PYS Services",
        description: "Elevate your skills with expert-led courses. From sports coaching to creative workshops, find the perfect course for you.",
        features: ["Expert Instructors", "Flexible Schedules", "Certification"],
        image: model2,
        slug: "course",
        gradient: "from-green-400 to-teal-600",
        imagePosition: "left",
    },
    {
        id: 3,
        title: "Bulk Booking",
        category: "PYS Services",
        description: "Submit a special request to a specific venue or multiple venues at once. Vendors will review and respond with availability and pricing options so you can choose the best fit.",
        features: ["Specific or Open Requests", "Vendor Bidding", "Negotiated Rates"],
        image: bulkBookingImg,
        slug: "bulkbooking",
        gradient: "from-orange-400 to-red-600",
        imagePosition: "right",
    },
    {
        id: 4,
        title: "Hosting",
        category: "PYS Services",
        description: "Book a slot, create a custom game, and publish it for others to join. Set your participant limits and instantly connect with fellow enthusiasts.",
        features: ["Create Custom Games", "Set Player Limits", "Community Matching"],
        image: gameHostingImg,
        slug: "hosting", // Assuming 'venue' is the hosting page based on existing links
        gradient: "from-pink-400 to-rose-600",
        imagePosition: "left",
    },
    {
        id: 5,
        title: "Pass",
        category: "PYS Services",
        description: "Purchase a unified pass valid at multiple specified venues. Use it seamlessly across locations to enjoy special offers and exclusive access.",
        features: ["Unified Venue Access", "Exclusive Offers", "Convenient Usage"],
        image: passImg,
        slug: "pass",
        gradient: "from-violet-400 to-indigo-600",
        imagePosition: "right",
    },
];

export default function ServicesPage() {
    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <NavBar />

            {/* Main Section */}
            <Box
                component="section"
                id="services"
                sx={{
                    position: "relative",
                    backgroundImage: `url(${BgImg.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed", // Parallax-like effect
                    py: { xs: 12, lg: 20 },
                    overflow: "hidden",
                    mt: 8,
                }}
            >
                {/* Dark Overlay for readability */}
                <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.6)", zIndex: 0 }} />

                <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10, px: { xs: 3, md: 6 } }}>
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginBottom: "8rem" }}
                    >
                        <Box sx={{ display: "inline-flex", alignItems: "center", px: 2, py: 1, borderRadius: "99px", border: "1px solid rgba(255,255,255,0.2)", bgcolor: "rgba(255,255,255,0.05)", mb: 3 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#60a5fa", mr: 1.5 }} />
                            <Typography variant="subtitle2" sx={{ color: "#e2e8f0", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 600 }}>
                                Premium Offerings
                            </Typography>
                        </Box>

                        <Typography variant="h2" sx={{
                            fontWeight: 800,
                            mb: 3,
                            color: "#ffffff",
                            fontSize: { xs: "3rem", md: "5rem" },
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em"
                        }}>
                            Elevate Your <span style={{ color: "#60a5fa" }}>Experience</span>
                        </Typography>

                        <Typography variant="body1" sx={{ mx: "auto", maxWidth: "42rem", fontSize: { xs: "1.1rem", md: "1.25rem" }, color: "#cbd5e1", lineHeight: 1.8, fontWeight: 300 }}>
                            Discover a curated selection of world-class services designed to empower your journey and unlock new possibilities.
                        </Typography>
                    </motion.div>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 16, lg: 24 } }}>
                        {servicesData.map((service, index) => (
                            <motion.article
                                key={service.title}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            xs: 'column-reverse', 
                                            lg: service.imagePosition === 'left' ? 'row' : 'row-reverse'
                                        },
                                      
                                        alignItems: "center",
                                        gap: { xs: 6, lg: 12 }
                                    }}
                                >
                                    {/* Image Side */}
                                    <Box sx={{ width: "100%", flex: 1, position: "relative" }}>
                                        <motion.div
                                            whileHover={{ scale: 1.02, rotate: 1 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    borderRadius: "32px",
                                                    overflow: "hidden",
                                                    boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: "cover" }}
                                                />
                                                <Box sx={{ position: "absolute", inset: 0, bgcolor: `linear-gradient(135deg, ${service.gradient === "from-blue-400 to-purple-600" ? "rgba(96, 165, 250,0.2)" : "rgba(255,255,255,0.1)"})`, mixBlendMode: "overlay", zIndex: 10 }} />
                                            </Box>
                                        </motion.div>

                                        {/* Decorative floating number behind */}
                                        <Typography sx={{
                                            position: "absolute",
                                            top: service.imagePosition === 'left' ? "-10%" : "-10%",
                                            left: service.imagePosition === 'left' ? "-10%" : "auto",
                                            right: service.imagePosition === 'left' ? "auto" : "-10%",
                                            fontSize: "12rem",
                                            fontWeight: 900,
                                            color: "rgba(255,255,255,0.03)",
                                            zIndex: -1,
                                            lineHeight: 1,
                                            userSelect: "none"
                                        }}>
                                            {String(service.id).padStart(2, '0')}
                                        </Typography>
                                    </Box>

                                    {/* Content Side */}
                                    <Box sx={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", gap: 4, textAlign: { xs: "center", lg: "left" }, alignItems: { xs: "center", lg: "flex-start" } }}>
                                        <Typography variant="caption" sx={{
                                            color: "#94a3b8",
                                            letterSpacing: "3px",
                                            textTransform: "uppercase",
                                            fontWeight: 700
                                        }}>
                                            {service.category}
                                        </Typography>

                                        <Typography variant="h3" sx={{
                                            fontWeight: 800,
                                            color: "#ffffff",
                                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                                            background: `linear-gradient(to right, #fff, rgba(255,255,255,0.5))`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}>
                                            {service.title}
                                        </Typography>

                                        <Typography variant="body1" sx={{ fontSize: "1.125rem", color: "#cbd5e1", lineHeight: 1.8, maxWidth: "32rem" }}>
                                            {service.description}
                                        </Typography>

                                        {/* Features */}
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: { xs: "center", lg: "flex-start" } }}>
                                            {service.features.map((feature, idx) => (
                                                <Box key={idx} sx={{
                                                    px: 2.5,
                                                    py: 1,
                                                    borderRadius: "12px",
                                                    bgcolor: "rgba(255, 255, 255, 0.05)",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    transition: "all 0.3s",
                                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)", transform: "translateY(-2px)" }
                                                }}>
                                                    <Typography variant="caption" sx={{ color: "#e2e8f0", fontWeight: 500, fontSize: "0.9rem" }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>

                                        <Link href={`/${service.slug}`} passHref style={{ width: 'fit-content' }}>
                                            <Button
                                                endIcon={<ArrowRight size={20} />}
                                                sx={{
                                                    mt: 2,
                                                    px: 5,
                                                    py: 2,
                                                    borderRadius: "99px",
                                                    bgcolor: "white",
                                                    color: "#0f172a",
                                                    textTransform: "none",
                                                    fontSize: "1rem",
                                                    fontWeight: 700,
                                                    boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                                                    minWidth: "180px",
                                                    "&:hover": {
                                                        bgcolor: "#f8fafc",
                                                        transform: "translateY(-2px)",
                                                        boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                                                    },
                                                    transition: "all 0.3s ease-out"
                                                }}
                                            >
                                                Explore {service.title}
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>

                                {/* Divider for all except last */}
                                {index !== servicesData.length - 1 && (
                                    <Box sx={{
                                        mt: { xs: 16, lg: 24 },
                                        height: "1px",
                                        width: "100%",
                                        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)"
                                    }} />
                                )}
                            </motion.article>
                        ))}
                    </Box>
                </Container>
            </Box>

            <Footer />
        </Box>
    );
}
