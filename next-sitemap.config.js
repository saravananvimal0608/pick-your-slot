/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://pickyourslot.com/",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
