/** @type {import('next').NextConfig} */

const redirectLinks = {
  github: "https://github.com/theshashankk",
  tg: "https://t.me/maybeshashank",
  x: "https://x.com/shashannxd",
  linkedin: "https://www.linkedin.com/in/shashank-kumar-sharma-919653381",
};

const nextConfig = {
  async redirects() {
    return Object.entries(redirectLinks).map(([key, value]) => ({
      source: `/${key}`,
      destination: value,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
