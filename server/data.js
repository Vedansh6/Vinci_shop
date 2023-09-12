import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Vedansh',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Marty',
      email: 'marty@example.com',
      password: bcrypt.hashSync('Wendy'),
      isAdmin: false,
    },
  ],
    products: [
      {
        //_id: '1',
        name: 'The Last Suppppper',
        slug: 'the-last-supper',
        image: '/images/p1.jpg', // 679px × 829px
        price: 5000,
        artist: 'Leonardo Da Vinci',
        width: 10,
        length: 20,
        sizeUnit: 'inch',

      },
      {
        //_id: '2',
        name: 'Madonna Of The Rocks',
        slug: 'madonna-of-the-rocks',
        image: '/images/p2.jpg', // 679px × 829px
        price: 5000,
        artist: 'Leonardo Da Vinci',
        width: 10,
        length: 20,
        sizeUnit: 'inch',

      },
      {
        //_id: '3',
        name: 'La Belle Ferronniere',
        slug: 'la-belle-ferronniere',
        image: '/images/p3.jpg', // 679px × 829px
        price: 5000,
        artist: 'Leonardo Da Vinci',
        width: 10,
        length: 20,
        sizeUnit: 'inch',

      },
      {
        //_id: '4',
        name: 'Lady With An Ermine',
        slug: 'lady-with-an-ermine',
        image: '/images/p4.jpg', // 679px × 829px
        price: 5000,
        artist: 'Leonardo Da Vinci',
        width: 10,
        length: 20,
        sizeUnit: 'inch',

      },
      
    ],
  };
  export default data;