import { useEffect, useRef, useState } from 'react';
import './style.css';

function Game2(props) {
	let inputRef = useRef();
	const [library, setLibrary] = useState([]);
	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [inputWord, setInputWord] = useState('');
	
	const {shuffleLibrary, addCorrect, addError} = props.methods;
	
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
		
		if (library[currentIndex]) setCurrentWord(library[currentIndex]);
		// eslint-disable-next-line react-hooks/exhaustive-deps	
	}, [library, currentWord, currentIndex]);

	useEffect(() => {
		let inputElem = inputRef.current;
		if(!inputElem) return;
		let resultInfo = document.querySelector('.game__2__result');
		if (!resultInfo) return;

		if (check() === true) {
			addCorrect();
			resultInfo.innerHTML = 'Well done!';
			resultInfo.style.color = 'green';
			inputElem.value = '';
			setTimeout(() => {
				nextWord();
				resultInfo.innerHTML = '';
			}, 2000);
		}
		if (check() === false) {
			addError();
			resultInfo.innerHTML = 'Try again next time!'
			resultInfo.style.color = 'red';
			setTimeout(() => {
				nextWord();
				resultInfo.innerHTML = '';
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [inputWord]);

	function nextWord() {

		let currentIndexTmp = currentIndex;
		if (!library[currentIndexTmp]) return;
		currentIndexTmp++;
		
		setCurrentIndex(currentIndexTmp);

		if (currentIndexTmp === library.length) {
		
			currentIndexTmp = 0;
			setCurrentIndex(currentIndexTmp);
		}
	}

	function getWord() {
		let inputElem = inputRef.current;
		if(!inputElem) return;
		let word = inputElem.value;
		if (!word) return;
		setInputWord(word);
	}

	function check(){
		getWord();
		if (!inputWord  || inputWord.length === 0) return;

		if (inputWord === currentWord.word) return true;
		return false;
	}

	return (
		<div className='game__2'>
			<div className='game__2__head'>
				<p>Write IT</p>
				<p>write a translation for this word</p>
			</div>
            <div className="game__2__body">
					{library.length > 0 &&
						<> 
							<div className="game__2__translate">{currentWord.translate}</div>
							<div className="game__2__result">
							</div>
						</>
					}
					{library.length === 0 &&
						<><div className="learn__translate">Library is empty!</div></>
					}
					<div className="game__2__form">
						<input ref={inputRef} placeholder="Type your word here"/>
						<button onClick={check}>ok</button>
					</div>

			</div>
		</div>
	);
}

export default Game2;