"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoDownload } from "react-icons/io5";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function AboutPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    // Calculate age programmatically
    const birthDate = new Date(2006, 11, 23); // Month is 0-indexed (8 for September)
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    setAge(calculatedAge);

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Content glow effect
      if (contentRef.current) {
        gsap.set(contentRef.current.children, { opacity: 0.7 }); // Apply to children (paragraphs and divs)
        gsap.to(contentRef.current.children, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 0.3,
          onComplete: () => {
            // Start timeline animations after text is done
            if (timelineRef.current) {
              const timelineItems =
                timelineRef.current.querySelectorAll(".timeline-item");

              timelineItems.forEach((item, index) => {
                gsap.set(item, { opacity: 0.7 });
                gsap.to(item, {
                  opacity: 1,
                  duration: 1.2,
                  ease: "power2.inOut",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                  delay: index * 0.2,
                });
              });
            }
          },
        });
      }
    });

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-20">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center mb-12">
            <button
              onClick={() => router.back()}
              className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-200 absolute left-0"
              aria-label="Go back"
            >
              <IoArrowBack className="text-3xl" />
            </button>
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[var(--primary)] text-center w-full"
            >
              About Me
            </h1>
          </div>

          <div className="space-y-8">
            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-[var(--foreground)]/80 leading-relaxed">
                Hi, I&apos;m Shashank. I&apos;m a
                {age !== null ? ` ${age}-year-old` : ""} student, passionate
                Digital Marketer, and freelancer based in Uttarakhand, India.
              </p>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--primary)]">
                    What I Do
                  </h3>
                  <p className="text-base md:text-lg text-[var(--foreground)]/80">
                    As a freelance digital marketer, I take the stress of social media off your plate. I love helping brands like yours connect with their audience through creative and consistent content. From planning posts to engaging with your followers, I handle it all so you can get back to running your business.
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--primary)]">
                    My Approach
                  </h3>
                  <p className="text-base md:text-lg text-[var(--foreground)]/80">
                    My process is built on a foundation of strategy, collaboration, and data. I don't just post content; I build a strategic online presence for your brand.
                  </p>
                </div>
              </div>

              <div className="bg-[var(--primary)]/5 rounded-xl p-4 md:p-6 border border-[var(--primary)]/10">
                <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-2 md:mb-3">
                  Why I Do It
                </h3>
                <p className="text-base md:text-lg text-[var(--foreground)]/80">
                  The digital marketing landscape changes every day, and that's what excites me. I&apos;m in a unique position: my classroom is the marketing world, and the marketing world is my classroom.
As a current BBA in Digital Marketing student, I&apos;m immersed in the latest strategies, tools, and theories. As a freelancer, I put that knowledge into practice every single day.
I focus on social media management because it’s the frontline of brand communication, where real relationships are built. My passion is growing as I learn more about product marketing—understanding the full journey from an idea to a customer's hands.
I do this to bring fresh, informed, and energetic strategies to the table. I&apos;m driven to help businesses navigate the complexities of the online world and achieve tangible growth.
                </p>
              </div>
            </div>


            <div className="mt-16 flex justify-center">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-lg font-semibold hover:bg-[var(--accent)] transition-colors duration-200"
              >
                <IoDownload className="text-xl" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
