import { useEffect, useState } from 'react';
import './style.css';
import Circle from '../../../images/Ellipse_right.png';

function Game1(props) {
	const {shuffleLibrary, addCorrect, addError, setCurrentIndex, setCurrentWord} = props.methods;
	const {currentIndex, currentWord} = props.data;

	const [library, setLibrary] = useState([]);
	const [voiceWord, setVoiceWord] = useState('');

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


		if (check() === true) {
			setVoiceWord('');
			addCorrect();
			next();
		}

		if (check() === false) addError();
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [voiceWord]);

	function next() {
		setVoiceWord('');

		let currentIndexTmp = currentIndex;
		currentIndexTmp++;

		if (!library[currentIndexTmp]) {
			setCurrentIndex(0);
			return;
		};

		setCurrentIndex(currentIndexTmp);
	}

	function check() {
		if (!currentWord || !voiceWord) return null;

		if (currentWord.toLowerCase() === voiceWord.toLowerCase()) return true;

		return false;
	}

	function voice() {		
		let SpeechRecognition = new (
			window.SpeechRecognition || 
			window.webkitSpeechRecognition || 
			window.mozSpeechRecognition || 
			window.msSpeechRecognition)();

		SpeechRecognition.lang = 'en-EN';

		SpeechRecognition.onresult = function(event){
			let word = event.results[0][0].transcript;

			if (!word) return;
			
			setVoiceWord(word);
		};

		SpeechRecognition.onend = function(){
			SpeechRecognition.stop();
		};

		SpeechRecognition.start();
	}

	return (
		<div className='game__1'>
			<div className='game__1__head'>
				<p>Speack IT</p>
				<p>say this word</p>
			</div>
		    <div className="game__1__body">
					{library.length > 0 &&
						<> 
							<h2>{currentWord}</h2>
							<div>{voiceWord && <div className='game__1__body-word' style={{color: 'red', fontSize: '20px' }}>{voiceWord}</div>}</div>
							<button className='game__1__body bnt_1' onClick={voice}></button>
							<button className='game__1__body bnt_2'onClick={next}>Skip it</button>
						</>
					}
					{library.length === 0 &&
						<><div className="learn__translate">Library is empty!</div></>
					}
			</div>			


            
        </div>
	);
}

export default Game1;