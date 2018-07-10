export const props = {
  userState: {
    user: {
      isAdmin: true
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

export const center = {
  status: 201,
  message: ''
};

export const bookedEvent = [
  { id: 1, eventTitle: 'Pizza Party', bookedDate: [], isApproved: true },
  { id: 2, eventTitle: 'Wedding Ceremony', bookedDate: [], isApproved: true  },
  { id: 3, eventTitle: 'Seminar', bookedDate: [], isApproved: false  }
];

export const logout = jest.fn();
export const onChange = jest.fn();
