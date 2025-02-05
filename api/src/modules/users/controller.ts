import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../prisma';

const retrieved_data = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export const createUser = async (
  req: Request,
  res: Response
) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (name == '') {
    throw new Error('Preencha o campo nome');
  }

  if (email == '') {
    throw new Error('Preencha o campo e-mail');
  }

  if (password == '') {
    throw new Error('Preencha o campo senha');
  }

  const valid_email = await prisma.users.findFirst({
    where: { email }
  });

  if (valid_email) {
    throw new Error('E-mail já cadastrado');
  }

  const hashed_password = await hash(password, 8);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashed_password,
    },
    select: retrieved_data
  });

  res.status(201).json({ user });
}

export const userSignIn = async (
  req: Request,
  res: Response
) => {

  const {
    email,
    password
  } = req.body;

  if (email == '') {
    throw new Error('Preencha o campo e-mail');
  }

  if (password == '') {
    throw new Error('Preencha o campo senha');
  }

  const valid_user = await prisma.users.findFirst({
    where: { email },
  });

  if (!valid_user) {
    throw new Error('E-mail ou senha inválidos');
  }

  const matched_password = await compare(password, valid_user.password);

  if (!matched_password) {
    throw new Error('E-mail ou senha inválidos');
  }

  const payload = { id: valid_user.id };

  const token = sign(payload, String(process.env.API_PASSWORD));

  res.json({ token });
}

export const listUsers = async (
  req: Request,
  res: Response
) => {

  const users = await prisma.users.findMany({
    select: retrieved_data
  });

  res.json({ users });
}

export const userProfile = async (
  req: Request,
  res: Response
) => {

  const user = await prisma.users.findFirst({
    where: {
      id: req.user.id,
    },
    select: retrieved_data,
  });

  res.json({ user });
}
