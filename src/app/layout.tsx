"use client";
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "../_components/navBar";
import "react-toastify/dist/ReactToastify.css";
import Notification from "~/_components/Notifications";
import { usePathname } from "next/navigation";
import ThemeProvider from "./providers/themeProvider";
<<<<<<< HEAD
=======
import WithAuth from "~/_components/Auth/WithAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
>>>>>>> 040f133 (setup project)

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/new-password" ||
    pathname === "/forget-password" ||
    pathname === "/otp" ||
    pathname === "/confirm-account" ||
    pathname === "/choose-account";
  return (
    <html lang="en" className={`${GeistSans.variable}`} 
    suppressHydrationWarning>
      <head>
        <title>EduAI Teacher</title>
        <meta name="description" content="Edu AI-Admin" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="bg-bgSecondary">
<<<<<<< HEAD
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!isLoginPage && <NavBar />}
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
=======
      <WithAuth excludePaths={['/login', '/signup']}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!isLoginPage && <NavBar />}
          <Notification />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </QueryClientProvider>
      </WithAuth>
>>>>>>> 040f133 (setup project)
      </body>
    </html>
  );
}
