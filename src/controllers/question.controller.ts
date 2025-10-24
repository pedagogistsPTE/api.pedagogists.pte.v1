import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllQuestions = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10, q, module, difficulty, ordering } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);

  const where: any = {};
  if (q) {
    where.title = {
      contains: q,
      mode: 'insensitive',
    };
  }
  if (module) {
    where.module = {
      code: module,
    };
  }
  if (difficulty) {
    where.difficulty = parseInt(difficulty as string, 10);
  }

  const orderBy: any = {};
  if (ordering) {
    const [field, direction] = (ordering as string).split(':');
    orderBy[field] = direction;
  }

  try {
    const questions = await prisma.question.findMany({
      where,
      orderBy,
      skip: (pageNumber - 1) * pageSizeNumber,
      take: pageSizeNumber,
      include: {
        module: true,
        type: true,
      },
    });
    const totalQuestions = await prisma.question.count({ where });
    res.json({
      data: questions,
      totalPages: Math.ceil(totalQuestions / pageSizeNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        media: {
          include: {
            tracks: true,
          },
        },
      },
    });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = await prisma.question.create({
      data: req.body,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id, 10) },
      data: req.body,
    });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.question.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
