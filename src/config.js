export const GRID_VIEW = {
  vertical_cell: 10
}

export const IS_MOBILE = 'isPhone';
export const IS_TABLET = 'isTablet';
export const IS_PC = 'isPC';
export const IS_SCREEN_LOADING = 'isLoading';

export const SELLER_REJECTED = 'seller_rejected';
export const SELLER_REPLIED = 'seller_replied';
export const SELLER_ACCEPTED = 'seller_accepted';
export const SELLER_REMOVED = 'seller_removed';

export const BUYER_CREATED = 'buyer_created';
export const BUYER_REPLIED = 'buyer_replied';
export const BUYER_ACCEPTED = 'buyer_accepted';
export const BUYER_REMOVED = 'buyer_removed';

export const DISPLAY_PROPOSAL = {
  [BUYER_CREATED]: 'Buyer Created',
  [BUYER_REPLIED]: 'Buyer Replied',
  [BUYER_ACCEPTED]: 'Buyer Accepted',
  [BUYER_REMOVED]: 'Buyer Removed',
  [SELLER_REPLIED]: 'Seller Replied',
  [SELLER_ACCEPTED]: 'Seller Accepted',
  [SELLER_REJECTED]: 'Seller Rejected',
  [SELLER_REMOVED]: 'Seller Removed'
};

export const DOMAIN_SERVER = process.env.PROTOCOL + process.env.DOMAIN + ':' + process.env.GATEWAY_PORT + '/';
export const SERVER_VERSION = process.env.SERVER_VERSION;
export const CLIENT_ID = process.env.CLIENT_ID;

export const SERVER_TIMEOUT = process.env.SERVER_TIMEOUT;
export const NODE_ENV = process.env.NODE_ENV;

export const CLIENT_ROUTES = [
  '/signInAndSignUp',
  '/signUp'
];

export const SORT_BY = {
  'bestMatch': 'Best Match',
  'asc': 'A To Z',
  'desc': 'Z To A'
}

export const PAGER_LIMIT = 10;

export const APPLE_ID = 'b82e4aa0-0691-11ea-8d71-362b9e155667';
export const SAMSUNG_ID = 'b82e4d34-0691-11ea-8d71-362b9e155667';

export const SMARTPHONE_ID = 'e75c590c-0691-11ea-8d71-362b9e155667';
export const TABLET_ID = 'e75c5c22-0691-11ea-8d71-362b9e155667';
export const SMARTWATCH_ID = 'ccf0d8b0-1571-11ea-8d71-362b9e155667';

export const COLOR_LIST = [
  { id: 'b717c9f8-14cd-11ea-8d71-362b9e155667', name: 'black' },
  { id: '13784390-15a4-11ea-a6eb-615ea450ded5', name: 'white' },
  { id: '01406900-164e-11ea-b76a-674fb9da1aa0', name: 'silver' },
  { id: '301564b0-164e-11ea-b76a-674fb9da1aa0', name: 'purple' },
  { id: '6d121330-164f-11ea-b76a-674fb9da1aa0', name: 'gold' },
  { id: '44e34040-1650-11ea-b76a-674fb9da1aa0', name: 'grey' },
  { id: '4e525340-1cc3-11ea-9a85-e9e165cb5e9b', name: 'green' },
  { id: '57a5cd40-1cba-11ea-9a85-e9e165cb5e9b', name: 'blue' }
];

export const COUNTRY_LIST = [
  { id: 1, name: 'Canada' },
  { id: 2, name: 'USA' }
];

export const PRE_PHONE = {
  USA: '+1 (###) ###-####',
  CAN: '+1 (###) ###-####'
}

export const LANG = [
  { value: 'en', label: 'English', image: 'icons/united-kingdom-flag-icon-128.png' },
  { value: 'fr', label: 'French', image: 'icons/france-flag-icon-128.png' }
];

export const TRANSACTION_STATUS = {
  created: 'Created'
}

export const ORDER_STATUS = {
  paid: 'Order Paid'
}

export const DEVICE_GRADE_TITLE = {
  A: 'lbl_grade_A',
  B: 'lbl_grade_B',
  C: 'lbl_grade_C',
  D: 'lbl_grade_D'
}

export const DEVICE_GRADE = {
  A: [
    'lbl_a_1',
    'lbl_a_2',
    'lbl_a_3',
    'lbl_a_4',
    'lbl_a_5'
  ],
  B: [
    'lbl_b_1',
    'lbl_a_2',
    'lbl_b_2',
    'lbl_b_3',
    'lbl_a_3',
    'lbl_a_5'
  ],
  C: [
    'lbl_c_1',
    'lbl_c_2',
    'lbl_c_3',
    'lbl_a_3'
  ],
  D: [
    'lbl_d_1',
    'lbl_d_2',
    'lbl_d_3',
    'lbl_d_4',
  ]
}

export const LIMIT_FEATURED_DEVICES = 30;

export const FIXED_MONEY = 2;
