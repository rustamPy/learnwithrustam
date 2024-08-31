'use client';
import Image from "next/image";
import Teymur from './teymur.jpg'

const TeymPage = () => {
    // 
    return (
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h1 class="text-4xl font-bold text-green-600 mb-4">Teymur Abdullayev - Chess Prodigy</h1>
            <div>
                <Image width={100} height={100} alt="teymur" src={Teymur} />
                <p class="text-lg leading-relaxed mb-4">
                    Teymur Abdullayev is a remarkably talented chess player, known for his strategic brilliance and deep understanding of the game. His ability to think several moves ahead and anticipate his opponent's strategies sets him apart as a truly formidable competitor. Teymur's analytical skills and creativity in chess have earned him recognition in numerous tournaments, where he consistently demonstrates his exceptional intelligence and mastery of the game.
                </p>
                <p class="text-lg leading-relaxed">
                    What makes Teymur truly stand out is his unique approach to the game, blending classical techniques with innovative strategies. His adaptability and quick thinking have allowed him to outmaneuver many seasoned players, solidifying his reputation as a chess prodigy.
                </p>
            </div>
            <div className="flex flex-row">
                <img className={'w-80 h-80'} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25d45014-8cc3-4c98-b02c-5a0cf3a55ddd/dcpnfcn-aa852171-725a-400f-b837-b2d6774fdf4d.png/v1/fill/w_900,h_900/chess_piece_king_on_transparent_background__by_prussiaart_dcpnfcn-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvMjVkNDUwMTQtOGNjMy00Yzk4LWIwMmMtNWEwY2YzYTU1ZGRkXC9kY3BuZmNuLWFhODUyMTcxLTcyNWEtNDAwZi1iODM3LWIyZDY3NzRmZGY0ZC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.tObnyucxyQbSjiS7OYRvhS9hwwZiy5HCrTaQWBIhIQM" alt="Chessboard" class="mt-6 rounded-lg shadow-md" />
                <img className={'w-80 h-80'} src="https://static.vecteezy.com/system/resources/previews/029/475/104/original/black-queen-chess-piece-clipart-flat-design-icon-isolated-on-transparent-background-3d-render-chess-and-board-game-concept-png.png" />
            </div>
        </div>
    )
}

export default TeymPage;