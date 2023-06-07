import styled from 'styled-components';
import { Body } from '../core/fonts';
import { useMemo } from 'react';

const Container = styled.div<{
  backgroundColor?: string;
  isDarkBackground?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(p) => p.backgroundColor ?? 'initial'};
  padding: 0 ${(p) => p.theme.spacing.s};
  border-radius: ${(p) => p.theme.radius.tiny};
  min-width: 30px;
  text-align: center;
  color: ${(p) => (p.isDarkBackground ? 'white' : 'black')};

  ${(p) => p.theme.screens.large} {
    border-radius: ${(p) => p.theme.radius.s};
    box-shadow: inset 0 0 0 2px ${(p) => darkenBackground(p.backgroundColor ?? 'initial')};
  }
`;

export function Tag({ value }: { value: string }) {
  const { background, isDarkBackground } = useMemo(() => {
    const background = getColorCode(value);
    const isDarkBackground = isColorDark(background);

    return { background, isDarkBackground };
  }, [value]);

  return (
    <Container backgroundColor={background} isDarkBackground={isDarkBackground}>
      <Body>{value}</Body>
    </Container>
  );
}

function getColorCode(value: string) {
  if (value === '-') {
    return '#ffffff';
  }
  const intensity = getColorIntensity(+value);
  return calculateHexColor(intensity);
}

function getColorIntensity(value: number): number {
  if (value >= 1.5) {
    return 100;
  } else if (value >= 1.4) {
    return 90;
  } else if (value >= 1.3) {
    return 80;
  } else if (value >= 1.2) {
    return 70;
  } else if (value >= 1.1) {
    return 60;
  } else if (value >= 1) {
    return 50;
  } else if (value >= 0.9) {
    return 40;
  } else if (value >= 0.8) {
    return 30;
  } else if (value >= 0.7) {
    return 20;
  } else if (value >= 0.6) {
    return 10;
  } else {
    return 0;
  }
}

function calculateHexColor(intensity: number): string {
  let t: number, n: number;

  if (intensity < 50) {
    t = 255;
    n = Math.round(5.1 * intensity);
  } else {
    n = 255;
    t = Math.round(510 - 5.1 * intensity);
  }

  return '#' + ('000000' + (65536 * t + 256 * n + 0).toString(16)).slice(-6);
}

function darkenBackground(color: string): string {
  // Convert the color string to a valid RGB value
  const rgbColor = convertToRGB(color);

  // Darken the RGB color value by reducing the brightness
  const darkerColor = darkenRGB(rgbColor, 0.2); // Adjust the darkness level as needed

  // Convert the darker RGB color back to a hex color code
  const hexColor = convertToHex(darkerColor);

  return hexColor;
}

function convertToRGB(color: string): [number, number, number] {
  const hexColor = color.replace('#', '');

  // Split the hex color into RGB components
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  return [r, g, b];
}

function darkenRGB(rgbColor: [number, number, number], amount: number): [number, number, number] {
  const [r, g, b] = rgbColor;

  // Reduce the brightness of each RGB component
  const darkerR = Math.round(r * (1 - amount));
  const darkerG = Math.round(g * (1 - amount));
  const darkerB = Math.round(b * (1 - amount));

  return [darkerR, darkerG, darkerB];
}

function convertToHex(rgbColor: [number, number, number]): string {
  const [r, g, b] = rgbColor;

  // Convert the RGB components to hex values
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  // Combine the hex values into a hex color code
  const hexColor = `#${hexR}${hexG}${hexB}`;

  return hexColor;
}

function isColorDark(color: string): boolean {
  // Convert the color string to a valid RGB value
  const rgbColor = convertToRGB(color);

  // Calculate the luminance of the RGB color
  const luminance = calculateLuminance(rgbColor);

  // Determine if the color is considered dark based on the luminance value
  return luminance < 0.5; // Adjust the threshold as needed
}

function calculateLuminance(rgbColor: [number, number, number]): number {
  const [r, g, b] = rgbColor;

  // Convert RGB values to relative values
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;

  // Calculate the luminance using the relative RGB values
  const rL = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const gL = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const bL = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);

  // Calculate the relative luminance value
  const luminance = 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;

  return luminance;
}
