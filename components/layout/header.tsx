"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/brightinfinite-logo-bw1.png"
                alt="BrightInfinite Productions Logo"
                width={80}
                height={80}
                className="h-16 w-auto"
                priority
              />
              <span className="ml-4 text-xl font-bold">BrightInfinite</span>
            </Link>
          </div>

          {/* Navigation Menu Component - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Music</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/music"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Featured Tracks
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Check out our latest and greatest music releases.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/album"
                          >
                            <div className="text-sm font-medium leading-none">
                              Albums
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse through our complete collection of albums.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/music"
                          >
                            <div className="text-sm font-medium leading-none">
                              Singles
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover our latest single releases.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/bio"
                          >
                            <div className="text-sm font-medium leading-none">
                              Biography
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn more about our story and journey.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/contact"
                          >
                            <div className="text-sm font-medium leading-none">
                              Contact
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get in touch with us.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/store" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Store
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/testing" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Testing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/music"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/music"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Music
                  </Link>
                  <Link
                    href="/album"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/album"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Albums
                  </Link>
                  <Link
                    href="/bio"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/bio"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Bio
                  </Link>
                  <Link
                    href="/store"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/store"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Store
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/contact"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/testing"
                    className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                      pathname === "/testing"
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    Testing
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
