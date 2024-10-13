import { OTPField } from '@satyam-seth/otp-field';

window.onload = () => {
  // create otp field instance
  const otpField = new OTPField({
    namespace: 'example',
    boxCount: 6,
  });

  // get parent element
  const exampleSection = document.querySelector(
    'section.example'
  ) as HTMLElement;

  // build otp field
  otpField.build(exampleSection);
};
