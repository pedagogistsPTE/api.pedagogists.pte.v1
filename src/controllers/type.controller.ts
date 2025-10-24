import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllTypes = async (req: Request, res: Response) => {
  try {
    const types = await prisma.questionType.findMany();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question types' });
  }
};
