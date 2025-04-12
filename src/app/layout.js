import ThemeRegistry from "@/components/ThemeRegistry";
export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ThemeRegistry>
        {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
