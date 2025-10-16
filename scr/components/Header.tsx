import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                ShoeHaven
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
              All Shoes
            </Link>
            <Link to="/new-arrivals" className="text-sm font-medium hover:text-primary transition-colors">
              New Arrivals
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shoes..."
                className="pl-10 pr-4"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shoes..."
                className="pl-10 pr-4"
              />
            </div>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Shoes
              </Link>
              <Link
                to="/new-arrivals"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
