import { useRef, useContext, useEffect } from "react";
import { MainContext } from "../Main";

function Library() {

	const {library, setLibrary} = useContext(MainContext);
	const inputRef = useRef();
	const libraryListRef = useRef();
	
	useEffect(() => {
		const libraryListElem = libraryListRef.current;
		libraryListElem.scrollTop = libraryListElem.scrollHeight;
		// console.dir(libraryListElem);
		
	}, [library]);

	function add(){
		let inputElem = inputRef.current;
		if (!inputElem) return;
		const word = inputElem.value;
		
		if (!word) return;
		
		inputElem.value = '';
		
		if (checkDublicate(word)) return;
		
		fetch(`https://tmp.myitschool.org/API/translate/?word=${word}&source=ru&target=en`)
		.then(response => response.json())
		.then(result => {
			const libraryTmp = library;
			libraryTmp.push({word: word, translate: result.translate, learn: 0})
			
			setLibrary([...libraryTmp]);
		});

	}

	function checkDublicate(word){
		const wordDublicate = library.find(item => word === item.word);
		if (wordDublicate) return true;
		return false;
	}

	function remove(wordIndex) {
		let libraryTmp = library;
		// без elem, тк в объекте нет элемента id  
		libraryTmp = libraryTmp.filter((elem, index) => wordIndex !== index);

		setLibrary([...libraryTmp]);

		if (libraryTmp.length === 0) localStorage.removeItem('library');
		// clearStorage();

	}
	
	function get(){
		return library.map((item, index) => {
			return (
				<div key={index} className={`library__item ${index}`} >
					<div className="library__col">{item.word}</div>
					<div className="library__col">{item.translate}</div>
					<div className="library__col">{item.learn}%</div>
					<button onClick={() => { remove(index) }}></button>
				</div>
			);
		});
	}

	return (
		<div className="page">
			<div className="library">
				<h1 className="library__title">Add new <span>Word</span></h1>

				<div className="library__form">
					<input ref={inputRef} />
					<button onClick={add}>+</button>
				</div>

				<div className="library__list">
					<div className="library__row head">
						<div className="library__col">Word</div>
						<div className="library__col">Translation</div>
						<div className="library__col">Learn</div>
					</div>
					<div ref={libraryListRef} className="library__row body" >{get()}</div>
				</div>
			</div>
		</div>
	);
}

export default Library;