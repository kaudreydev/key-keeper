import { Pool } from "pg";
import { Game } from "../models/game";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export const getGames = async (): Promise<Game[]> => {
    console.log(
        `User: ${pool.options.user}; /
        Host: ${pool.options.host}; /
        Database: ${pool.options.database}; /
        Port: ${pool.options.port}`,
    );
    try {
        const res = await pool.query("SELECT * FROM games");
        return res.rows.map((row) => ({
            gameId: row.game_id,
            igdbId: row.igdb_id,
            activationKey: row.activation_key,
            expirationDate: row.expiration_date,
        }));
    } catch (err) {
        console.error("Error fetching games:", err);
        return [];
    }
};
