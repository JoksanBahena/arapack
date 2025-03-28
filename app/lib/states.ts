export interface BoxState {
  message: string | null;
  errors: {
    symbol?: string[];
    client?: string[];
    type?: string[];
    length?: string[];
    status?: string[];
    creases?: {
      r1?: string[];
      r2?: string[];
      r3?: string[];
    };
    width?: string[];
    [key: string]:
      | string[]
      | { r1?: string[]; r2?: string[]; r3?: string[] }
      | undefined;
  };
}
