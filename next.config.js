/** @type {import('next').NextConfig} */
if (!process.env.JWT_SECRET_KEY) {
  console.error(
    'No JWT_SECRET_KEY defined, please review your environment variables.',
  )

  process.exit(-1)
}

module.exports = {
  reactStrictMode: true,
}
