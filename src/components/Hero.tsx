import axios from 'axios';
import { useState, useEffect } from 'react';
import { formatBreed } from '../helpers';

const Hero = ({ dogList }: { dogList: string[] }) => {
	const [image, setImage] = useState<string>('');

	// FETCH A RANDOM DOG IMAGE
	const getRandomImage = async () => {
		let refetch: number = 5;
		let validImageFound: boolean = false;

		// LOOP TO REFETCH IF INVALID IMAGE IS FOUND
		while (refetch > 0 && !validImageFound) {
			const randomIndex = Math.floor(Math.random() * dogList.length);
			const breed = formatBreed(dogList[randomIndex]);

			// FETCH RANDOM DOG IMAGE
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

	// FETCH A RANDOM DOG IMAGE ON INITIAL LOAD
	useEffect(() => {
		getRandomImage();
	}, [dogList]);

	return (
		<header className='flex flex-col items-center mb-12 pt-20' id='top'>
			{/* HEADER TITLE */}
			<h1 className='z-20 mb-10 text-center'>
				<div className='text-4xl lg:text-6xl -mb-2'>Welcome to</div>
				<div className='text-8xl lg:text-9xl font-black uppercase -rotate-6 -mb-20 drop-shadow-2xl'>
					Doggo
				</div>
			</h1>
			{/* RANDOM DOG IMAGE */}
			<div className='z-10 flex flex-col items-center'>
				<button type='button' onClick={getRandomImage}>
					<img
						src={image}
						alt={image}
						className='w-80 lg:w-[35rem] mb-2 rounded-lg'
					/>
				</button>
				{/* INSTRUCTIONS TO GENERATE RANDOM IMAGE */}
				<p className='text-center animate-bounce'>
					☝️Click the doggo to generate a random pic☝️
				</p>
				<div className='mt-10 bg-gradient-to-r from-transparent via-blue-800/10 to-transparent w-screen flex flex-col items-center'>
					{/* TOP BORDER */}
					<div className='w-screen h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
					{/* DESCRIPTION */}
					<p className='text-2xl w-96 lg:w-auto text-center my-10'>
						Doggo is a dog image gallery with open source photos from{' '}
						<a href='https://dog.ceo/dog-api/' target='_blank'>
							DogAPI
						</a>
					</p>
					{/* BOTTOM BORDER */}
					<div className='w-screen h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent'></div>
				</div>
			</div>
		</header>
	);
};

export default Hero;
