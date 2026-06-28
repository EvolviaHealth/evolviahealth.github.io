import './globals.css';

// Root layout pass-through — la vraie balise <html> est dans [locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
