export interface ActionInput {
  default?: boolean | number | string;
  description?: string;
  required?: boolean;
  type?: 'boolean' | 'number' | 'string';
}
