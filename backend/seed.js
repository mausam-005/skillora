const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');

const coursesData = [
  {
    title: 'Machine Learning Specialization',
    instructor: 'Andrew Ng',
    category: 'data-science',
    rating: 4.9,
    price: 49.00,
    image: '/images/course.png',
    description: 'Learn foundational machine learning algorithms, from linear regression to deep neural networks.'
  },
  {
    title: 'Meta Front-End Developer Professional Certificate',
    instructor: 'Meta Staff',
    category: 'web-dev',
    rating: 4.8,
    price: 39.00,
    image: '/images/course.png',
    description: 'Launch your career as a front-end developer. Build job-ready skills for an in-demand career and earn a credential from Meta.'
  },
  {
    title: 'Google UX Design Professional Certificate',
    instructor: 'Google Career Certificates',
    category: 'design',
    rating: 4.8,
    price: 39.00,
    image: '/images/course.png',
    description: 'This is your path to a career in UX design. In this program, you will learn in-demand skills that will have you job-ready in less than 6 months.'
  },
  {
    title: 'IBM Data Science Professional Certificate',
    instructor: 'IBM Skills Network',
    category: 'data-science',
    rating: 4.6,
    price: 39.00,
    image: '/images/course.png',
    description: 'Kickstart your career in Data Science & ML. Build data science skills, learn Python & SQL, analyze & visualize data, build machine learning models.'
  },
  {
    title: 'Digital Marketing & E-commerce',
    instructor: 'Google',
    category: 'marketing',
    rating: 4.7,
    price: 0, // Mock free course
    image: '/images/course.png',
    description: 'Learn the fundamentals of digital marketing and e-commerce to help businesses grow their online presence.'
  },
  {
    title: 'Introduction to Mobile Application Development',
    instructor: 'Alex Johnson',
    category: 'mobile-dev',
    rating: 4.5,
    price: 29.99,
    image: '/images/course.png',
    description: 'A beginner-friendly guide to building mobile applications using modern cross-platform frameworks.'
  },
  {
    title: 'Business Foundations Specialization',
    instructor: 'Wharton School',
    category: 'business',
    rating: 4.7,
    price: 79.00,
    image: '/images/course.png',
    description: 'Develop basic literacy in the language of business, which you can use to transition to a new career, start or improve your own small business.'
  }
];

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillora')
  .then(async () => {
    console.log('Connected to MongoDB for Seeding');
    
    // Clear existing data
    await Course.deleteMany({});
    console.log('Old courses cleared');

    // Insert new data
    await Course.insertMany(coursesData);
    console.log('Database seeded with Coursera-like courses');

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
