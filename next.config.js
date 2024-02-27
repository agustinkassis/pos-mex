/** @type {import('next').NextConfig} */

const withSerwist = require('@serwist/next').default({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: 'src/lib/sw.ts',
  swDest: 'public/sw.js'
})

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
}

module.exports = withSerwist(nextConfig)
