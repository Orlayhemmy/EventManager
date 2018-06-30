module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Centers', [{
    centerName: 'Balmoral',
    description: `Balmoral Venue Management is a full service management
     company providing comprehensive services to venues and entertainment
      facilities. We are proficient in adaptation and innovation, so we
      bring creative solutions to every venue we manage, no matter the size,
       making every experience perfect. Whether it is a concert, a wedding,
       a consumer show or a conference, we owe each guest our best effort to
       meet their needs, solve their problems, and make them want to return
        again`,
    location: 'ikeja',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166393/reaction-commerce/balmoral_hall_t17wkj.jpg',
    capacity: 1200,
    cost: 950000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Haven',
    description: `The Haven Event Centre in Ikeja, Lagos is more than an event
     centre. It is an entertainment hub. A flexible space that provides event
      organizers with a modern setting and state-of-the-art conveniences to help
       them bring events to life. Once guests come through the lobby, they enter
      into The Haven, a sprawling 20m by 85m marquee that boasts high ceilings,
        generators, service toilets, changing room, children room 5 star toilets
      and a parking space for 3,000 vehicles. The Haven Event Centre also
      includes a staging kitchen, making the space ideal for sit-down banquets
      of 180 tables or receptions that can accommodate as many as 1800 guests.
      It can be furnished and decorated to reflect your desired mood or
      ambiance.`,
    location: 'ikeja',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166341/reaction-commerce/center7_mzbcr5.jpg',
    capacity: 1500,
    cost: 1000000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Landmark',
    description: `Just like the name implies, Landmark Event Centre
    is a major landmark in the heart of Victoria Island. Sitting on
    a 40,000 square metres of land, the event centre is not just any
    one. It has a capacity of 2,000 for its theatre sitting and 1,600
    for banquet. The fully air conditioned event centre has its own
    private beach – talk about class.It has a parking space for 1,000
    cars and its strategic proximity makes it one of the hot cakes around.`,
    location: 'Victoria Island',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166416/reaction-commerce/center6_ulmrdu.jpg',
    capacity: 3600,
    cost: 5000000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Ibis',
    description: `Standard facilities are a feature of AccorHotels'
    economy hotels, excepting budget sub-brands hotelF1 and Ibis
    Budget, offering a 24-hour reception. Rooms provide a bathroom
    and shower room, a desk, a double or two single beds, wardrobe
    space, and international and local TV channels.[2] The hotel
    sometimes includes a restaurant or bar offering breakfast from
    4:00am-12:00pm, and in some hotels a 24-hour snack menu is offered.
    Generally, the ibis hotels are seen as having an economy emphasis.
    AccorHotels is endeavoring to change this by advertising all the
    hotel's achievements, distinctive features and highlighting AccorHotels'
    satisfaction guarantee`,
    location: 'Airport Road',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166465/reaction-commerce/center9_ghb3re.jpg',
    capacity: 3000,
    cost: 1500000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Civic Center',
    description: `The civic centre is on OzumbaMbadiwe Avenue, opposite 1004,
    Victoria Island andIt is one of the most used event centres in Lagos.It’s
    theatre-sitting style boasts a capacity of 1,000 and 600 for its grand
    banquet sitting. It has a standby generator and ample parking space.`,
    location: 'Victoria Island',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166484/reaction-commerce/center8_nzotoz.jpg',
    capacity: 1600,
    cost: 2500000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Oriental Hotel',
    description: `Everything about the Oriental Hotel speaks class. For its
    concert event, it has It has a theatre sitting space of about 2,000 persons
    and grand ballroom for banquent and the likes for about 1,200 persons.
    Oriental Hotel is situated along Lekki-Epe express way and it’s one of the
    most sought after event halls in Lagos. One would then be a little after
    realizing that to host an event in this event centre, `,
    location: 'Lekki',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166499/reaction-commerce/center5_dwf25k.jpg',
    capacity: 3200,
    cost: 5000000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Radisson Blu',
    description: `Welcome to the Radisson Blu Hotel London Stansted Airport,
    where convenience meets style for both business meetings and leisure stays.
    A covered walkway is all that stands between your room and the main terminal
    of this London airport. The hotel is also close to train and bus stations,
    and boasts secure parking. Enjoy a quality night’s sleep in one of the 500
    bedrooms or suites within the hotel, which all offer superb amenities; free
    high-speed wireless Internet, satellite TV with in-house movie channels,
    tea and coffee facilities and 24-hour room service.`,
    location: 'Victoria Island',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166517/reaction-commerce/center4_mi9l3y.jpg',
    capacity: 160,
    cost: 2000000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Dorchester',
    description: `Dorchester Event Centre is situated on Water Corporation road,
    off LigaliAyorinde, Victoria Island. It offers a theatre-style sitting space
    of 4,000 persons and 1,500 for banquet arrangements. It has a fully
    functional Air Conditioning system, ample parking space, standby generator
    and a total bargain of an event centre.`,
    location: 'Victoria Island',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166532/reaction-commerce/center3_aq9duc.jpg',
    capacity: 5500,
    cost: 2760000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Oceanview Restuarant',
    description: `Oceanview hall 2 is located atAdemolaAdetokunbostreet,
    Victoria Island, Lagos. Though older than a lot of others, its interior
    design and arrangement makes it ever in vogue. With an ample parking space,
    standby generator, a conference sitting for 2,000 persons and an executive
    banquet for 1,000, Oceanview is still pulling a lot of bookings.`,
    location: 'Victoria Island',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166548/reaction-commerce/center2_kvddv2.jpg',
    capacity: 3000,
    cost: 1000000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    centerName: 'Aquatic Hotels & Waterparks',
    description: `Aquatic hotels and waterparks is one of the most sought after
    event places on the mainland and reasonably so since it speaks prestige and
    status. It has its private waterpark & has one of the largest swimming pools
    for awards after-party. Located at 31/37Toyinstreet, Ikeja, Lagos, the event
    place has 2,500 conference seating arrangement and 1,500 executive banquet
    sitting style.`,
    location: 'Ikeja',
    facilities: ['car park', 'dinning area'],
    imageUrl: 'https://res.cloudinary.com/emmabaye/image/upload/v1530166548/reaction-commerce/center2_kvddv2.jpg',
    capacity: 4000,
    cost: 1500000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Centers', null, {}),
};
