'use client';

import { ThemeProvider } from 'next-themes';
import { DjangoAuthProvider } from './django-auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DjangoAuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </DjangoAuthProvider>
  );
}
