/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 정적 호스팅을 위한 정적 export (out/ 폴더 생성)
  output: "export",
  // 정적 export 시 next/image 최적화 서버가 없으므로 비활성화
  images: {
    unoptimized: true,
    formats: ["image/webp"],
  },
  // /areas/suwon -> /areas/suwon/index.html 형태로 생성되어 정적 호스팅 라우팅이 안정적
  trailingSlash: true,
};

export default nextConfig;
