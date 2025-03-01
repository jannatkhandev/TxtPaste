'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSupabase } from "@/hooks/use-supabase";
import { usePathname } from 'next/navigation';

const HeaderRoutes = () => {
  const { user } = useSupabase();
  const pathname = usePathname();

  const loggedIn = [
    { href: "/home", label: "Home" },
    { href: "/pastes", label: "Pastes" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  const loggedOut = [
    { href: "/home", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/trending", label: "Trending" },
  ];

  const routes = user ? loggedIn : loggedOut;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-8">
            {routes.map((route, i) => (
              <Link 
                key={i} 
                href={route.href} 
                className={`text-base font-medium transition-colors
                  ${pathname === route.href 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                  }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {routes.map((route, i) => (
          <Button 
            key={i}
            variant="ghost" 
            asChild
            className={`font-medium ${
              pathname === route.href ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            <Link href={route.href}>
              {route.label}
            </Link>
          </Button>
        ))}
      </nav>
    </>
  );
};

export default HeaderRoutes;