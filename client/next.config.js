/** @type {import('next').NextConfig} */
const nextConfig = {
    //이미지 src경로 제한 설정 풀기
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'www.gravatar.com'], // 이미지를 호스팅하는 도메인을 여기에 추가
    },
}

module.exports = nextConfig
