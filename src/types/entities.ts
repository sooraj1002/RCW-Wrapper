export type User = {
  name: string;
  email: string;
  password: string;
  did: string;
};

export type CredentialSchema = {
  [k: string]: {
    type: string;
    description?: string;
    format?: string;
  };
};
