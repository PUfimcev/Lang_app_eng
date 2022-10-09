import { useEffect, useRef, useState, useContext } from 'react';
import './style.css';
import { MainContext } from "../../Main";


function Game2() {
	let inputRef = useRef();
	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const {library, points} = useContext(MainContext);
	

	useEffect(() => {
		
		if (library[currentIndex]) setCurrentWord(library[currentIndex]);
	}, [currentWord, currentIndex])

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

	function check(){
		let inputElem = inputRef.current;
		if(!inputElem) return;
		let word = inputElem.value;
		if (!word) return;
		let resultInfo = document.querySelector('.game__2__result');
		if (!resultInfo) return;

		if (word === currentWord.word) {
			resultInfo.innerHTML = 'Well done!';
			resultInfo.style.color = 'green';
			inputElem.value = '';
			setTimeout(() => {
				nextWord();
				resultInfo.innerHTML = '';
		}, 2000);
		} else {
			resultInfo.innerHTML = 'Try again!'
			resultInfo.style.color = 'red';
		}
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