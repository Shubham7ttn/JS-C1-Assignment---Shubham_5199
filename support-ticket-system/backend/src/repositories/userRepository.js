import User from '../models/User.js';

export const userRepository = {
  findAll: () => User.find().sort({ name: 1 }).lean(),

  findById: (id) => User.findById(id).lean(),

  findByEmail: (email) => User.findOne({ email }).lean(),

  create: (data) => User.create(data),
};
