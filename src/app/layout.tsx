import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Customer 360 Dashboard',
  description: '통신사 고객 360도 통합 대시보드',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
