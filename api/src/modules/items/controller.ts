import {
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';

export const createNewItem = async (
  req: Request,
  res: Response
) => {

  const name = req.body.name;

  if (name == '') {
    throw new Error('Preencha o campo nome');
  }

  const item = await prisma.items.create({
    data: {
      name,
    }
  });

  res.status(201).json({ item });
}
