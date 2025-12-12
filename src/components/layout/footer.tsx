import Link from 'next/link';
import { Eye, Mail, Phone, ChevronsRight } from 'lucide-react';
import Image from 'next/image';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="flex items-center text-muted-foreground hover:text-primary transition-colors">
    <ChevronsRight className="h-4 w-4 mr-2" />
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-10 w-10 text-red-500" />
              <span className="font-bold text-xl font-headline">Techno-i</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Clear Vision Better Vision</h3>
            <p className="text-sm text-muted-foreground">
              Techno-i is an ophthalmic optics company that designs, manufactures and markets lenses to correct or protect eyesight. It has German lacquer coating with nominal price.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/terms">Terms & Condition</FooterLink>
            </nav>
          </div>

          {/* Column 3: Our Top Picks */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Top Picks</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/products/category/fastrack-frames">Fastrack Frames</FooterLink>
              <FooterLink href="/products/category/single-vision">Single Vision Lens</FooterLink>
              <FooterLink href="/products/category/progressive">Progressive Lens</FooterLink>
              <FooterLink href="/products/category/bifocal">Bifocal Lens</FooterLink>
              <FooterLink href="/products/category/zero-power">Zero Power Lens</FooterLink>
              <FooterLink href="/products/brand/techno-i">Techno-i</FooterLink>
            </nav>
          </div>

          {/* Column 4: Help */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <div className="flex flex-col space-y-3">
              <a href="mailto:technoi728@gmail.com" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                technoi728@gmail.com
              </a>
              <a href="tel:+919399842936" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                +919399842936
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
