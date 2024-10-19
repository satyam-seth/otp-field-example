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

  setConfigOutputTextAreaValue(value: string) {
    const configOutputTextArea = this.element.querySelector(
      `#config-output-textarea`
    ) as HTMLTextAreaElement;
    configOutputTextArea.value = value;
  }

  setButtonDisableState(selector: string, disabled: boolean) {
    const copyConfigButton = this.element.querySelector(
      selector
    ) as HTMLButtonElement;
    copyConfigButton.disabled = disabled;
  }

  setCopyConfigButtonDisableState(disabled: boolean) {
    this.setButtonDisableState('#copy-config-btn', disabled);
  }

  setCopyOtpFieldValueButtonDisableState(disabled: boolean) {
    this.setButtonDisableState('#copy-otp-field-value-btn', disabled);
  }

  onConfigFormReset() {
    this.otpFieldConfig = undefined;
    this.setConfigOutputTextAreaValue('');
    this.setCopyConfigButtonDisableState(true);
    this.destroyOtpField();
    this.setCopyOtpFieldValueButtonDisableState(true);
  }

  onConfigFormSubmit(config: OTPFieldConfig) {
    if (this.otpField !== undefined) {
      this.onConfigFormReset();
    }

    this.otpFieldConfig = config;
    this.setConfigOutputTextAreaValue(JSON.stringify(this.otpFieldConfig));
    this.setCopyConfigButtonDisableState(false);
    this.buildOtpField();
    this.setCopyOtpFieldValueButtonDisableState(false);
  }

  skeleton() {
    const container = document.createElement('div');
    container.id = this.id;
    container.className = 'config-form';

    this.configForm?.build(container);
    container.appendChild(this.configOutputContainer);
    container.appendChild(this.otpFieldContainer);

    return container;
  }

  get configOutputContainer() {
    const container = document.createElement('div');
    container.className = 'config-output-container';

    container.appendChild(this.configOutputTextArea);
    container.appendChild(this.copyConfigButton);

    return container;
  }

  // eslint-disable-next-line class-methods-use-this
  get copyConfigButton() {
    const button = document.createElement('button');
    button.id = 'copy-config-btn';
    button.disabled = true;
    button.innerText = 'Copy OTPField Config';

    // add click event listener
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(this.otpFieldConfig));
    });

    return button;
  }

  // eslint-disable-next-line class-methods-use-this
  get configOutputTextArea() {
    const textarea = document.createElement('textarea');
    textarea.id = 'config-output-textarea';
    textarea.readOnly = true;
    return textarea;
  }

  get otpFieldContainer() {
    const otpFieldContainer = document.createElement('div');
    otpFieldContainer.className = 'otp-field-container';

    otpFieldContainer.appendChild(this.otpFieldWrapper);
    otpFieldContainer.appendChild(this.copyOtpFieldValueButton);

    return otpFieldContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  get otpFieldWrapper() {
    const otpFieldWrapper = document.createElement('div');
    otpFieldWrapper.className = 'otp-field-wrapper';
    return otpFieldWrapper;
  }

  get copyOtpFieldValueButton() {
    const button = document.createElement('button');
    button.id = 'copy-otp-field-value-btn';
    button.disabled = true;
    button.innerText = 'Copy OTPField Value';

    // add click event listener
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(this.otpField?.value));
    });

    return button;
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
