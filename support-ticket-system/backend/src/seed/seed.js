import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Comment from '../models/Comment.js';

dotenv.config();

const seedUsers = [
  { name: 'Alice Admin', email: 'alice@company.com', role: 'admin' },
  { name: 'Bob Agent', email: 'bob@company.com', role: 'agent' },
  { name: 'Carol User', email: 'carol@company.com', role: 'user' },
];

const seed = async () => {
  await connectDatabase();

  await Promise.all([Comment.deleteMany({}), Ticket.deleteMany({}), User.deleteMany({})]);

  const users = await User.insertMany(seedUsers);
  const [alice, bob, carol] = users;

  const tickets = await Ticket.insertMany([
    {
      title: 'Cannot access dashboard',
      description: 'User reports login succeeds but dashboard shows blank screen after redirect.',
      priority: 'high',
      status: 'open',
      createdBy: carol._id,
      assignedTo: bob._id,
    },
    {
      title: 'Export CSV timeout',
      description: 'Large exports fail after 30 seconds with gateway timeout error.',
      priority: 'medium',
      status: 'in_progress',
      createdBy: alice._id,
      assignedTo: bob._id,
    },
    {
      title: 'Password reset email delay',
      description: 'Reset emails arrive after 15+ minutes instead of immediately.',
      priority: 'low',
      status: 'resolved',
      createdBy: carol._id,
      assignedTo: bob._id,
    },
  ]);

  await Comment.insertMany([
    {
      ticketId: tickets[0]._id,
      message: 'I can reproduce this in Chrome on Windows.',
      createdBy: carol._id,
    },
    {
      ticketId: tickets[1]._id,
      message: 'Investigating query performance on export endpoint.',
      createdBy: bob._id,
    },
  ]);

  console.log('Seed completed successfully');
  await disconnectDatabase();
};

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await disconnectDatabase();
  process.exit(1);
});
