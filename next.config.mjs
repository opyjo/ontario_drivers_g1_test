/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.drivetest.pro" }],
        destination: "https://drivetest.pro/:path*",
        permanent: true,
      },
    ]
  },
  async headers() {
    const privateRoutes = [
      "/auth/:path*",
      "/dashboard/:path*",
      "/payment/:path*",
      "/profile/:path*",
      "/quiz/:path*",
      "/settings/:path*",
      "/signup",
    ]

    return privateRoutes.map((source) => ({
      source,
      headers: [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, noarchive, nosnippet",
        },
      ],
    }))
  },
}

export default nextConfig
