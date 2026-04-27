"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, Mail } from "lucide-react";
import { Box, Typography, Button, Container } from "@mui/material";
import { notFound } from "next/navigation";
import NavBar from "@/component/Home/NavBar";
import Footer from "@/component/Home/Footer";

// Import assets
import model1 from "@/Assets/Model-1.png";
import partialPaymentImg from "@/Assets/partial_payment_pys.png";
import model2 from "@/Assets/course_illustration_pys.png";
import bulkBookingImg from "@/Assets/bulk_booking_cover.png";
import gameHostingImg from "@/Assets/game_hosting_illustration.png";
import passImg from "@/Assets/pys_elite_pass.png";
import sports from "@/Assets/sports.webp";
import BgImg from "@/Assets/video-bg.png"; 

// Shared Data (Same as Services Page)
const servicesData = [
    {
        id: 1,
        title: "Membership",
        description:
            "Unlock exclusive benefits and premium access to top-rated facilities with our flexible membership plans tailored to your lifestyle. Enjoy priority booking, member-only events, and significant discounts across our network of partners.",
        detailedContent: `
# Unlock Your Potential with Premium Membership

Our membership program is designed for those who demand the best. Whether you're a fitness enthusiast, a sports lover, or someone who simply values convenience and quality, our membership opens doors to a world of premium experiences.

## Key Benefits
- Priority Access  : Be the first to book your favorite slots at high-demand venues. No more waiting in line or missing out.
- Exclusive Discounts  : Enjoy up to 20% off on all bookings and partner services.
- Member-Only Events : Get invited to exclusive tournaments, workshops, and social gatherings.

## Flexible Plans
We offer monthly, quarterly, and annual plans to suit your commitment level. Cancel anytime with no hidden fees.

### Join a Community
Connect with like-minded individuals and be part of a vibrant community that values health, wellness, and active living.
    `,
        features: ["Priority Booking", "Exclusive Discounts", "Member-only Events"],
        image: model1,
        slug: "membership",
        gradient: "from-blue-400 to-purple-600",
        faqs: [
            {
                question: "Can I cancel my membership anytime?",
                answer: "Yes, you can cancel your membership at any time. Your benefits will continue until the end of the current billing cycle.",
            },
            {
                question: "Are there any hidden fees?",
                answer: "No, our pricing is transparent. What you see is what you pay.",
            },
            {
                question: "Can I share my membership?",
                answer: "Memberships are non-transferable and intended for individual use only.",
            },
        ],
    },
    {
        id: 2,
        title: "Course",
        description:
            "Elevate your skills with expert-led courses. From sports coaching to creative workshops, find the perfect course for you. Our curriculum is designed by industry professionals to ensure you get the best learning experience.",
        detailedContent: `
# Master New Skills with Expert-Led Courses

Transform your passion into proficiency with our wide range of courses. We partner with top coaches and institutions to bring you high-quality training in various disciplines.

## What We Offer
- Sports Coaching  : Football, Tennis, Swimming, and more. Learn from certified coaches.
- Creative Workshops  : Photography, Art, and Music classes for all skill levels.
- Professional Development  : Leadership and soft skills workshops to boost your career.

## Certification
Upon successful completion of our courses, receive a certificate recognized by our partner institutions.

### Flexible Schedules
We understand you're busy. That's why we offer weekend batches, evening classes, and intensive crash courses.
    `,
        features: ["Expert Instructors", "Flexible Schedules", "Certification"],
        image: model2,
        slug: "course",
        gradient: "from-green-400 to-teal-600",
        faqs: [
            {
                question: "Do you offer certificates?",
                answer: "Yes, you will receive a certificate of completion for most of our courses.",
            },
            {
                question: "Can I get a refund if I can't attend?",
                answer: "Refund policies vary by course. Please check the specific course details for more information.",
            },
        ],
    },
    {
        id: 3,
        title: "Bulk Booking",
        description:
            "Planning an event or finding slots for a large group has never been easier. With our advanced Bulk Booking flow, you dictate your terms. Simply tell us what you need and let the venues come to you.",
        detailedContent: `
# A Revolutionary Way to Book Venues

Organizing an event shouldn't mean spending hours calling venues to check for availability and pricing. Our Bulk Booking feature puts you in control, allowing vendors to compete for your business.

## Two Ways to Request
- Private Request  : Know exactly where you want to play? Send your bulk booking date and time request directly to your preferred venue.
- Public Request  : Open to options? Broadcast your requirements to all participating venues in the area. 

## The Negotiation Flow
1. Submit Dates & Times  : Provide your preferred schedule and any specific requirements.
2. Vendors Respond  : Interested venues will reply to your request, indicating their availability, the required advance amount, and the total cost.
3. You Choose  : Review the responses to your public or private request. Once you receive an offer you love, simply accept it and make your payment.

### Power to the Customer
This system ensures you get the fairest market prices and confirms venues actually have what you need before you commit your money.
    `,
        features: ["Flexible Requests", "Vendor Responses", "Secure Confirmations"],
        image: bulkBookingImg,
        slug: "bulkbooking",
        gradient: "from-orange-400 to-red-600",
        faqs: [
            {
                question: "Do I have to pay when submitting a request?",
                answer: "No, submitting a request is completely free. You only pay when you accept a vendor's offer.",
            },
            {
                question: "How quickly do vendors respond to public requests?",
                answer: "Vendors typically respond swiftly, providing their availability, advance requirements, and total pricing options within a short timeframe so you can finalize your plans without delay.",
            },
        ],
    },
    {
        id: 4,
        title: "Hosting",
        description:
            "Take the lead and organize your own games! Book a slot at any venue, create a game, set the participant limits, and publish it for the community to join.",
        detailedContent: `
# Host Your Own Game and Build a Community

Why wait for a game to happen when you can organize one yourself? Our Hosting feature empowers you to book a slot, create an open game, and invite other players to join in on the action.

## How Game Hosting Works
- Book a Slot  : Browse available venues and times, then secure your desired slot.
- Create & Publish  : Name your game, set a firm maximum player limit based on the sport or your preference, and publish it to the community platform.
- Players Join  : Other users on the platform can discover your published game and reserve their spot until the maximum limit you set is reached.

## The Benefits of Hosting
- Find Players Easily  : No more struggling to gather enough people for a match. Let the active community fill out your roster.
- Set the Rules  : You are the host. You dictate the exact number of participants, the skill level, and the overall vibe of the game.
- Expand Your Network  : Meet new players, form reliable local teams, and expand your sports and fitness connections.

### A Seamless Experience
We handle all the technical tracking. Once players join and hit your defined limit, your game automatically closes to new participants, ensuring the event runs exactly as you envisioned.
    `,
        features: ["Book & Create", "Custom Player Limits", "Community Publishing"],
        image: gameHostingImg,
        slug: "hosting",
        gradient: "from-pink-400 to-rose-600",
        faqs: [
            {
                question: "Can I restrict how many people join my hosted game?",
                answer: "Absolutely! When you create and publish the game, you will set a maximum participant limit. Once that limit is hit, no additional players can join.",
            },
            {
                question: "Can I choose who joins my game?",
                answer: "Yes! When community members request to join your game, you as the game creator have the full control to either accept or reject their requests before they can participate.",
            },
        ],
    },
    {
        id: 5,
        title: "Pass",
        description:
            "Unlock exclusive offers across a network of facilities with a single purchase. The PYS Pass grants you seamless access and special rates at all mentioned venues.",
        detailedContent: `
# One Unified Pass, Multiple Handpicked Venues

Instead of managing individual memberships or paying full price everywhere, the PYS Pass consolidates your active lifestyle into one convenient digital card.

## How the Pass Works
- Curated Venue List  : Every pass specifically mentions the premium venues and facilities where it is valid.
- Unlock Exclusive Offers  : Present or use your digital pass at these partner locations to receive steep discounts, special perks, or free access packages.
- Variety of Options  : Choose a pass tailored for your neighborhood, or grab an activity-specific pass like a 'City-Wide Turf Pass'.

## Simply Buy, Show, and Play
1. Choose Your Pass  : Browse our selection of passes and see exactly which venues are included.
2. Purchase  : Buy the pass securely on our platform.
3. Redeem Offers  : Visit the mentioned venues and use your pass to unlock your special rates instantly!

### Significant Savings
If you play often or like trying out different nearby arenas, our structured passes provide massive cost-saving advantages over single-session bookings.
    `,
        features: ["Multi-venue Validity", "Instant Savings", "Exclusive Perks"],
        image: passImg,
        slug: "pass",
        gradient: "from-violet-400 to-indigo-600",
        faqs: [
            {
                question: "Where can I use my purchased pass?",
                answer: "Each pass has a specified list of venues where it is valid. You can view these mentioned venues on the pass details page before and after your purchase.",
            },
            {
                question: "Do the passes grant complete free access or just discounts?",
                answer: "It depends on the specific pass! Some act as bulk prepaid sessions granting free entry, while others serve as a privilege card giving you heavy percentage discounts.",
            },
        ],
    },
    {
        id: 6,
        title: "Partial Payment",
        description:
            "Allow customers to confirm bookings with a small advance payment. This reduces cancellations while making bookings more convenient for your customers.",
        detailedContent: `
# Secure Your Spot with Partial Payments

We understand that paying the full amount upfront isn't always convenient. That's why we introduce the Partial Payment option—a flexible way to confirm your bookings without breaking the bank.

## How It Works
- Small Advance  : Pay just a fraction of the total cost to secure your booking instantly.
- Pay the Rest Later  : The remaining balance can be settled at the venue on the day of your event, or before the booking starts through our platform.
- Instant Confirmation  : Your slot is guaranteed the moment your partial payment is successful.

## Benefits for You
- Flexibility  : Better cash flow management for your group or team.
- Reduced Risk  : Secure high-demand slots well in advance without full commitment.
- Easy Refunds  : Subject to our cancellation policy, partial payments offer easier refund processing.

### Secure Transactions
All our payment gateways are fully encrypted, ensuring your advance payments are completely safe and secure.
    `,
        features: ["Advance Payment Option", "Secure Transactions", "Instant Confirmation"],
        image: partialPaymentImg,
        slug: "partial-payment",
        gradient: "from-blue-400 to-purple-600",
        faqs: [
            {
                question: "What percentage do I need to pay as a partial payment?",
                answer: "The partial payment amount varies by venue and activity, typically ranging from 20% to 50% of the total booking cost.",
            },
            {
                question: "Is the partial payment refundable if I cancel?",
                answer: "Refunds for partial payments depend on the specific venue's cancellation policy. Please review the terms before booking.",
            },
        ],
    },
];

