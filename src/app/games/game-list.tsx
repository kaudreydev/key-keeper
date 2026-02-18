import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Game } from "@/lib/models/game";
import { JSX, Suspense, use } from "react";

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
                        <Table>
                            <TableCaption>List of Games</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        IGDB ID
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allGames.map((game: Game) => (
                                    <TableRow key={game.gameId.toString()}>
                                        <TableCell>{game.igdbId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {!showGames && <div>Failed to retrieve games.</div>}
            </Suspense>
        </div>
    );
}
