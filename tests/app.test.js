// app.test.js

const request = require('supertest');
const app = require('../app');

describe('User Registration', () => {
    test('Should not register user without required fields', async () => {
        const response = await request(app).post('/auth/register').send({
            name: 'Test User',
            email: '',
            password: 'password123',
            phoneNumber: '',
            universityID: '10001',
            enrollmentProof: '',
            profilePicture: ''
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('All fields are required');
    });
});

describe('Ride Posting', () => {
    test('Student driver should be able to post a ride', async () => {
        const response = await request(app).post('/rides/post')
            .set('Authorization', `Bearer ${token}`)
            .send({
                startPoint: 'Home',
                destination: 'University',
                date: '2024-11-10',
                time: '08:00 AM',
                seatsAvailable: 3,
                pricePerSeat: 50
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Ride posted successfully');
    });
});

describe('Ride Search and Booking', () => {
    test('Passenger should be able to find and book a ride', async () => {
        const searchResponse = await request(app).get('/rides')
            .query({
                startPoint: 'Home',
                destination: 'University',
                date: '2024-11-10'
            });
        expect(searchResponse.statusCode).toBe(200);
        expect(searchResponse.body.rides.length).toBeGreaterThan(0);

        const bookingResponse = await request(app).post(`/rides/book/${searchResponse.body.rides[0]._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ seatCount: 1 });
        expect(bookingResponse.statusCode).toBe(200);
        expect(bookingResponse.body.message).toBe('Booking confirmed');
    });
});
