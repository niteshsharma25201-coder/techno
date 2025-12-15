
'use client';

import Link from 'next/link';
import {
  Eye,
  Menu,
  LogOut,
  Search,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
} from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import SearchBar from './search-bar';
import { useAdminStatus } from '@/hooks/use-admin-status';

const shopSubLinks = [
    { href: '/products?category=Sunglasses', label: 'Sunglasses' },
    { href: '/products?category=Eyewear', label: 'Eyewear' },
    { href: '/products?category=Lenses', label: 'Lenses' },
    { href: '/products?category=Contact+Lenses', label: 'Contact Lenses' },
]

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { isAdmin } = useAdminStatus();

  const handleLogout = async () => {
    await auth.signOut();
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map((n) => n[0]).join('');
  };

  const renderNavLinks = (isMobile = false) => {
    if (isMobile) {
      return (
        <>
          <SheetClose asChild>
            <Link href="/" className="block w-full p-4 text-lg text-muted-foreground hover:text-primary">Home</Link>
          </SheetClose>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shop" className="border-b-0">
              <AccordionTrigger className="w-full p-4 text-lg text-muted-foreground hover:text-primary hover:no-underline">
                Shop
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="flex flex-col pl-8">
                  {shopSubLinks.map((subLink) => (
                    <SheetClose asChild key={subLink.href}>
                      <Link
                        href={subLink.href}
                        className="block w-full p-3 text-base text-muted-foreground hover:text-primary"
                      >
                        {subLink.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {isAdmin && (
            <SheetClose asChild>
              <Link href="/admin" className="block w-full p-4 text-lg text-muted-foreground hover:text-primary">Admin Panel</Link>
            </SheetClose>
          )}
        </>
      );
    }

    return (
      <>
        <li>
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
        </li>
        <li>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:text-primary px-2">
                        Shop
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {shopSubLinks.map(subLink => (
                        <DropdownMenuItem key={subLink.href} asChild>
                            <Link href={subLink.href}>{subLink.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
        {isAdmin && (
          <li>
            <Link
              href="/admin"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/admin' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Admin Panel
            </Link>
          </li>
        )}
      </>
    );
  };

  const AuthButtons = () => {
    if (isUserLoading) {
      return null;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.photoURL ?? ''}
                  alt={user.displayName ?? 'User'}
                />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName ?? 'User'}
                </p>
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
            <Link
              href="/account/orders"
              className="flex items-center w-full p-4 text-lg text-muted-foreground hover:text-primary"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              <span>My Orders</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/account"
              className="flex items-center w-full p-4 text-lg text-muted-foreground hover:text-primary"
            >
              <UserIcon className="mr-2 h-5 w-5" />
              <span>My Account</span>
            </Link>
          </SheetClose>
          <div className="border-t pt-4">
            <SheetClose asChild>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
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
  };

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
                  <SearchBar />
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
                <SearchBar />
              </div>
              <AuthButtons />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
