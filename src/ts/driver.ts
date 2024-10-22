import { OTPField, OTPFieldConfig } from '@satyam-seth/otp-field';
import ConfigForm from './form/config';

export default class Driver {
  namespace: string;

  otpField?: OTPField;

  configForm?: ConfigForm;

  otpFieldConfig?: OTPFieldConfig;

  constructor(namespace: string) {
    this.namespace = namespace;
    this.initializeConfigForm();
  }

  getButton(config: {
    namespace: string;
    innerText: string;
    disabled: boolean;
    // eslint-disable-next-line no-unused-vars
    onClick: (e: any) => void;
  }) {
    const button = document.createElement('button');
    button.id = `${config.namespace}-btn`;
    button.disabled = config.disabled;
    button.innerText = config.innerText;

    // add click event listener
    button.addEventListener('click', config.onClick.bind(this));

    return button;
  }

  initializeConfigForm() {
    this.configForm = new ConfigForm({
      namespace: this.namespace,
      onSubmit: this.onConfigFormSubmit.bind(this),
      onReset: this.onConfigFormReset.bind(this),
    });
  }

  buildOtpField() {
    if (this.otpFieldConfig === undefined) {
      throw Error('Invalid OTPField config');
    }
    this.otpField = new OTPField(this.otpFieldConfig);
    const otpFieldWrapper = this.element.querySelector(
      '.otp-field-wrapper'
    ) as HTMLDivElement;
    this.otpField.build(otpFieldWrapper);
  }

  destroyOtpField() {
    this.otpField?.destroy();
  }

  focusOTPField() {
    this.otpField?.focus();
  }

  setConfigOutputTextAreaValue(value: string) {
    const configOutputTextArea = this.element.querySelector(
      `#config-output-textarea`
    ) as HTMLTextAreaElement;
    configOutputTextArea.value = value;
  }

  setButtonsDisableState(disabled: boolean) {
    const buttons = this.element.querySelectorAll<HTMLButtonElement>(
      '.config-output-container button, .buttons-wrapper button'
    );

    buttons.forEach((btn) => {
      // eslint-disable-next-line no-param-reassign
      btn.disabled = disabled;
    });
  }

  onConfigFormReset() {
    this.setConfigOutputTextAreaValue('');
    this.setButtonsDisableState(true);
    this.destroyOtpField();
    this.otpField = undefined;
    this.otpFieldConfig = undefined;
  }

  onConfigFormSubmit(config: OTPFieldConfig) {
    if (this.otpField !== undefined) {
      this.onConfigFormReset();
    }

    this.otpFieldConfig = config;
    this.setConfigOutputTextAreaValue(JSON.stringify(this.otpFieldConfig));
    this.setButtonsDisableState(false);
    this.buildOtpField();
  }

  copyOtpFieldIdToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.otpField?.id));
  }

  copyOtpFieldConfigToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.otpFieldConfig));
  }

  copyOtpFieldValueToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.otpField?.value));
  }

  clearOtpFieldValue() {
    this.otpField?.clear();
  }

  toggleDisableOtpFieldClickHandler(e: any) {
    const status = this.otpField?.isDisabled;
    const btnStatusText = status ? 'Disable' : 'Enable';
    this.otpField?.disable(!status);
    e.target.innerText = `${btnStatusText} OTP Field`;
  }

  skeleton() {
    const container = document.createElement('div');
    container.id = this.id;
    container.className = 'driver';

    this.configForm?.build(container);
    container.appendChild(this.configOutputContainer);
    container.appendChild(this.otpFieldContainer);

    return container;
  }

  get configOutputContainer() {
    const container = document.createElement('div');
    container.className = 'config-output-container';

    container.appendChild(this.configOutputTextArea);
    container.appendChild(this.copyOtpFieldConfigButton);

    return container;
  }

  get copyOtpFieldConfigButton() {
    return this.getButton({
      namespace: 'copy-otp-field-config',
      innerText: 'Copy OTP Field Config',
      disabled: true,
      onClick: this.copyOtpFieldConfigToClipboard,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get configOutputTextArea() {
    const textarea = document.createElement('textarea');
    textarea.id = 'config-output-textarea';
    textarea.rows = 2;
    textarea.readOnly = true;
    return textarea;
  }

  get otpFieldContainer() {
    const otpFieldContainer = document.createElement('div');
    otpFieldContainer.className = 'otp-field-container';

    otpFieldContainer.appendChild(this.otpFieldWrapper);
    otpFieldContainer.appendChild(this.buttonsWrapper);

    return otpFieldContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  get otpFieldWrapper() {
    const otpFieldWrapper = document.createElement('div');
    otpFieldWrapper.className = 'otp-field-wrapper';
    return otpFieldWrapper;
  }

  get buttonsWrapper() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'buttons-wrapper';

    buttonWrapper.appendChild(this.copyOtpFieldIdButton);
    buttonWrapper.appendChild(this.copyOtpFieldValueButton);
    buttonWrapper.appendChild(this.clearOtpFieldValueButton);
    buttonWrapper.appendChild(this.focusOtpFieldButton);
    buttonWrapper.appendChild(this.toggleDisableOtpFieldButton);

    return buttonWrapper;
  }

  get copyOtpFieldIdButton() {
    return this.getButton({
      namespace: 'copy-otp-field-id',
      innerText: 'Copy OTP Field ID',
      disabled: true,
      onClick: this.copyOtpFieldIdToClipboard,
    });
  }

  get copyOtpFieldValueButton() {
    return this.getButton({
      namespace: 'copy-otp-field-value',
      innerText: 'Copy OTP Field Value',
      disabled: true,
      onClick: this.copyOtpFieldValueToClipboard,
    });
  }

  get clearOtpFieldValueButton() {
    return this.getButton({
      namespace: 'clear-otp-field-value',
      innerText: 'Clear OTP Field Value',
      disabled: true,
      onClick: this.clearOtpFieldValue,
    });
  }

  get focusOtpFieldButton() {
    return this.getButton({
      namespace: 'focus-otp-field',
      innerText: 'Focus OTP Field',
      disabled: true,
      onClick: this.focusOTPField,
    });
  }

  get toggleDisableOtpFieldButton() {
    return this.getButton({
      namespace: 'toggle-disable-otp-field',
      innerText: 'Disable OTP Field',
      disabled: true,
      onClick: this.toggleDisableOtpFieldClickHandler,
    });
  }

  build(parentElement: HTMLElement): void {
    parentElement.appendChild(this.skeleton());
  }

  get id() {
    return `${this.namespace}-driver`;
  }

  get element() {
    const elem = document.getElementById(this.id);

    if (elem === null) {
      throw new Error(`Element with ID ${this.id} not found in the DOM.`);
    }

    return elem;
  }
}
