import './globals.css';
import { AppProvider } from './context/AppContext';

export const metadata = {
  title: 'CST Canteen',
  description: 'Order food online at CST Canteen',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}