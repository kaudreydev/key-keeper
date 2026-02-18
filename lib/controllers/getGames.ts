"use server";

import { Game } from "../models/game";
import { createPool } from "../api";

export const getGames = async (): Promise<Game[]> => {
    const pool = await createPool();
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
