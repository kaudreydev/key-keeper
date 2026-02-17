import { Game } from "@/lib/models/game";
import { JSX, use, Suspense } from "react";

export default function GameList({
    games,
}: {
    games: Promise<Game[]>;
}): JSX.Element {
    const allGames = use(games);
    const showGames = 0 < allGames.length;

    return (
        <div>
            <h1>Games</h1>
            <Suspense fallback={<div>Loading...</div>}>
                {showGames && (
                    <div>
                        <ul>
                            {allGames.map((game: Game) => (
                                <li key={game.gameId.toString()}>
                                    {game.igdbId}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!showGames && <div>Failed to retrieve games.</div>}
            </Suspense>
        </div>
    );
}
