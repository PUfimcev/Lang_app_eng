import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";

function Learn() {

	const {library, points} = useContext(MainContext);

	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [library1, setlibrary1] = useState([]);
	
	useEffect(() => {
		if (!library1 || library1.length === 0) {
			const shuffledLibrary = shuffleLibrary();
			setlibrary1([...shuffledLibrary]);
		}

		if (library1[currentIndex]) setCurrentWord(library1[currentIndex]);
	}, [library1, currentIndex]);
	
	function next() {
		let currentIndexTmp = currentIndex;
		if (!library1[currentIndexTmp]) return;
		currentIndexTmp++;
		
		setCurrentIndex(currentIndexTmp);

		if (currentIndexTmp === library1.length) {
		
			currentIndexTmp = 0;
			setCurrentIndex(currentIndexTmp);
		}
	}
		
	function shuffleLibrary() {
		let libraryTmp = [];
		while (true) {
			
			if (libraryTmp.length === library.length) break;
			
			let index = Math.floor(Math.random() * library.length);
			let word = library[index];
			
			if (!libraryTmp.includes(word)) libraryTmp.push(word);
		}
		return libraryTmp;
	}
	function reLoad() {
		// window.location.reload();
		let libraryTmp = [];
		setlibrary1([...libraryTmp]);
	}
		
	return (
		<div className="page">
			<div className="learn__progressbar"><span style={{width: (library.length > 0 ? ((currentIndex+1)*100)/library.length : 0) + '%'}}></span></div>
			<div className="learn">
				<div className="learn__header_info">
					<span className="points">Points: {points}</span>
				</div>
				<div className="learn__body">
					{library.length > 0 &&
						<>
							<div className="learn__translate">{currentWord.translate}</div>
							<div className="learn__word">{currentWord.word}</div>
							<button onClick={next}></button>
							<button onClick={reLoad}></button>
						</>
					}
					{library.length === 0 &&
						<><div className="learn__translate">Library is empty!</div></>
					}
				</div>
			</div>
		</div>
	);
}

export default Learn;