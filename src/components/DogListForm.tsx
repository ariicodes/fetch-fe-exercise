import { useState, useEffect, useRef } from 'react';
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
			// RETURN THE FETCHED IMAGE URLS
			return data;
		} catch (err) {
			console.error('ERROR:', err);
			return []; // RETURN EMPTY ARRAY TO AVOID ISSUES
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOpts = Array.from(e.target.selectedOptions).map(
			option => option.value
		);
		setOptions(selectedOpts);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // PREVENT DEFAULT FORM SUBMISSION

		const allImageUrls: string[] = [];
		// FETCH IMAGES FOR EACH SELECTED OPTION
		for (const option of options) {
			const fetchedImages = await getImages(
				`https://dog.ceo/api/breed/${option}/images`
			);
			allImageUrls.push(...fetchedImages);
		}

		// SET THE FINAL IMAGE STATE AFTER ALL IMAGES ARE FETCHED
		setImages(allImageUrls);
	};

	useEffect(() => {
		// FETCH IMAGES FOR INITIALLY SELECTED OPTIONS
		options.forEach(getImages);
	}, [options]);

	const selectRef = useRef<HTMLSelectElement>(null);

	const handleReset = (e: React.UIEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setImages([]);
		if (selectRef.current) {
			selectRef.current.selectedIndex = -1; // Clear selection
		}
	};

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
					ref={selectRef}
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
				className='bg-blue-800 text-white p-2 rounded-lg font-bold mb-2'
				type='submit'
			>
				Show me the doggos!
			</button>
			<button
				className='bg-fuchsia-700 text-white p-2 rounded-lg font-bold'
				type='button'
				onClick={handleReset}
			>
				Reset gallery
			</button>
		</form>
	);
};

export default DogListForm;
