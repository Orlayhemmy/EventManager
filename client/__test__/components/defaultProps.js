export const props = {
  userState: {
    user: {
      isAdmin: true,
      id: 1
    },
    isAuth: true
  },
  location: {
    pathname: '/'
  },
  center: {
    status: '',
    message: ''
  }
};
export const navbarProps = {
  path: '/',
  logout: jest.fn()
};
export const bookedEvent = [
  {
    id: 1,
    isApproved: false,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Pizza Party',
    Center: { imageUrl: 'www.image.com' }
  },
  {
    id: 2,
    isApproved: true,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Seminar',
    Center: { imageUrl: 'www.web.com' }
  },
  {
    id: 3,
    isApproved: false,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Pizza Party',
    Center: { imageUrl: 'www.image.com' }
  },
  {
    id: 4,
    isApproved: true,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Seminar',
    Center: { imageUrl: 'www.web.com' }
  },
  {
    id: 5,
    isApproved: false,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Pizza Party',
    Center: { imageUrl: 'www.image.com' }
  },
  {
    id: 6,
    isApproved: true,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Seminar',
    Center: { imageUrl: 'www.web.com' }
  },
  {
    id: 7,
    isApproved: false,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Pizza Party',
    Center: { imageUrl: 'www.image.com' }
  },
  {
    id: 8,
    isApproved: true,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Seminar',
    Center: { imageUrl: 'www.web.com' }
  },
  {
    id: 9,
    isApproved: false,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Pizza Party',
    Center: { imageUrl: 'www.image.com' }
  },
  {
    id: 10,
    isApproved: true,
    bookedDate: ['22/08/2018'],
    eventTitle: 'Seminar',
    Center: { imageUrl: 'www.web.com' }
  }
];
export const center = {
  status: 201,
  message: ''
};

export const activity = {
  activities: [
    { description: 'come and eat pizza', createdAt: '2018-07-07 17:03:36.922+01', eventId: 1 }
  ]
};
export const centerState = {
  centerName: '',
  location: '',
  description: '',
  facilities: '',
  capacity: '',
  errors: {},
  image: '',
  cost: ''
};
export const logout = jest.fn();
export const onChange = jest.fn();
export const onClick = jest.fn();
