import React, { useEffect } from "react";
import SimpleFooter from "@/components/footer";
import { BackgroundBoxes } from "@/components/hero";
import NavBar from "@/components/navbar";
import { TestimonialMarquee } from "@/components/Testimonials";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  const appTestimonials = [
    {
      quote: "Stewie's intellect is simply unmatched, much like my own.",
      author: "Brian",
    },
    {
      quote: "Ah yes, another feeble attempt at understanding my genius.",
      author: "Lois",
    },
    {
      quote: "One day, he'll rule the world... and I'll take all the credit.",
      author: "Peter",
    },
    {
      quote: "Honestly, I just hope he doesn’t vaporize me.",
      author: "Meg",
    },
  ];

  return (
    <div>
      <NavBar />
      <BackgroundBoxes />
      <TestimonialMarquee testimonials={appTestimonials} />
      <SimpleFooter />
    </div>
  );
}
