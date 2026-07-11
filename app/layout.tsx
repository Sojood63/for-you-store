import "./globals.css";

export const metadata = {
  title: "For You Store",
  description: "أجمل مستلزمات العرائس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <head>
        {/* ربط مكتبة Font Awesome الرسمية بشكل صحيح ومباشر */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}