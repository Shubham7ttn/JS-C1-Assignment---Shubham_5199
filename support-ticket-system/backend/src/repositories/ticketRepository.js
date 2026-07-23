import Ticket from '../models/Ticket.js';

const populateFields = [
  { path: 'createdBy', select: 'name email role' },
  { path: 'assignedTo', select: 'name email role' },
];

export const ticketRepository = {
  create: (data) => Ticket.create(data),

  findById: (id) => Ticket.findById(id).populate(populateFields).lean(),

  updateById: (id, data) =>
    Ticket.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate(populateFields)
      .lean(),

  deleteById: (id) => Ticket.findByIdAndDelete(id),

  findAll: async ({ status, search, skip, limit }) => {
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const query = Ticket.find(filter).populate(populateFields).sort({ createdAt: -1 });

    const [data, total] = await Promise.all([
      query.skip(skip).limit(limit).lean(),
      Ticket.countDocuments(filter),
    ]);

    return { data, total };
  },
};
