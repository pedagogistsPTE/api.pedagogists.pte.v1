import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const addMedia = async (req: Request, res: Response) => {
  try {
    const newMedia = await prisma.media.create({
      data: req.body,
    });
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add media' });
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        tracks: true,
      },
    });
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.media.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
};
