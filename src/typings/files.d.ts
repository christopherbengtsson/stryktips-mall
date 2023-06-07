declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  const stringImport: string;
  export default stringImport;
}
