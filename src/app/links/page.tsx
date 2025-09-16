"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Footer from "@/components/Footer";

interface LinkItem {
  name: string;
  url: string;
  description?: string;
}

const links: LinkItem[] = [
  {
    name: "Telegram",
    url: "https://t.me/maybeshashank",
    description: "Contact me through TG.",
  },
  {
    name: "Github",
    url: "https://github.com/theshashankk",
    description: "Checkout My GitHub Profile.",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/shashank-kumar-sharma-919653381",
    description: "Here is my Linkedin.",
  },
];

const LinksPage = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

    // Link items animation
    linkRefs.current.forEach((link, index) => {
      if (link) {
        gsap.fromTo(
          link,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2 + index * 0.1,
            ease: "power2.out",
          }
        );
      }
    });
  }, []);

  const setLinkRef = (el: HTMLDivElement | null, index: number) => {
    linkRefs.current[index] = el;
  };

  const isExternalLink = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-20">
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center mb-12">
            <button
              onClick={() => router.push("/")}
              className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors duration-200 absolute left-0"
              aria-label="Go back"
            >
              <IoArrowBack className="text-3xl" />
            </button>
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[var(--primary)] text-center w-full"
            >
              Links
            </h1>
          </div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <div
                key={index}
                ref={(el) => setLinkRef(el, index)}
                className="group"
              >
                <Link
                  href={link.url}
                  {...(isExternalLink(link.url) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="block border border-[var(--foreground)] rounded-lg p-6 transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
                        {link.name}
                      </h2>
                      {link.description && (
                        <p className="text-[var(--foreground)]/70">
                          {link.description}
                        </p>
                      )}
                    </div>
                    {isExternalLink(link.url) && (
                      <FiExternalLink className="w-6 h-6 text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LinksPage;
