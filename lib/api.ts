"use server";

import { Pool } from "pg";

export async function createPool(): Promise<Pool> {
    const password = process.env.POSTGRES_PASSWORD_FILE
        ? require("fs")
              .readFileSync(process.env.POSTGRES_PASSWORD_FILE, "utf-8")
              .trim()
        : process.env.POSTGRES_PASSWORD || "";

    return Promise.resolve(
        new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            port: parseInt(process.env.POSTGRES_PORT || "5432"),
            password,
        }),
    );
}
