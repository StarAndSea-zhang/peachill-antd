/**
 * List of TabPane's head, Custom tabs can be created with the scopedSlots property
 * @type Array<{key: string, tab: any, scopedSlots: {tab: string}}>
 */
export type TabList = Array<{
  key: string;
  tab: any;
  scopedSlots?: { tab: string };
}>;

/**
 * Size of card
 * @type string
 */
export type Size = 'default' | 'small';
