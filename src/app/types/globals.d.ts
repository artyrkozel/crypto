declare module '*.module.scss';
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const content: string;
  export default content;
}
