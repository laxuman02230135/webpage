import './globals.css';

export const metadata = {
  title: 'CST Canteen',
  description: 'Order food online at CST Canteen',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}