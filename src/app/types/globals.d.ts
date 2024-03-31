declare module '*.module.scss';
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

export interface ApiError {
  code: number,
  message: string
}
