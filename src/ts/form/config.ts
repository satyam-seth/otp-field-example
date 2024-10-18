import { getOTPRegexForValueType, OTPValueType } from '@satyam-seth/otp-field';

// eslint-disable-next-line import/prefer-default-export
export class ConfigForm {
  // eslint-disable-next-line class-methods-use-this
  getLabelElement(config: { text: string; for: string }) {
    const label = document.createElement('label');

    label.innerText = `${config.text}: `;
    label.setAttribute('for', config.for);

    return label;
  }

  // eslint-disable-next-line class-methods-use-this
  getInputElement(config: {
    id: string;
    name: string;
    inputType: 'text' | 'number' | 'checkbox';
    placeholder?: string;
    value?: string;
    extraAttributes?: { [key: string]: string };
    required?: boolean;
    disabled?: boolean;
  }) {
    const input = document.createElement('input');
    input.id = config.id;
    input.name = config.name;
    input.type = config.inputType;
    input.required = config.required ?? true;
    input.disabled = config.disabled ?? false;

    if (config.placeholder !== undefined) {
      input.placeholder = config.placeholder;
    }

    if (config.value !== undefined) {
      input.value = config.value;
    }

    if (config.extraAttributes !== undefined) {
      Object.entries(config.extraAttributes).forEach(([k, v]) => {
        if (k && v) {
          input.setAttribute(k, v);
        }
      });
    }

    return input;
  }

