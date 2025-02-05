import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const usuario = await prisma.users.upsert({
    where: { email: 'andre@gmail.com' },
    update: {},
    create: {
      name: 'Andre Lucas',
      email: 'andre@gmail.com',
      password: hashSync('Al154263789@', 8)
    }
  });

  const entrada = await prisma.moviments.upsert({
    where: { name: 'entrada' },
    update: {},
    create: {
      name: 'entrada'
    }
  });

  const saida = await prisma.moviments.upsert({
    where: { name: 'saida' },
    update: {},
    create: {
      name: 'saida'
    }
  });

  console.log({ usuario, entrada, saida });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })