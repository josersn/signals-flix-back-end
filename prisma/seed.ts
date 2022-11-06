import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const plans = [
        {
            "title": "Básico",
            "description": "Ideal para uma pessoa que gosta de qualidade.",
            "price": 20
        },
        {
            "title": "Padrão",
            "description": "Ideal para uma familia que gosta de qualidade.",
            "price": 30
        },
        {
            "title": "Premium",
            "description": "Ideal para uma familia que gosta de muito mais qualidade.",
            "price": 40
        }
    ];


    await prisma.plans.createMany({
        data: plans
    });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect
    })