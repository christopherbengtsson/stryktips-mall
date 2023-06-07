import styled from "styled-components";
import { Body } from "../core/fonts";

const Container = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(p) => p.color ?? "initial"};
  padding: 0 ${(p) => p.theme.spacing.s};
  border-radius: ${(p) => p.theme.radius.m};
  border: 1px solid ${(p) => p.color ?? "initial"};
  box-shadow: 0 0 0 2px ${(p) => darkenBackground(p.color ?? "initial")};
  min-width: 30px;
  text-align: center;
`;

export function Tag({ value }: { value: string }) {
  return (
    <Container color={getColorCode(value)}>
      <Body>{value}</Body>
    </Container>
  );
}

function getColorCode(value: string) {
  if (value === "-") {
    return "#ffffff";
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

  return "#" + ("000000" + (65536 * t + 256 * n + 0).toString(16)).slice(-6);
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
  const hexColor = color.replace("#", "");

  // Split the hex color into RGB components
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  return [r, g, b];
}

function darkenRGB(
  rgbColor: [number, number, number],
  amount: number
): [number, number, number] {
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
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  // Combine the hex values into a hex color code
  const hexColor = `#${hexR}${hexG}${hexB}`;

  return hexColor;
}
