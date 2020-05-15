export interface ACheckbox {
  /**
   * get focus when component mounted
   * @default false
   * @type boolean
   */
  autoFocus: boolean;

  /**
   * Specifies whether the checkbox is selected.
   * @default false
   * @type boolean
   */
  checked: boolean;

  /**
   * Specifies the initial state: whether or not the checkbox is selected.
   * @default false
   * @type boolean
   */
  defaultChecked: boolean;

  /**
   * Disable checkbox
   * @default false
   * @type boolean
   */
  disabled: boolean;

  /**
   * indeterminate checked state of checkbox
   * @default false
   * @type boolean
   */
  indeterminate: boolean;

  /**
   * remove focus
   */
  blur(): void;

  /**
   * get focus
   */
  focus(): void;
}
