import { Inter,Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Meeting Scheduler App",
  description: "This is only one platform to conduct meetings at various platforms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
         {children}
         <Toaster />

      </body>
    </html>
  );
}
