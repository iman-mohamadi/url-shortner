import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Benefits } from '@/components/benefits';
import { Pricing } from '@/components/pricing';
import { CTA } from '@/components/cta';

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <CTA />
      
      {/* Footer */}
      <footer className="relative z-20 border-t border-foreground/10 bg-background/50 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold text-accent">Raya</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                The future of URL shortening for modern professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#docs" className="hover:text-foreground transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-foreground/10 pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Raya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
