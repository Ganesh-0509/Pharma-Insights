'use client'
import { LandingHeader } from "./header"
import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-section"
import { FeaturesSection } from "./features-section"
import { FaqSection } from "./faq-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"

export function LandingPage() {
  return (
    <div className="bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
