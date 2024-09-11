export class IMGProcessingAPIError {
  type: string;
  error: string;
  status: number;
  message?: string;
  errors?: string[];

  constructor({
    type,
    error,
    status,
    message,
    errors,
  }: IMGProcessingAPIError.Options) {
    this.type = type;
    this.error = error;
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

declare namespace IMGProcessingAPIError {
  export type Options = {
    type: string;
    error: string;
    status: number;
    message?: string;
    errors?: string[];
  };
}