  // eslint-disable-next-line class-methods-use-this
  getOptionElement(config: { text: string; value: string }) {
    const option = document.createElement('option');

    option.innerText = config.text;
    option.value = config.value;

    return option;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormGroup(config: {
    labelElement: HTMLLabelElement;
    inputElement: HTMLInputElement | HTMLSelectElement;
  }) {
    const groupElement = document.createElement('div');
    groupElement.className = 'form-group';

    groupElement.appendChild(config.labelElement);
    groupElement.appendChild(config.inputElement);

    return groupElement;
  }

  // eslint-disable-next-line class-methods-use-this
  getButtonElement(config: {
    id: string;
    text: string;
    buttonType: 'submit' | 'reset';
  }) {
    const button = document.createElement('button');

    button.id = config.id;
    button.type = config.buttonType;
    button.innerText = config.text;

    return button;
  }

  toggleFieldDisableState(config: { id: string; disabled: boolean }) {
    const field = this.element.querySelector(`#${config.id}`)! as
      | HTMLInputElement
      | HTMLSelectElement;
    field.disabled = !config.disabled;
  }

  onPassCustomRegexChange(e: any) {
    this.toggleFieldDisableState({
      id: 'custom-regex',
      disabled: e.target.checked,
    });
    this.toggleFieldDisableState({
      id: 'value-type',
      disabled: !e.target.checked,
    });
  }

  skeleton() {
    const form = document.createElement('form');
    form.id = this.id;
    form.className = 'config-form';

    form.appendChild(this.boxCountFormGroup);
    form.appendChild(this.onPasteBlurFormGroup);
    form.appendChild(this.passCustomRegexFormGroup);
    form.appendChild(this.customRegexFormGroup);
    form.appendChild(this.valueTypeFormGroup);
    form.appendChild(this.formButtonGroup);

    return form;
  }

  get boxCountLabel() {
    return this.getLabelElement({ text: 'Box Count', for: 'box-count' });
  }

  get boxCountInput() {
    return this.getInputElement({
      id: 'box-count',
      name: 'box-count',
      inputType: 'number',
      placeholder: 'enter box count',
    });
  }

  get onPasteBlurLabel() {
    return this.getLabelElement({
      text: 'On Paste Blur Field',
      for: 'on-paste-blur',
    });
  }

  get onPasteBlurInput() {
    return this.getInputElement({
      id: 'on-paste-blur',
      name: 'on-paste-blur',
      inputType: 'checkbox',
    });
  }

  get passCustomRegexLabel() {
    return this.getLabelElement({
      text: 'Pass Custom Regex',
      for: 'pass-custom-regex',
    });
  }

  get passCustomRegexInput() {
    const input = this.getInputElement({
      id: 'pass-custom-regex',
      name: 'pass-custom-regex',
      inputType: 'checkbox',
    });

    // add change event listener
    input.addEventListener('change', this.onPassCustomRegexChange.bind(this));

    return input;
  }

  get customRegexLabel() {
    return this.getLabelElement({
      text: 'Custom Regex',
      for: 'custom-regex',
    });
  }

  get customRegexInput() {
    return this.getInputElement({
      id: 'custom-regex',
      name: 'custom-regex',
      inputType: 'text',
      placeholder: 'enter custom regex',
      disabled: true,
    });
  }

  get valueTypeLabel() {
    return this.getLabelElement({
      text: 'Value Type',
      for: 'value-type',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get valueTypeOptions(): { [key: string]: string } {
    return {
      [`Numeric (${getOTPRegexForValueType(OTPValueType.NUMERIC)})`]:
        OTPValueType.NUMERIC.toString(),
      [`Alphabetic (${getOTPRegexForValueType(OTPValueType.ALPHABETIC)})`]:
        OTPValueType.ALPHABETIC.toString(),
      [`Alphabetic Lower Case (${getOTPRegexForValueType(OTPValueType.ALPHABETIC_LOWER)})`]:
        OTPValueType.ALPHABETIC_LOWER.toString(),
      [`Alphabetic Upper Case (${getOTPRegexForValueType(OTPValueType.ALPHABETIC_UPPER)})`]:
        OTPValueType.ALPHABETIC_UPPER.toString(),
      [`Alphanumeric (${getOTPRegexForValueType(OTPValueType.ALPHANUMERIC)}`]:
        OTPValueType.ALPHANUMERIC.toString(),
      [`Alphanumeric Lower Case (${getOTPRegexForValueType(OTPValueType.ALPHANUMERIC_LOWER)})`]:
        OTPValueType.ALPHANUMERIC_LOWER.toString(),
      [`Alphanumeric Upper Case (${getOTPRegexForValueType(OTPValueType.ALPHANUMERIC_UPPER)})`]:
        OTPValueType.ALPHANUMERIC_UPPER.toString(),
    };
  }

  get valueTypeSelect() {
    const select = document.createElement('select');
    select.id = 'value-type';

    Object.entries(this.valueTypeOptions).forEach(([k, v]) => {
      if (k && v) {
        select.appendChild(this.getOptionElement({ text: k, value: v }));
      }
    });

    return select;
  }

  get boxCountFormGroup() {
    return this.getFormGroup({
      labelElement: this.boxCountLabel,
      inputElement: this.boxCountInput,
    });
  }

  get onPasteBlurFormGroup() {
    return this.getFormGroup({
      labelElement: this.onPasteBlurLabel,
      inputElement: this.onPasteBlurInput,
    });
  }

  get passCustomRegexFormGroup() {
    return this.getFormGroup({
      labelElement: this.passCustomRegexLabel,
      inputElement: this.passCustomRegexInput,
    });
  }

  get customRegexFormGroup() {
    return this.getFormGroup({
      labelElement: this.customRegexLabel,
      inputElement: this.customRegexInput,
    });
  }

  get valueTypeFormGroup() {
    return this.getFormGroup({
      labelElement: this.valueTypeLabel,
      inputElement: this.valueTypeSelect,
    });
  }

  get resetButton() {
    return this.getButtonElement({
      id: 'reset-btn',
      text: 'Reset',
      buttonType: 'reset',
    });
  }

  get submitButton() {
    return this.getButtonElement({
      id: 'submit-btn',
      text: 'Submit',
      buttonType: 'submit',
    });
  }

  get formButtonGroup() {
    const groupElement = document.createElement('div');
    groupElement.className = 'form-button-group';

    groupElement.appendChild(this.resetButton);
    groupElement.appendChild(this.submitButton);

    return groupElement;
  }

  build(parentElement: HTMLElement): void {
    parentElement.appendChild(this.skeleton());
  }

  // eslint-disable-next-line class-methods-use-this
  get id() {
    return 'config-form';
  }

  get element() {
    const elem = document.getElementById(this.id);

    if (elem === null) {
      throw new Error(`Element with ID ${this.id} not found in the DOM.`);
    }

    return elem;
  }
}
