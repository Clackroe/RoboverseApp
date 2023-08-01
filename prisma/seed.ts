import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed users
    const users = await Promise.all(
      Array.from({ length: 10 }).map(async (_, index) => {
        const name = `User ${index + 1}`;
        const email = `user${index + 1}@example.com`;
        const image = `https://example.com/user${index + 1}.jpg`;

        return prisma.user.create({
          data: {
            name,
            email,
            image,
          },
        });
      })
    );

    // Ensure users array is not empty
    if (users.length === 0) {
      console.error("Error seeding the database: No users found.");
      return;
    }

    // Seed teams
    const teams = await Promise.all(
      Array.from({ length: 5 }).map(async (_, index) => {
        const name = `Team ${index + 1}`;
        const eq_elo = 1000;
        const trained_elo = 1000;

        return prisma.team.create({
          data: {
            name,
            eq_elo,
            trained_elo,
          },
        });
      })
    );

    // Ensure teams array is not empty
    if (teams.length === 0) {
      console.error("Error seeding the database: No teams found.");
      return;
    }

    // Seed equations
    const equations = await Promise.all(
      Array.from({ length: 20 }).map(async (_, index) => {
        const name = `Equation ${index + 1}`;
        const content = `Equation content ${index + 1}`;
        const elo_contribute = Math.floor(Math.random() * 101) - 50;

        // Use users[0] and teams[0] as a fallback in case arrays are empty
        const user =
          users[Math.floor(Math.random() * users.length)] ?? users[0];
        const team =
          teams[Math.floor(Math.random() * teams.length)] ?? teams[0];

        if (!user || !team) {
          console.error("Error seeding the database: No users or teams found.");
          return;
        }

        return prisma.equation.create({
          data: {
            name,
            content,
            elo_contribute,
            user_id: user.id,
            team_id: team.id,
          },
        });
      })
    );

    // Seed equation matches
    await Promise.all(
      equations.map(async (equation) => {
        const type = Math.random() < 0.5 ? "Casual" : "Ranked";
        const timestamp = new Date();

        if (!equation || !teams) {
          console.error(
            "Error seeding the database: No equations found to seed matches."
          );
          return;
        }

        if (!teams || teams.length < 2) {
          console.error(
            "Error seeding the database: Not enough teams found to seed matches."
          );
          return;
        }

        const team1 = teams[Math.floor(Math.random() * teams.length)];
        const team2 = teams[Math.floor(Math.random() * teams.length)];

        if (!team1 || !team2) {
          return;
        }

        return prisma.equationMatch.create({
          data: {
            type,
            timestamp,
            TeamInEquationMatch: {
              create: [
                {
                  teamId: team1.id,
                  score: Math.floor(Math.random() * 101),
                  equationID: equation.id,
                  winner: Math.random() < 0.5,
                },
                {
                  teamId: team2.id,
                  score: Math.floor(Math.random() * 101),
                  equationID: equation.id,
                  winner: Math.random() < 0.5,
                },
              ],
            },
          },
        });
      })
    );

    // Seed sessions
    await Promise.all(
      users.map(async (user) => {
        const expires = new Date();
        const sessionToken = `session_token_${user.id}`;

        return prisma.session.create({
          data: {
            expires,
            sessionToken,
            userId: user.id,
          },
        });
      })
    );

    // Seed verification tokens
    await Promise.all(
      users.map(async (user) => {
        const identifier = `verification_${user.id}`;
        const token = `token_${user.id}`;
        const expires = new Date();

        return prisma.verificationToken.create({
          data: {
            identifier,
            token,
            expires,
          },
        });
      })
    );

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
