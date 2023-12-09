/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const { withEffectorReactAliases } = require('effector-next/tools')

const enhance = withEffectorReactAliases()

module.exports = enhance({})
module.exports = nextConfig
