import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import Game1 from '../games/game1/index';
import Game2 from '../games/game2/index';

import { MainContext } from "../Main";

function Game() {
	
	// Создаем общие элементы и действия для всех игр

	const {library, libraryGames, points} = useContext(MainContext);

	const [name, setName] = useState(null);
	const [content, setContent] = useState(null);
	
	const [errors, setErrors] = useState(0);
	const [correct, setCorrect] = useState(0);

	const params = useParams(); // номер подпути, выраженный : - это в path="/games/:number/ в Main
	

	useEffect(() => {

		if (!content) {
			const number = (params && params.number) ? +params.number : null;

			if (!isNaN(number)) {
				const gameName = libraryGames[number-1].name;
				if (gameName) setName(gameName);	

				switch(number) {
					case 1: setContent(<Game1 />); break;
					case 2: setContent(<Game2 library={library}/>); break;
					default: setContent('Game not found');
				}
			}
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content]);

	function shuffleLibrary() {
		let libraryTmp = [];

		while(true) {
			if (libraryTmp.length === library.length) break;

			let index = Math.floor(Math.random() * library.length);
			let word = library[index];

			if (!libraryTmp.includes(word)) libraryTmp.push(word);
		}

		
		return libraryTmp;
	}

	return (
		<div className="page">
			<div className="game">
				<div className="game__header">
					<Link to="/games/"></Link>
					<div className="game__header_info">
						<span className="errors">Errors: {errors}</span>
						<span className="correct">Correct: {correct}</span>
						<span className="points">Points: {points}</span>
					</div>
				</div>
				<div className="game__content">
					<h3>{name}</h3>
					{content}
				</div>
			</div>
        </div>
	);
}

export default Game;