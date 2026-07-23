import { userService } from '../services/ticketService.js';

export const listUsers = async (req, res) => {
  const users = await userService.listUsers();
  res.json({ success: true, data: users });
};

export const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
};
