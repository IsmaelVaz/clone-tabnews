import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
  };

  try {
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      response.status(200).json(pendingMigrations);
    } else if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        response.status(201).json(migratedMigrations);
      }
      response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }

  response.status(405).end();
}
