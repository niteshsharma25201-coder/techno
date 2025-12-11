'use client';

import Link from 'next/link';
import { Eye, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/admin', label: 'Admin Panel' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => {
      const isActive = pathname === link.href;
      const linkComponent = (
        <Link
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-muted-foreground',
            isMobile && 'block w-full p-4 text-lg'
          )}
        >
          {link.label}
        </Link>
      );
      return isMobile ? (
        <SheetClose asChild key={link.href}>
          {linkComponent}
        </SheetClose>
      ) : (
        <li key={link.href}>{linkComponent}</li>
      );
    });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Eye className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Technoii Optics</span>
        </Link>
        {isMobile ? (
          <div className="flex-1 flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {renderNavLinks(true)}
                  <div className="border-t pt-4 space-y-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">Log In</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                       <Button asChild className="w-full">
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <>
            <nav className="flex-1">
              <ul className="flex items-center space-x-6">
                {renderNavLinks()}
              </ul>
            </nav>
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
