import { useEffect, useState } from 'react';
import './style.css';

function Game3(props) {
	const {shuffleLibrary, addCorrect, addError, setCurrentIndex, setCurrentWord} = props.methods;
	const {currentIndex, currentWord} = props.data;

	const [library, setLibrary] = useState([]);
	const [currentWordChars, setCurrentWordChars] = useState([]);
	const [resultWordChars, setResultWordChars] = useState([]);

	useEffect(() => {
		const libraryTmp = shuffleLibrary();

		if (libraryTmp && libraryTmp.length > 0) {
			if (library && library.length === 0) {
				setLibrary([...libraryTmp]);
			}
		}

		if (library && library.length > 0) setCurrentWord(library[currentIndex].translate);	
		// eslint-disable-next-line react-hooks/exhaustive-deps	
	});

	useEffect(() => {
		if (currentWordChars.length === 0 && currentWord) {
			setCurrentWordChars([...shuffleChars()]);
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentWord]);

	useEffect(() => {
		if (library[currentIndex]) {
			setCurrentWord(library[currentIndex].translate);
			setResultWordChars([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentIndex]);

	useEffect(() => {
		if (currentWordChars && currentWordChars.length === 0 && resultWordChars && resultWordChars.length > 0) {
			check();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWordChars]);

	function check() {
		const resultWordCharsTmp = resultWordChars.join('');
		let resultInfo = document.querySelector('.game__3__result');
		if (!resultInfo) return;

		if (resultWordCharsTmp === currentWord) {
			addCorrect();
			resultInfo.innerHTML = 'Well done!';
			resultInfo.style.color = 'green';
			setTimeout(() => {
				next();
				resultInfo.innerHTML = '';
			}, 2000);
		} else {
			addError();
			resultInfo.innerHTML = 'Try again next time!'
			resultInfo.style.color = 'red';
			setTimeout(() => {
				next();
				resultInfo.innerHTML = '';
			}, 2000);
		}
	}

	function shuffleChars() {
		let charsTmp = [];

		while(true) {
			if (charsTmp.length === currentWord.length) break;

			let index = Math.floor(Math.random() * currentWord.length);
			let char = currentWord[index];

			if (!charsTmp.includes(char)) charsTmp.push(char);
		}

		return charsTmp;
	}

	function next() {
		let currentIndexTmp = currentIndex;
		currentIndexTmp++;

		if (!library[currentIndexTmp]) {
			setCurrentIndex(0);
			return;
		};

		setCurrentIndex(currentIndexTmp);
	}
	
	function add(event) {
		let currentWordCharsTmp = currentWordChars;
		let resultWordCharsTmp = resultWordChars;

		let char = event.target.innerText;

		if (!char) return;

		resultWordCharsTmp.push(char);
		
		currentWordCharsTmp = currentWordCharsTmp.filter(item => item !== char);

		setCurrentWordChars(currentWordCharsTmp);
		setResultWordChars(resultWordCharsTmp);
	}

	return (
		<div className='game__3'>
			<div className='game__3__head'>
				<p>Check IT</p>
				<p>Put together a translation</p>
			</div>
		    <div className="game__3__body">
					{library.length > 0 &&
						<> 
							<div>{resultWordChars.map((char, index) => {
							return <button key={index}>{char}</button>
							})}</div>
							<div className="game__3__result"></div>
							<div>{currentWordChars.map((char, index) => {
								return <button onClick={add} key={index}>{char}</button>
							})}</div>
						</>
					}
					{library.length === 0 &&
						<><div className="learn__translate">Library is empty!</div></>
					}
			</div>			
        </div>
	);
}

export default Game3;