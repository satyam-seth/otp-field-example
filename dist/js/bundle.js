!function e(t,n,i){function o(u,a){if(!n[u]){if(!t[u]){var l="function"==typeof require&&require;if(!a&&l)return l(u,!0);if(r)return r(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var d=n[u]={exports:{}};t[u][0].call(d.exports,(function(e){return o(t[u][1][e]||e)}),d,d.exports,e,t,n,i)}return n[u].exports}for(var r="function"==typeof require&&require,u=0;u<i.length;u++)o(i[u]);return o}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.OTPField=void 0;const i=e("../utils/regex"),o=e("../utils/types");n.OTPField=class{constructor(e){if(this.fieldValue="",this.disabled=!1,e.boxCount<=0)throw new Error("Invalid config box count must be grater than zero.");this.config=e}skeleton(){const e=document.createElement("div");e.id=this.id,e.className="otp-field";for(let t=0;t<this.config.boxCount;t++)e.appendChild(this.getBoxElement(t));return e}getBoxElement(e){const t=document.createElement("input");return t.id=this.getBoxId(e),t.className="otp-box",t.type="text",t.maxLength=1,t.autocomplete="off",t.setAttribute("data-index",e.toString()),t.addEventListener("input",this.onBoxInput.bind(this)),t.addEventListener("keydown",this.onBoxKeyDown.bind(this)),t.addEventListener("focus",this.onBoxFocus.bind(this)),t.addEventListener("paste",this.onBoxPaste.bind(this)),t}get value(){return this.fieldValue}get isDisabled(){return this.disabled}get id(){return`otp-field-${this.config.namespace}`}get element(){const e=document.getElementById(this.id);if(null===e)throw new Error(`Element with ID ${this.id} not found in the DOM.`);return e}focus(){let e=this.config.boxCount-1;for(let t=0;t<this.config.boxCount;t++)if(""===this.getBoxValue(t)){e=t;break}this.focusBox(e)}disable(e){for(let t=0;t<this.config.boxCount;t++){this.getBoxAtIndex(t).disabled=e}this.disabled=e}clear(){for(let e=0;e<this.config.boxCount;e++)this.setBoxValue(e,"");this.fieldValue="",this.focusBox(0)}destroy(){this.element.remove()}build(e){e.appendChild(this.skeleton())}getOtpRegex(){var e;return this.config.customRegex?this.config.customRegex:(0,i.getOTPRegexForValueType)(null!==(e=this.config.valueType)&&void 0!==e?e:o.OTPValueType.NUMERIC)}applyRegex(e){return e.replace(this.getOtpRegex(),"")}getBoxId(e){return`${this.config.namespace}-box-${e}`}getBoxAtIndex(e){const t=this.getBoxId(e),n=document.getElementById(t);if(null===n)throw new Error(`Unable to get box at index ${e}`);return n}getBoxIndex(e){const t=e.getAttribute("data-index");if(t)return parseInt(t,10);throw new Error("Unable to get `data-index` attribute for box")}updateValue(){let e="";for(let t=0;t<this.config.boxCount;t++)e+=this.getBoxValue(t);this.fieldValue=e}focusBox(e){this.getBoxAtIndex(e).focus()}focusNextBox(e){const t=this.getBoxIndex(e);t+1<this.config.boxCount&&this.focusBox(t+1)}focusPrevBox(e){const t=this.getBoxIndex(e);t-1>=0&&this.focusBox(t-1)}setBoxValue(e,t){this.getBoxAtIndex(e).value=t}getBoxValue(e){return this.getBoxAtIndex(e).value}onBoxPaste(e){e.preventDefault();const t=e.clipboardData.getData("text"),n=this.applyRegex(t),i=this.getBoxIndex(e.target),o=Math.min(this.config.boxCount-i,n.length);for(let e=0;e<o;e++)this.setBoxValue(i+e,n[e]);!0===this.config.onPasteBlur||void 0===this.config.onPasteBlur?e.target.blur():this.focusBox(i+o-1),this.updateValue()}onBoxFocus(e){1===e.target.value.length&&(e.target.selectionStart=0,e.target.selectionEnd=1)}onBoxKeyDown(e){"ArrowLeft"!==e.key&&"ArrowUp"!==e.key||(e.preventDefault(),this.focusPrevBox(e.target)),"ArrowRight"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),this.focusNextBox(e.target)),"Backspace"!==e.key||""!==e.target.value&&0!==e.target.selectionEnd||this.focusPrevBox(e.target),"Delete"===e.key&&(""===e.target.value||0!==e.target.selectionStart&&1===e.target.selectionEnd)&&this.focusNextBox(e.target),"KeyZ"!==e.code&&"KeyY"!==e.code||e.preventDefault()}onBoxInput(e){const t=this.applyRegex(e.target.value);e.target.value=t,""!==e.target.value&&this.focusNextBox(e.target),this.updateValue()}}},{"../utils/regex":4,"../utils/types":5}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0})},{}],3:[function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||i(t,e,n)};Object.defineProperty(n,"__esModule",{value:!0}),o(e("./components/field"),n),o(e("./components/types"),n),o(e("./utils/regex"),n),o(e("./utils/types"),n)},{"./components/field":1,"./components/types":2,"./utils/regex":4,"./utils/types":5}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getOTPRegexForValueType=function(e){switch(e){case i.OTPValueType.NUMERIC:return/[^0-9]/g;case i.OTPValueType.ALPHABETIC:return/[^A-Za-z]/g;case i.OTPValueType.ALPHABETIC_LOWER:return/[^a-z]/g;case i.OTPValueType.ALPHABETIC_UPPER:return/[^A-Z]/g;case i.OTPValueType.ALPHANUMERIC:return/[^A-Za-z0-9]/g;case i.OTPValueType.ALPHANUMERIC_LOWER:return/[^a-z0-9]/g;case i.OTPValueType.ALPHANUMERIC_UPPER:return/[^A-Za-z0-9]/g;default:throw new Error("Invalid OTP field value type")}};const i=e("./types")},{"./types":5}],5:[function(e,t,n){"use strict";var i;Object.defineProperty(n,"__esModule",{value:!0}),n.OTPValueType=void 0,function(e){e[e.NUMERIC=0]="NUMERIC",e[e.ALPHABETIC=1]="ALPHABETIC",e[e.ALPHABETIC_LOWER=2]="ALPHABETIC_LOWER",e[e.ALPHABETIC_UPPER=3]="ALPHABETIC_UPPER",e[e.ALPHANUMERIC=4]="ALPHANUMERIC",e[e.ALPHANUMERIC_LOWER=5]="ALPHANUMERIC_LOWER",e[e.ALPHANUMERIC_UPPER=6]="ALPHANUMERIC_UPPER"}(i||(n.OTPValueType=i={}))},{}],6:[function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();var o=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var r=e("@satyam-seth/otp-field"),u=o(e("./form/config")),a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.namespace=t,this.initializeConfigForm()}return i(e,[{key:"getButton",value:function(e){var t=document.createElement("button");return t.id=e.namespace+"-btn",t.disabled=e.disabled,t.innerText=e.innerText,t.addEventListener("click",e.onClick.bind(this)),t}},{key:"initializeConfigForm",value:function(){this.configForm=new u.default({namespace:this.namespace,onSubmit:this.onConfigFormSubmit.bind(this),onReset:this.onConfigFormReset.bind(this)})}},{key:"buildOtpField",value:function(){if(void 0===this.otpFieldConfig)throw Error("Invalid OTPField config");this.otpField=new r.OTPField(this.otpFieldConfig);var e=this.element.querySelector(".otp-field-wrapper");this.otpField.build(e)}},{key:"destroyOtpField",value:function(){var e;null===(e=this.otpField)||void 0===e||e.destroy()}},{key:"focusOTPField",value:function(){var e;null===(e=this.otpField)||void 0===e||e.focus()}},{key:"setConfigOutputTextAreaValue",value:function(e){this.element.querySelector("#config-output-textarea").value=e}},{key:"setConfigOutputTextAreaDisableState",value:function(e){this.element.querySelector("#config-output-textarea").disabled=e}},{key:"setButtonsDisableState",value:function(e){this.element.querySelectorAll(".config-output-container button, .buttons-wrapper button").forEach((function(t){t.disabled=e}))}},{key:"onConfigFormReset",value:function(){this.setConfigOutputTextAreaValue(""),this.setButtonsDisableState(!0),this.setConfigOutputTextAreaDisableState(!0),this.destroyOtpField(),this.otpField=void 0,this.otpFieldConfig=void 0}},{key:"onConfigFormSubmit",value:function(e){void 0!==this.otpField&&this.onConfigFormReset(),this.otpFieldConfig=e,this.setConfigOutputTextAreaValue(JSON.stringify(this.otpFieldConfig)),this.setButtonsDisableState(!1),this.setConfigOutputTextAreaDisableState(!1),this.buildOtpField()}},{key:"copyOtpFieldIdToClipboard",value:function(){var e;navigator.clipboard.writeText(JSON.stringify(null===(e=this.otpField)||void 0===e?void 0:e.id))}},{key:"copyOtpFieldConfigToClipboard",value:function(){navigator.clipboard.writeText(JSON.stringify(this.otpFieldConfig))}},{key:"copyOtpFieldValueToClipboard",value:function(){var e;navigator.clipboard.writeText(JSON.stringify(null===(e=this.otpField)||void 0===e?void 0:e.value))}},{key:"clearOtpFieldValue",value:function(){var e;null===(e=this.otpField)||void 0===e||e.clear()}},{key:"toggleDisableOtpFieldClickHandler",value:function(e){var t,n,i=null===(t=this.otpField)||void 0===t?void 0:t.isDisabled,o=i?"Disable":"Enable";null===(n=this.otpField)||void 0===n||n.disable(!i),e.target.innerText=o+" OTP Field"}},{key:"skeleton",value:function(){var e,t=document.createElement("div");return t.id=this.id,t.className="driver",null===(e=this.configForm)||void 0===e||e.build(t),t.appendChild(this.configOutputContainer),t.appendChild(this.otpFieldContainer),t}},{key:"build",value:function(e){e.appendChild(this.skeleton())}},{key:"configOutputContainer",get:function(){var e=document.createElement("div");return e.className="config-output-container",e.appendChild(this.configOutputLabel),e.appendChild(this.configOutputTextArea),e.appendChild(this.copyOtpFieldConfigButton),e}},{key:"copyOtpFieldConfigButton",get:function(){return this.getButton({namespace:"copy-otp-field-config",innerText:"Copy OTP Field Config",disabled:!0,onClick:this.copyOtpFieldConfigToClipboard})}},{key:"configOutputLabel",get:function(){var e=document.createElement("label");return e.innerText="OTP Field Config: ",e.setAttribute("for","config-output-textarea"),e}},{key:"configOutputTextArea",get:function(){var e=document.createElement("textarea");return e.id="config-output-textarea",e.rows=2,e.readOnly=!0,e.disabled=!0,e}},{key:"otpFieldContainer",get:function(){var e=document.createElement("div");return e.className="otp-field-container",e.appendChild(this.otpFieldWrapper),e.appendChild(this.buttonsWrapper),e}},{key:"otpFieldWrapper",get:function(){var e=document.createElement("div");return e.className="otp-field-wrapper",e}},{key:"buttonsWrapper",get:function(){var e=document.createElement("div");return e.className="buttons-wrapper",e.appendChild(this.copyOtpFieldIdButton),e.appendChild(this.copyOtpFieldValueButton),e.appendChild(this.clearOtpFieldValueButton),e.appendChild(this.focusOtpFieldButton),e.appendChild(this.toggleDisableOtpFieldButton),e}},{key:"copyOtpFieldIdButton",get:function(){return this.getButton({namespace:"copy-otp-field-id",innerText:"Copy OTP Field ID",disabled:!0,onClick:this.copyOtpFieldIdToClipboard})}},{key:"copyOtpFieldValueButton",get:function(){return this.getButton({namespace:"copy-otp-field-value",innerText:"Copy OTP Field Value",disabled:!0,onClick:this.copyOtpFieldValueToClipboard})}},{key:"clearOtpFieldValueButton",get:function(){return this.getButton({namespace:"clear-otp-field-value",innerText:"Clear OTP Field Value",disabled:!0,onClick:this.clearOtpFieldValue})}},{key:"focusOtpFieldButton",get:function(){return this.getButton({namespace:"focus-otp-field",innerText:"Focus OTP Field",disabled:!0,onClick:this.focusOTPField})}},{key:"toggleDisableOtpFieldButton",get:function(){return this.getButton({namespace:"toggle-disable-otp-field",innerText:"Disable OTP Field",disabled:!0,onClick:this.toggleDisableOtpFieldClickHandler})}},{key:"id",get:function(){return this.namespace+"-driver"}},{key:"element",get:function(){var e=document.getElementById(this.id);if(null===e)throw new Error("Element with ID "+this.id+" not found in the DOM.");return e}}]),e}();n.default=a},{"./form/config":7,"@satyam-seth/otp-field":3}],7:[function(e,t,n){"use strict";var i=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var u,a=e[Symbol.iterator]();!(i=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{!i&&a.return&&a.return()}finally{if(o)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(n,"__esModule",{value:!0});var u=e("@satyam-seth/otp-field"),a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=t}return o(e,[{key:"getLabelElement",value:function(e){var t=document.createElement("label");return t.innerText=e.text+": ",t.setAttribute("for",e.for),t}},{key:"getInputElement",value:function(e){var t,n,o=document.createElement("input");return o.id=e.id,o.name=e.name,o.type=e.inputType,o.required=null===(t=e.required)||void 0===t||t,o.disabled=null!==(n=e.disabled)&&void 0!==n&&n,void 0!==e.placeholder&&(o.placeholder=e.placeholder),void 0!==e.value&&(o.value=e.value),void 0!==e.extraAttributes&&Object.entries(e.extraAttributes).forEach((function(e){var t=i(e,2),n=t[0],r=t[1];n&&r&&o.setAttribute(n,r)})),o}},{key:"getOptionElement",value:function(e){var t=document.createElement("option");return t.innerText=e.text,t.value=e.value,t}},{key:"getFormGroup",value:function(e){var t=document.createElement("div");return t.className="form-group",!0===e.inline&&t.classList.add("inline"),t.appendChild(e.labelElement),t.appendChild(e.inputElement),t}},{key:"getButtonElement",value:function(e){var t=document.createElement("button");return t.id=e.id,t.type=e.buttonType,t.innerText=e.text,t}},{key:"toggleFieldDisableState",value:function(e){this.element.querySelector("#"+e.id).disabled=!e.disabled}},{key:"onPassCustomRegexChange",value:function(e){this.toggleFieldDisableState({id:"custom-regex",disabled:e.target.checked}),this.toggleFieldDisableState({id:"value-type",disabled:!e.target.checked})}},{key:"onSubmit",value:function(e){e.preventDefault();var t=new FormData(e.target),n=Number(t.get("box-count")),i=Boolean(t.get("on-paste-blur")),o=Boolean(t.get("pass-custom-regex")),r=Number(t.get("value-type")),u=String(t.get("custom-regex")),a=void 0;try{var l=u.replace(/^\/|\/g$/g,"");a=new RegExp(l)}catch(e){return void alert("Please enter a valid regex pattern.")}var s={namespace:this.config.namespace,boxCount:n,onPasteBlur:i,valueType:!1===o?r:void 0,customRegex:!0===o?a:void 0};this.config.onSubmit(s)}},{key:"skeleton",value:function(){var e=document.createElement("form");return e.id=this.id,e.className="config-form",e.appendChild(this.boxCountFormGroup),e.appendChild(this.onPasteBlurFormGroup),e.appendChild(this.passCustomRegexFormGroup),e.appendChild(this.customRegexFormGroup),e.appendChild(this.valueTypeFormGroup),e.appendChild(this.formButtonGroup),e.addEventListener("submit",this.onSubmit.bind(this)),e.addEventListener("reset",this.config.onReset),e}},{key:"build",value:function(e){e.appendChild(this.skeleton())}},{key:"boxCountLabel",get:function(){return this.getLabelElement({text:"Box Count",for:"box-count"})}},{key:"boxCountInput",get:function(){return this.getInputElement({id:"box-count",name:"box-count",inputType:"number",placeholder:"enter box count",extraAttributes:{min:"1",max:"1000"}})}},{key:"onPasteBlurLabel",get:function(){return this.getLabelElement({text:"On Paste Blur Field",for:"on-paste-blur"})}},{key:"onPasteBlurInput",get:function(){return this.getInputElement({id:"on-paste-blur",name:"on-paste-blur",inputType:"checkbox",required:!1})}},{key:"passCustomRegexLabel",get:function(){return this.getLabelElement({text:"Pass Custom Regex",for:"pass-custom-regex"})}},{key:"passCustomRegexInput",get:function(){var e=this.getInputElement({id:"pass-custom-regex",name:"pass-custom-regex",inputType:"checkbox",required:!1});return e.addEventListener("change",this.onPassCustomRegexChange.bind(this)),e}},{key:"customRegexLabel",get:function(){return this.getLabelElement({text:"Custom Regex",for:"custom-regex"})}},{key:"customRegexInput",get:function(){return this.getInputElement({id:"custom-regex",name:"custom-regex",inputType:"text",placeholder:"enter custom regex",disabled:!0})}},{key:"valueTypeLabel",get:function(){return this.getLabelElement({text:"Value Type",for:"value-type"})}},{key:"valueTypeOptions",get:function(){var e;return r(e={},"Numeric ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.NUMERIC)+")",u.OTPValueType.NUMERIC.toString()),r(e,"Alphabetic ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHABETIC)+")",u.OTPValueType.ALPHABETIC.toString()),r(e,"Alphabetic Lower Case ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHABETIC_LOWER)+")",u.OTPValueType.ALPHABETIC_LOWER.toString()),r(e,"Alphabetic Upper Case ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHABETIC_UPPER)+")",u.OTPValueType.ALPHABETIC_UPPER.toString()),r(e,"Alphanumeric ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHANUMERIC),u.OTPValueType.ALPHANUMERIC.toString()),r(e,"Alphanumeric Lower Case ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHANUMERIC_LOWER)+")",u.OTPValueType.ALPHANUMERIC_LOWER.toString()),r(e,"Alphanumeric Upper Case ("+(0,u.getOTPRegexForValueType)(u.OTPValueType.ALPHANUMERIC_UPPER)+")",u.OTPValueType.ALPHANUMERIC_UPPER.toString()),e}},{key:"valueTypeSelect",get:function(){var e=this,t=document.createElement("select");return t.id="value-type",t.name="value-type",Object.entries(this.valueTypeOptions).forEach((function(n){var o=i(n,2),r=o[0],u=o[1];r&&u&&t.appendChild(e.getOptionElement({text:r,value:u}))})),t}},{key:"boxCountFormGroup",get:function(){return this.getFormGroup({labelElement:this.boxCountLabel,inputElement:this.boxCountInput})}},{key:"onPasteBlurFormGroup",get:function(){return this.getFormGroup({labelElement:this.onPasteBlurLabel,inputElement:this.onPasteBlurInput,inline:!0})}},{key:"passCustomRegexFormGroup",get:function(){return this.getFormGroup({labelElement:this.passCustomRegexLabel,inputElement:this.passCustomRegexInput,inline:!0})}},{key:"customRegexFormGroup",get:function(){return this.getFormGroup({labelElement:this.customRegexLabel,inputElement:this.customRegexInput})}},{key:"valueTypeFormGroup",get:function(){return this.getFormGroup({labelElement:this.valueTypeLabel,inputElement:this.valueTypeSelect})}},{key:"resetButton",get:function(){return this.getButtonElement({id:"reset-btn",text:"Reset",buttonType:"reset"})}},{key:"submitButton",get:function(){return this.getButtonElement({id:"submit-btn",text:"Submit",buttonType:"submit"})}},{key:"formButtonGroup",get:function(){var e=document.createElement("div");return e.className="form-button-group",e.appendChild(this.resetButton),e.appendChild(this.submitButton),e}},{key:"id",get:function(){return this.config.namespace+"-config-form"}},{key:"element",get:function(){var e=document.getElementById(this.id);if(null===e)throw new Error("Element with ID "+this.id+" not found in the DOM.");return e}}]),e}();n.default=a},{"@satyam-seth/otp-field":3}],8:[function(e,t,n){"use strict";var i=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./driver"));window.onload=function(){var e=document.querySelector("section.example");new o.default("example").build(e)}},{"./driver":6}]},{},[8]);
//# sourceMappingURL=maps/bundle.js.map
