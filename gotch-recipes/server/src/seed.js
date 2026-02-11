import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
    await prisma.recipe.create({
        data: {
            title: "Pancakes",
            description: "Family classic",
            ingredients: "2 cups flour\n2 eggs\n1.5 cups milk\n1 tbsp sugar\n2 tsp baking powder\nPinch of salt",
            instructions: "Mix dry.\nWisk wet.\nCombine.\nCook on skillet 2-3 min per side.",
            tags: "breakfast,sweet",
        },
    });
}

main().finally(async () => prisma.$disconnect());