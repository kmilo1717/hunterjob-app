// src/components/Layout.tsx
import { name_app } from '@/config/config';
import { ReactNode } from 'react';
import Link from 'next/link';
import '@styles/globals.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className='text-2xl font-bold'>
            {name_app}
          </Link>
          <div className="space-x-4">
            <Link href="/logout" className='hover:text-indigo-300'>
              Logout
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-4 py-8 bg-white">
        {children}
      </main>

      <footer className="bg-gray-600 text-white py-4 text-center">
        <p>&copy; 2025 MyApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
