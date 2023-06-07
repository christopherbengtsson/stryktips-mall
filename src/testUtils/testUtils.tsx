import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { MainStore } from '../stores/MainStore';
import { Providers } from './Providers';

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  store?: MainStore;
};

const customRender = (ui: ReactElement, { store, ...options }: CustomRenderOptions = {}) => {
  return render(ui, {
    wrapper: ({ children }) => <Providers store={store}>{children}</Providers>,
    ...options,
  });
};

export { screen, waitFor, within, act } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };

export const suppressErrorLog = async (fn: () => Promise<void> | void) => {
  // React test library is unable to suppress console logs of errors even though the error is expected and properly handled
  // This is due to internal issues in React test renderer https://github.com/facebook/react/issues/15520

  const original = console.error;
  console.error = () => {};
  await fn();
  console.error = original;
};
