"use client";

import ProfileButton from "./ProfileButton";
import ThemeToggleButton from "./ThemeToggleButton";
import HeaderRoutes from "./HeaderRoutes";
import ScrollAwareWrapper from "./ScrollAwareWrapper";
import Logo from "./LogoSVG";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSupabase } from "@/hooks/use-supabase";

const Navbar = () => {
  const { user, loading } = useSupabase();

  return (
    <ScrollAwareWrapper>
      <header className="transition-colors duration-300 border-b">
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between w-full mx-auto max-w-7xl">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <Logo />
            </Link>
            <HeaderRoutes />
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            {loading ? (
              <div className="h-10 w-10 animate-pulse bg-muted rounded-full" />
            ) : user ? (
              <ProfileButton user={user} />
            ) : (
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </ScrollAwareWrapper>
  );
};

export default Navbar;