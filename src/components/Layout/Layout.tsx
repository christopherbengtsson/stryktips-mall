import { ReactNode } from "react";
import { AppContainer } from "./AppContainer";
import { Footer } from "./Footer";
import { FormContentContainer, FormWrapper } from "./FormWrapper";
import { NavigationHeader } from "./NavigationHeader";
import { ScrollContainer } from "./ScrollContainer";
import { handleLayoutScroll } from "./handleLayoutScroll";
import { LayoutIdMap } from "./Constants";

export interface LayoutProps {
  hideHeader?: boolean;

  scrollContainer?: boolean;

  leftNavigationItem?: ReactNode;
  centerNavigationItem?: ReactNode;
  rightNavigationItem?: ReactNode;

  /** Defaults to true. Adds spacing to the bottom of the container. */
  bottomPadding?: boolean;

  footerProps?: ReactNode;

  children: React.ReactNode;
}

function WrapperScrollContainer({ children }: { children: ReactNode }) {
  return (
    <ScrollContainer
      onScroll={handleLayoutScroll}
      id={LayoutIdMap.scrollContainer}
      ref={(e) => handleLayoutScroll({ currentTarget: e })}
    >
      {children}
    </ScrollContainer>
  );
}
function EmptyContainer({ children }: { children: ReactNode }) {
  return <ScrollContainer>{children}</ScrollContainer>;
}

export function Layout({
  hideHeader,
  scrollContainer,
  leftNavigationItem,
  centerNavigationItem,
  rightNavigationItem,
  bottomPadding = true,
  children,
  footerProps,
}: LayoutProps) {
  const ScrollWrapper = scrollContainer
    ? WrapperScrollContainer
    : EmptyContainer;

  return (
    <AppContainer>
      {!hideHeader && (
        <NavigationHeader
          centerNavigationItem={centerNavigationItem}
          leftNavigationItem={leftNavigationItem}
          rightNavigationItem={rightNavigationItem}
        />
      )}

      <FormWrapper>
        <ScrollWrapper>
          <FormContentContainer bottomPadding={bottomPadding}>
            {children}
          </FormContentContainer>
        </ScrollWrapper>
      </FormWrapper>
      <Footer>{footerProps}</Footer>
    </AppContainer>
  );
}
