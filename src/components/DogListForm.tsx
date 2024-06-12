import { useState, useEffect } from 'react';
import axios from 'axios';

interface DogListFormProps {
	dogList: string[];
	setImages: (newImages: string[]) => void;
}

const DogListForm: React.FC<DogListFormProps> = ({ dogList, setImages }) => {
	const [options, setOptions] = useState<string[]>([]);

	// FORMATTING BREED VALUES
	const formatBreed = (breed: string) => {
		const breedSplit = breed.split(' ');
		return breedSplit.join('-');
	};

	const getImages = async (source: string) => {
		try {
			const res = await axios.get(source);
			const data = await res.data.message;
			// Return the fetched image URLs
			return data;
		} catch (err) {
			console.error('ERROR:', err);
			// Handle errors appropriately (optional)
			return []; // Return empty array to avoid issues
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOpts = Array.from(e.target.selectedOptions).map(
			option => `https://dog.ceo/api/breed/${option.value}/images`
		);
		setOptions(selectedOpts);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent default form submission

		const allImageUrls: string[] = [];
		// Fetch images for each selected option
		for (const option of options) {
			const fetchedImages = await getImages(option);
			allImageUrls.push(...fetchedImages);
		}

		// Set the final images state after all fetches are complete
		setImages(allImageUrls);
	};

	useEffect(() => {
		// Fetch images for initially selected options
		options.forEach(getImages);
	}, [options]);

	return (
		<form className='flex flex-col mb-16' onSubmit={handleSubmit}>
			<div className='flex flex-col mb-4'>
				<label htmlFor='breed-select' className='font-bold mb-1 pl-1 text-xl'>
					Select one or more breeds{' '}
					<span className='font-extralight'>
						Hold ctrl/cmd while clicking to select multiple
					</span>
				</label>
				<select
					name='breed-select'
					id='breed-select'
					multiple
					className='border-2 rounded-lg px-10 py-2 bg-slate-700 text-lg h-52'
					onChange={handleChange}
				>
					{dogList &&
						dogList.map((dog, i) => (
							<option value={formatBreed(dog)} key={i}>
								{dog}
							</option>
						))}
				</select>
			</div>
			<button
				className='bg-blue-800 text-white p-2 rounded-lg font-bold'
				type='submit'
			>
				Show me the doggos!
			</button>
		</form>
	);
};

export default DogListForm;
