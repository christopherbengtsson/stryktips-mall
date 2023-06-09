import { FunctionComponent, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Body } from '../core/fonts';
import type { StyledIcon } from 'styled-icons/types';
import { isMobile } from '../../utils/device';

export interface OutlineButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  mediumWeight?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
  Icon?: StyledIcon | FunctionComponent<React.SVGAttributes<SVGElement>>;
  displayText?: boolean;
}

export function OutlinedButton({
  children,
  mediumWeight = false,
  Icon,
  displayText,
  ...props
}: OutlineButtonProps) {
  return (
    <StyledOutlineButton {...props}>
      <Container>
        {Icon && <Icon size="20" />}
        {(displayText || !Icon || !isMobile()) && (
          <ButtonText mediumWeight={mediumWeight}>{children}</ButtonText>
        )}
      </Container>
    </StyledOutlineButton>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.xs};
`;

const StyledOutlineButton = styled.button`
  display: flex;
  justify-content: center;
  ${({ theme }) => {
    const { radius, spacing, border } = theme.tokens;
    const { background, font, hover } = theme.outlinedButton;

    return css`
      transition: background 0.25s ease, color 0.25s ease;
      cursor: pointer;
      border-radius: ${radius.s};
      padding: ${spacing.xs} ${spacing.s};
      border-radius: ${radius.s};
      border: ${border.default.size} solid ${border.default.color};
      background: ${background.default};

      color: ${font.color.default};

      :disabled {
        cursor: not-allowed;
        background-color: ${background.disabled};
        color: ${font.color.disabled};
      }

      :not(:disabled):hover {
        background-color: ${hover.background.default};
      }

      ${theme.screens.small} {
        padding: ${spacing.tiny} ${spacing.xs};
      }
    `;
  }}
`;

const ButtonText = styled(Body)<{ mediumWeight: boolean }>`
  ${({ theme, mediumWeight }) => css`
    font-family: ${mediumWeight && theme.tokens.font.bodyMedium.family};
  `}
`;
