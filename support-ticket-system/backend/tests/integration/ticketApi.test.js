import request from 'supertest';
import mongoose from 'mongoose';
import createApp from '../../src/app.js';
import User from '../../src/models/User.js';
import Ticket from '../../src/models/Ticket.js';
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
} from '../helpers/mongoMemory.js';

const app = createApp();

beforeAll(async () => {
  await connectTestDatabase();
}, 120000);

afterAll(async () => {
  await disconnectTestDatabase();
}, 120000);

afterEach(async () => {
  await clearDatabase();
});

const createFixtures = async () => {
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    role: 'agent',
  });

  const ticket = await Ticket.create({
    title: 'Test ticket title',
    description: 'Test ticket description for validation',
    priority: 'medium',
    status: 'open',
    createdBy: user._id,
  });

  return { user, ticket };
};

describe('Ticket API integration', () => {
  test('creates a ticket', async () => {
    const { user } = await createFixtures();

    const response = await request(app).post('/api/tickets').send({
      title: 'New issue',
      description: 'Detailed description of the new issue',
      priority: 'high',
      createdBy: user._id.toString(),
    });

    expect(response.status).toBe(201);
    expect(response.body.data.status).toBe('open');
  });

  test('lists tickets with status filter', async () => {
    const { user } = await createFixtures();

    await Ticket.create({
      title: 'Closed issue title',
      description: 'Another detailed ticket description',
      priority: 'low',
      status: 'closed',
      createdBy: user._id,
    });

    const response = await request(app).get('/api/tickets?status=open');

    expect(response.status).toBe(200);
    expect(response.body.data.every((ticket) => ticket.status === 'open')).toBe(true);
  });

  test('rejects invalid status transition', async () => {
    const { ticket } = await createFixtures();

    const response = await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'resolved' });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Invalid status transition/);
  });

  test('allows valid status transition open to in_progress', async () => {
    const { ticket } = await createFixtures();

    const response = await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'in_progress' });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('in_progress');
  });

  test('allows full valid transition path to closed', async () => {
    const { ticket } = await createFixtures();

    await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'in_progress' })
      .expect(200);

    await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'resolved' })
      .expect(200);

    const response = await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'closed' });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('closed');
  });

  test('rejects transition from closed', async () => {
    const { user } = await createFixtures();

    const ticket = await Ticket.create({
      title: 'Closed ticket title',
      description: 'Closed ticket detailed description',
      priority: 'low',
      status: 'closed',
      createdBy: user._id,
    });

    const response = await request(app)
      .patch(`/api/tickets/${ticket._id}/status`)
      .send({ status: 'open' });

    expect(response.status).toBe(400);
  });

  test('returns 404 for unknown ticket', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/tickets/${fakeId}`);

    expect(response.status).toBe(404);
  });

  test('adds comment to ticket', async () => {
    const { user, ticket } = await createFixtures();

    const response = await request(app)
      .post(`/api/tickets/${ticket._id}/comments`)
      .send({
        message: 'This is a test comment',
        createdBy: user._id.toString(),
      });

    expect(response.status).toBe(201);
    expect(response.body.data.message).toBe('This is a test comment');
  });
});