function FAQItem({ question, answer, gradient }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s",
                "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                },
                cursor: "pointer",
            }}
        >
            <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>
                    {question}
                </Typography>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ChevronDown size={20} color="#cbd5e1" />
                </Box>
            </Box>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box sx={{ px: 3, pb: 3, pt: 0, color: "#cbd5e1", lineHeight: 1.6, borderTop: "1px solid transparent" }}>
                            {answer}
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}

function ContentRenderer({ service }) {
    const lines = service.detailedContent.split("\n");
    const sections = [];
    let intro = [];
    let currentSection = null;

    lines.forEach((line) => {
        if (line.startsWith("## ")) {
            if (currentSection) sections.push(currentSection);
            currentSection = { title: line.replace("## ", ""), content: [] };
        } else if (currentSection) {
            currentSection.content.push(line);
        } else {
            intro.push(line);
        }
    });
    if (currentSection) sections.push(currentSection);

    const [openSectionIndex, setOpenSectionIndex] = useState(0);

    const renderBlock = (blockLines) => {
        return blockLines.map((paragraph, index) => {
            if (paragraph.startsWith("# ")) {
                return (
                    <Typography
                        key={index}
                        variant="h3"
                        sx={{
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            fontWeight: 700,
                            background: `linear-gradient(to right, ${service.gradient === "from-blue-400 to-purple-600"
                                ? "#60a5fa, #9333ea"
                                : service.gradient === "from-green-400 to-teal-600"
                                    ? "#4ade80, #0d9488"
                                    : service.gradient === "from-orange-400 to-red-600"
                                        ? "#fb923c, #dc2626"
                                        : service.gradient === "from-pink-400 to-rose-600"
                                            ? "#f472b6, #e11d48"
                                            : "#a78bfa, #4f46e5"
                                })`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mt: 6,
                            mb: 4,
                            "&:first-of-type": { mt: 0 },
                        }}
                    >
                        {paragraph.replace("# ", "")}
                    </Typography>
                );
            } else if (paragraph.startsWith("### ")) {
                return (
                    <Typography key={index} variant="h5" sx={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff", mt: 4, mb: 2 }}>
                        {paragraph.replace("### ", "")}
                    </Typography>
                );
            } else if (paragraph.startsWith("- ")) {
                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            gap: 2,
                            p: 2,
                            mb: 1.5,
                            borderRadius: "16px",
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "all 0.3s",
                            "&:hover": { borderColor: "rgba(255, 255, 255, 0.2)" },
                        }}
                    >
                        <Box
                            sx={{
                                flexShrink: 0,
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${service.gradient === "from-blue-400 to-purple-600"
                                    ? "#60a5fa, #9333ea"
                                    : "#3b82f6" // simplifying other gradients for brevity or keeping uniform logic
                                    })`, // Simplified logic for brevity, ideally match all gradients
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Check size={14} />
                        </Box>
                        <Typography sx={{ fontSize: "1.1rem", color: "#e2e8f0", fontWeight: 500 }}>{paragraph.replace("- ", "")}</Typography>
                    </Box>
                );
            } else if (paragraph.trim() === "") {
                return <Box key={index} sx={{ height: 8 }} />;
            } else {
                return (
                    <Typography key={index} sx={{ fontSize: "1.125rem", color: "#cbd5e1", mb: 3, fontWeight: 300, lineHeight: 1.8 }}>
                        {paragraph}
                    </Typography>
                );
            }
        });
    };

    return (
        <Box sx={{ color: "#cbd5e1" }}>
            <Box sx={{ mb: 6 }}>{renderBlock(intro)}</Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sections.map((section, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            border: "1px solid",
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            bgcolor: "rgba(255, 255, 255, 0.03)",
                            transition: "all 0.3s",
                            "&:hover": { borderColor: "rgba(255, 255, 255, 0.2)" },
                        }}
                    >
                        <Box
                            component="button"
                            onClick={() => setOpenSectionIndex(openSectionIndex === idx ? null : idx)}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 3,
                                cursor: "pointer",
                                bgcolor: "transparent",
                                border: "none",
                                textAlign: "left",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        height: 24,
                                        width: 4,
                                        borderRadius: "99px",
                                        background: `linear-gradient(to bottom, ${service.gradient === "from-blue-400 to-purple-600" ? "#60a5fa, #9333ea" : "#3b82f6"
                                            })`,
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
                                    {section.title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "transform 0.3s",
                                    transform: openSectionIndex === idx ? "rotate(180deg)" : "none",
                                }}
                            >
                                <ChevronDown size={20} color="#cbd5e1" />
                            </Box>
                        </Box>
                        <AnimatePresence>
                            {openSectionIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Box sx={{ px: 3, pb: 4, pt: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                        {renderBlock(section.content)}
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default function ServiceDetail({ params }) {
    
    const { slug } = React.use(params);

    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        notFound();
        return null;
    }

    const relatedServices = servicesData.filter((s) => s.id !== service.id).slice(0, 3);

    return (
        <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "white" }}>
            <NavBar />

            <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
                {/* Background Image Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${BgImg.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.4,
                        zIndex: 0
                    }}
                />

                {/* Spacing for Fixed Navbar */}
                <Box sx={{ height: { xs: 80, md: 100 } }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
                    {/* Back Link */}
                    <Link href="/services" style={{ textDecoration: "none" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#94a3b8", mb: 6, transition: "color 0.2s", "&:hover": { color: "#fff" } }}>
                            <ArrowLeft size={18} />
                            <Typography sx={{ fontWeight: 500 }}>Back to Services</Typography>
                        </Box>
                    </Link>

                    {/* Hero Section */}
                    <Box sx={{ display: "grid", gridTemplateColumns: { lg: "1fr 1fr" }, gap: 8, mb: 12 }}>
                        {/* Left Content */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 2,
                                    py: 1,
                                    borderRadius: "99px",
                                    background: `linear-gradient(to right, ${service.gradient === "from-blue-400 to-purple-600"
                                        ? "#60a5fa, #9333ea"
                                        : "#4ade80, #0d9488" // simplified fallback
                                        })`,
                                    color: "white",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    mb: 4,
                                    boxShadow: "0 4px 14px 0 rgba(0,0,0,0.3)"
                                }}
                            >
                                <Check size={14} />
                                <Check size={14} />
                                Premium Service
                            </Box>

                            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 800, lineHeight: 1.1, mb: 4, color: "#fff" }}>
                                {service.title}
                            </Typography>

                            <Typography sx={{ fontSize: "1.25rem", color: "#cbd5e1", mb: 6, lineHeight: 1.6 }}>
                                {service.description}
                            </Typography>

                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Mail size={20} />}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: "99px",
                                        background: `linear-gradient(to right, ${service.gradient === "from-blue-400 to-purple-600" ? "#2563eb, #7c3aed" : "#3b82f6, #8b5cf6"
                                            })`,
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: 600,
                                        boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.4)",
                                        "&:hover": { transform: "scale(1.05)", boxShadow: "0 15px 25px -5px rgba(59, 130, 246, 0.5)" },
                                        transition: "all 0.3s"
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <Box sx={{ position: "relative", height: { xs: 300, lg: 500 }, borderRadius: "32px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
                                <Box sx={{ position: "absolute", inset: 0, opacity: 0.3, background: `linear-gradient(to bottom right, ${service.gradient === "from-blue-400 to-purple-600" ? "#60a5fa" : "#4ade80"}, transparent)` }} />
                                <Image src={service.image} alt={service.title} fill style={{ objectFit: "cover" }} />
                            </Box>
                        </motion.div>
                    </Box>

                    {/* Detailed Content */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                        <Box
                            sx={{
                                position: "relative",
                                bgcolor: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "32px",
                                p: { xs: 4, md: 8 },
                                mb: 12,
                                overflow: "hidden",
                                backdropFilter: "blur(20px)"
                            }}
                        >
                            {/* Decorative Blob */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: -100,
                                    right: -100,
                                    width: 300,
                                    height: 300,
                                    borderRadius: "50%",
                                    background: `linear-gradient(to bottom right, ${service.gradient === "from-blue-400 to-purple-600" ? "#60a5fa" : "#c084fc"
                                        })`,
                                    filter: "blur(100px)",
                                    opacity: 0.15,
                                    pointerEvents: "none"
                                }}
                            />

                            <ContentRenderer service={service} />
                        </Box>
                    </motion.div>

                    {/* FAQ Section */}
                    {service.faqs && (
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                            <Box sx={{ maxWidth: "800px", mx: "auto", mb: 12 }}>
                                <Typography variant="h2" sx={{ textAlign: "center", fontSize: "2.25rem", fontWeight: 700, mb: 6, color: "#fff" }}>
                                    Frequently Asked Questions
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    {service.faqs.map((faq, idx) => (
                                        <FAQItem key={idx} question={faq.question} answer={faq.answer} gradient={service.gradient} />
                                    ))}
                                </Box>
                            </Box>
                        </motion.div>
                    )}

                    {/* CTA Section */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                        <Box
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "32px",
                                p: { xs: 6, md: 8 },
                                textAlign: "center",
                                mb: 12,
                                background: `linear-gradient(to right, ${service.gradient === "from-blue-400 to-purple-600" ? "#2563eb, #7c3aed" : "#4ade80, #0d9488"
                                    })`
                            }}
                        >
                            <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: 700, color: "#fff", mb: 2 }}>
                                Ready to Get Started?
                            </Typography>
                            <Typography sx={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.9)", mb: 6 }}>
                                Let's discuss how we can help you achieve your goals with {service.title}
                            </Typography>
                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Mail size={20} />}
                                    sx={{
                                        px: 5,
                                        py: 2,
                                        borderRadius: "99px",
                                        bgcolor: "white",
                                        color: "#000",
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        "&:hover": { bgcolor: "#f8fafc", transform: "scale(1.05)" },
                                        transition: "all 0.3s"
                                    }}
                                >
                                    Contact Us Today
                                </Button>
                            </Link>
                        </Box>
                    </motion.div>

                    {/* Related Services */}
                    <Box sx={{ mb: 8 }}>
                        <Typography variant="h3" sx={{ fontSize: "2rem", fontWeight: 700, mb: 6, color: "#fff" }}>
                            Other Services
                        </Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
                            {relatedServices.map((related) => (
                                <Link key={related.id} href={`/${related.slug}`} style={{ textDecoration: "none" }}>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            bgcolor: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            borderRadius: "24px",
                                            overflow: "hidden",
                                            transition: "all 0.3s",
                                            "&:hover": { transform: "translateY(-8px)", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }
                                        }}
                                    >
                                        <Box sx={{ position: "relative", height: 240 }}>
                                            <Image src={related.image} alt={related.title} fill style={{ objectFit: "cover" }} />
                                            <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.2)" }} />
                                        </Box>
                                        <Box sx={{ p: 4 }}>
                                            <Typography variant="h5" sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", mb: 1 }}>
                                                {related.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: "0.875rem", color: "#94a3b8", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                {related.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    </Box>

                </Container>
            </Box>

            <Footer />
        </Box>
    );
}
