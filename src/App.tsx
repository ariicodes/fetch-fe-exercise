import axios from 'axios';
import { useEffect, useState } from 'react';
import DogListForm from './components/DogListForm';
import ImageGallery from './components/ImageGallery';

function App() {
	const [dogList, setDogList] = useState<string[]>([]);
	const [images, setImages] = useState<string[]>([]);

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

	return (
		<main className='px-24'>
			<h1 className='text-6xl font-black uppercase text-center my-10'>Doggo</h1>
			<DogListForm dogList={dogList} setImages={setImages} />
			<ImageGallery images={images} />
		</main>
	);
}

export default App;
