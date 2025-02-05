import {
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';

export const storageEntry = async (
  req: Request,
  res: Response
) => {

  const {
    amount,
    itemsId,
  } = req.body;

  if (amount == '') {
    throw new Error('Preecha o campo quantidade');
  }

  const valid_item = await prisma.items.findFirst({
    where: {
      id: Number(itemsId)
    }
  });

  if (!valid_item) {
    throw new Error('Item inválido');
  }

  const entry_moviment = await prisma.moviments.findFirst({
    where: { name: 'entrada' }
  });

  if (!entry_moviment) {
    throw new Error('Movimento não encontrado');
  }
  console.log(req.user);

  const action = await prisma.actions.create({
    data: {
      amount,
      itemsId: valid_item.id,
      movimentsId: entry_moviment.id,
      userId: req.user.id,
    }
  });

  await prisma.items.update({
    where: { id: valid_item.id },
    data: {
      amount,
    }
  });

  res.status(201).json({ action });
}

export const storageOut = async (
  req: Request,
  res: Response
) => {

  const {
    amount,
    itemsId,
  } = req.body;

  if (amount == '') {
    throw new Error('Preecha o campo quantidade');
  }

  const valid_item = await prisma.items.findFirst({
    where: {
      id: Number(itemsId)
    }
  });

  if (!valid_item) {
    throw new Error('Item inválido');
  }

  const entry_moviment = await prisma.moviments.findFirst({
    where: { name: 'saida' }
  });

  if (!entry_moviment) {
    throw new Error('Movimento não encontrado');
  }

  if (valid_item.amount - amount <= 0) {
    throw new Error(`Não temos produtos no estoque para suprir sua necessidade, quantidade desse produto em estoque é de ${valid_item.amount}`);
  }

  const action = await prisma.actions.create({
    data: {
      amount,
      itemsId: valid_item.id,
      movimentsId: entry_moviment.id,
      userId: req.user.id,
    }
  });

  await prisma.items.update({
    where: { id: valid_item.id },
    data: {
      amount: valid_item.amount - amount,
    }
  });

  res.status(201).json({ action });
}
