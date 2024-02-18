import prisma from "@/lib/db";

async function seed() {
  await prisma.organization.createMany({
    data: [
      {
        name: "Acme Inc",
        description: "We make everything. Join us to change the world.",
      },
      {
        name: "Widgets Inc",
        description: "Creating the best widgets for the modern world.",
      },
      {
        name: "Gadgets Co",
        description: "Innovating the future of gadgets and tech.",
      },
      {
        name: "Marketing Wizards",
        description: "The best marketing team in the business.",
      },
      {
        name: "Design Innovators",
        description: "Pushing the boundaries of design creativity.",
      },
      {
        name: "Code Crafters",
        description: "Mastering the art of elegant and efficient code.",
      },
    ],
  });
}

(async () => {
  await seed();
  await prisma.$disconnect();
  console.log("Seeded organizations");
})();
