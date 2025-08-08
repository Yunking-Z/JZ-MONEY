declare module 'pg-error' {
  export class Error extends Error {
    constructor(message: string);
    code?: string;
    detail?: string;
    hint?: string;
    position?: string;
  }
}