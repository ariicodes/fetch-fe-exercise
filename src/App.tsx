import axios from 'axios';
import { useEffect, useState } from 'react';
import DogListForm from './components/DogListForm';
import ImageGallery from './components/ImageGallery';
import Hero from './components/Hero';

function App() {
	const [dogList, setDogList] = useState<string[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [showBtn, setShowBtn] = useState<boolean>(false);

	useEffect(() => {
		const getDogs = async () => {
			try {
				// FETCH DOG BREED DATA USING AXIOS
				const res = await axios.get('https://dog.ceo/api/breeds/list/all');
				const data = res.data.message;

				// LIST TO STORE THE REFORMATTED DOG BREEDS
				const newList: string[] = [];
				// ITERATING OVER THE DATA & MANUALLY DESTRUCTURING IT
				for (const key in data) {
					if (Array.isArray(data[key]) && data[key].length > 0) {
						for (const val of data[key]) {
							newList.push(`${key} ${val}`);
						}
					} else {
						newList.push(key);
					}
				}
				setDogList(newList);
			} catch (err) {
				console.error('ERROR:', err);
			}
		};
		getDogs();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 300 ? setShowBtn(true) : setShowBtn(false);
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<main className='px-10 lg:px-24 pb-20'>
			<Hero dogList={dogList} />
			<DogListForm dogList={dogList} setImages={setImages} />
			<ImageGallery images={images} />
			{showBtn && (
				<a
					href='#top'
					className='fixed bottom-10 right-5 bg-blue-800 text-white p-2 rounded-lg font-bold'
				>
					BACK TO TOP
				</a>
			)}
		</main>
	);
}

export default App;
