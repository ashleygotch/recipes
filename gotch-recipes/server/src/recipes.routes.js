import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const RecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  ingredients: z.string().min(1),
  instructions: z.string().min(1),
  tags: z.string().optional().nullable(),
});

// GET /recipes?q=...
router.get("/", async (req, res) => {
  const q = (req.query.q ?? "").toString().trim();
  const recipes = await prisma.recipe.findMany({
    where: q ? { title: { contains: q, mode: "insensitive" } } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  res.json(recipes);
});

// GET /recipes/:id
router.get("/:id", async (req, res) => {
  const recipe = await prisma.recipe.findUnique({ where: { id: req.params.id } });
  if (!recipe) return res.status(404).json({ error: "Not found" });
  res.json(recipe);
});

// POST /recipes
router.post("/", async (req, res) => {
  const parsed = RecipeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const created = await prisma.recipe.create({ data: parsed.data });
  res.status(201).json(created);
});

// PUT /recipes/:id
router.put("/:id", async (req, res) => {
  const parsed = RecipeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  try {
    const updated = await prisma.recipe.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE /recipes/:id
router.delete("/:id", async (req, res) => {
  try {
    await prisma.recipe.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
