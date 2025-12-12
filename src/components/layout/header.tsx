'use client';

import Link from 'next/link';
import { Eye, Menu, LogOut, Search, ShoppingBag, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/admin', label: 'Admin Panel' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
  };
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
  }

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
  
  const AuthButtons = () => {
    if (isUserLoading) {
      return null;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName ?? 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/account">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Button asChild variant="ghost">
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  };
  
  const MobileAuthButtons = () => {
    if (isUserLoading) {
      return null;
    }

    if (user) {
      return (
        <>
         <SheetClose asChild>
            <Link href="/account/orders" className="flex items-center w-full p-4 text-lg text-muted-foreground hover:text-primary">
                <ShoppingBag className="mr-2 h-5 w-5" />
                <span>My Orders</span>
            </Link>
        </SheetClose>
        <SheetClose asChild>
            <Link href="/account" className="flex items-center w-full p-4 text-lg text-muted-foreground hover:text-primary">
                <UserIcon className="mr-2 h-5 w-5" />
                <span>My Account</span>
            </Link>
        </SheetClose>
        <div className="border-t pt-4">
          <SheetClose asChild>
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              Log Out
            </Button>
          </SheetClose>
        </div>
        </>
      );
    }
    
    return (
      <>
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
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-auto flex items-center space-x-2">
          <Eye className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Technoii Optics</span>
        </Link>
        {isMobile ? (
          <div className="flex items-center gap-2">
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search />
                  <span className="sr-only">Open search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <div className="w-full relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9 w-full bg-card"
                    autoFocus
                  />
                </div>
              </SheetContent>
            </Sheet>
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
                    <MobileAuthButtons />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <>
            <nav className="flex-1">
              <ul className="flex items-center justify-center space-x-6">
                {renderNavLinks()}
              </ul>
            </nav>
            <div className="flex flex-1 items-center justify-end px-4 gap-4">
              <div className="w-full max-w-xs relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              <AuthButtons />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
