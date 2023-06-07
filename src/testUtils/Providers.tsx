import React from 'react';
import { MainStore } from '../stores/MainStore';
import { ThemeProvider } from '../components/core/theme';
import { MainStoreProvider } from '../stores/Providers/MainStoreProvider';

export function Providers({ children, store }: { children: React.ReactNode; store?: MainStore }) {
  return (
    <ThemeProvider>
      <MainStoreProvider store={store ?? new MainStore()}>{children}</MainStoreProvider>
    </ThemeProvider>
  );
}
