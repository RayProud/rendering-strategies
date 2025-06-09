/** @type {import('next').NextConfig} */
import path from 'node:path';

const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
