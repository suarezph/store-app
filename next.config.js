/** @type {import('next').NextConfig} */
if (
  !process.env.JWT_SECRET_KEY ||
  !process.env.WEB_API_URL ||
  !process.env.MONGODB_URI
) {
  console.error(
    'No [JWT_SECRET_KEY, WEB_API_URL, MONGODB_URI] defined, please review your environment variables.',
  )

  process.exit(-1)
}

module.exports = {
  env: {
    WEB_API_URL: process.env.WEB_API_URL,
  },
  reactStrictMode: true,
}
