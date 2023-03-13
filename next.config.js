/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logodetimes.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'melanciadepapel.com.br' },
      { protocol: 'https', hostname: 'havaianas.com.br' },
      { protocol: 'https', hostname: 'app.somosdestra.com' },
      { protocol: 'https', hostname: 'rotadigitalbr.com.br' },
      { protocol: 'https', hostname: 'img.elo7.com.br' },
      { protocol: 'http', hostname: 'd2r9epyceweg5n.cloudfront.net' },
    ]
  }
}

module.exports = nextConfig
