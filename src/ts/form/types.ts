import { OTPFieldConfig } from '@satyam-seth/otp-field';

export default interface ConfigFormConfig {
  namespace: string;

  // eslint-disable-next-line no-unused-vars
  onSubmit: (config: OTPFieldConfig) => void;

  onReset: () => void;
}
