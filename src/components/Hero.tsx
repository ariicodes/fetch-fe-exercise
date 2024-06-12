import axios from 'axios';
import { useState, useEffect } from 'react';

const Hero = ({ dogList }: { dogList: string[] }) => {
	const [image, setImage] = useState<string>('');

	// FORMATTING BREED VALUES
	const formatBreed = (breed: string) => {
		const breedSplit = breed.split(' ');
		return breedSplit.join('-');
	};

	const getRandomImage = async () => {
		let refetch: number = 5;
		let validImageFound: boolean = false;

		while (refetch > 0 && !validImageFound) {
			const randomIndex = Math.floor(Math.random() * dogList.length);
			const breed = formatBreed(dogList[randomIndex]);

			try {
				const res = await axios.get(
					`https://dog.ceo/api/breed/${breed}/images/random`
				);
				const data = res.data.message;
				if (data && typeof data === 'string') {
					setImage(data);
					validImageFound = true;
				} else {
					refetch -= 1;
				}
			} catch (err) {
				console.error('ERROR:', err);
				refetch -= 1;
			}
		}
	};

	useEffect(() => {
		getRandomImage();
	}, [dogList]);

	return (
		<header className='flex flex-col items-center mb-12 pt-20' id='top'>
			<h1 className='z-20 mb-10 text-center'>
				<div className='text-4xl lg:text-6xl -mb-2'>Welcome to</div>
				<div className='text-8xl lg:text-9xl font-black uppercase -rotate-6 -mb-20'>
					Doggo
				</div>
			</h1>
			<div className='z-10 flex flex-col items-center'>
				<button type='button' onClick={getRandomImage}>
					<img src={image} alt={image} className='w-80 lg:w-96 mb-2' />
				</button>
				<p className='text-center animate-bounce'>
					☝️Click the doggo to generate a random pic☝️
				</p>
			</div>
		</header>
	);
};

export default Hero;
