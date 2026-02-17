import { JSX } from "react/jsx-dev-runtime";
import GameList from "./game-list";
import { getGames } from "@/lib/controllers/getGames";

export default function GamesPage(): JSX.Element {
    const games = getGames();

    return <GameList games={games} />;
}
