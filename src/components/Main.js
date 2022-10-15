import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Games from './pages/Games';
import Library from './pages/Library';
import Learn from './pages/Learn';
import Game from './pages/Game';

export const MainContext = React.createContext();

function Main() {

	const libraryGames = [
		{ name: 'Speak and check', description: 'Say the word on the screen and check your spelling' },
		{ name: 'Write the translation', description: 'Say the word on the screen and check your spelling' },
		{ name: 'Check it', description: 'Say the word on the screen and check your spelling' }
		
	];

	const [library, setLibrary] = useState([]);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		if (!library || library.length === 0) {
			const libraryLocal = getStorage();

			if (libraryLocal && libraryLocal.length > 0) {
				setLibrary([...libraryLocal]);
				setPoints(getStoragePoints());
			}
		} else {
			setStorage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	// Под вопросом, может отслеживать в верхнем useEffect?
	useEffect(() => {
		setStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [points]);

	function setStorage() {
		let libraryTmp = library;
		libraryTmp = JSON.stringify(libraryTmp);

		if (!libraryTmp) return;
		localStorage.setItem('library', libraryTmp);
		localStorage.setItem('points', points);
	}

	function getStorage() {
		let libraryTmp = localStorage.getItem('library');
		if (!libraryTmp) return;

		libraryTmp = JSON.parse(libraryTmp);

		if (!libraryTmp) return;

		return libraryTmp;
	}

	function getStoragePoints() {
		let points = localStorage.getItem('points');
		
		if (isNaN(points)) return;

		return points;
	}


	return (
		<main className="main">
			<div className="container">
				<MainContext.Provider value={{library, setLibrary, libraryGames, points, setPoints}}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/games/" element={<Games />} />
					<Route path="/learn/" element={<Learn />} />
					<Route path="/library/" element={<Library />} />
					<Route path="/games/:number/" element={<Game />} />
				</Routes>
				</MainContext.Provider>
			</div>
		</main>
	);
}

export default Main;