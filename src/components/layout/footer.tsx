import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Eye className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Technoii Optics</span>
          </div>
          <nav className="flex space-x-6 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Technoii Optics. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
