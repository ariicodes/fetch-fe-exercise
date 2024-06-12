import { useState, useEffect } from 'react';
import axios from 'axios';

interface DogListFormProps {
	dogList: string[];
	setImages: (newImages: string[]) => void;
}

const DogListForm: React.FC<DogListFormProps> = ({ dogList, setImages }) => {
	const [options, setOptions] = useState<string[]>([]);
	const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>(
		{}
	);

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;

		setCheckedState(prevState => ({
			...prevState,
			[value]: checked,
		}));

		if (checked) {
			setOptions([...options, value]);
		} else {
			setOptions(options.filter(opt => opt !== value));
		}
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

	const handleReset = (e: React.UIEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOptions([]);
		setImages([]);
		setCheckedState({});
	};

	return (
		<form className='flex flex-col mb-16' onSubmit={handleSubmit}>
			<fieldset className='pl-1 text-xl flex flex-col mb-4'>
				<legend className='font-bold'>Select one or more breeds</legend>
				<div className='h-52 flex flex-wrap border-2 rounded-lg px-8 py-6 bg-slate-700 overflow-auto gap-4'>
					{dogList &&
						dogList.map((dog, i) => (
							<div key={i} className='w-60'>
								<input
									type='checkbox'
									name={formatBreed(dog)}
									id={formatBreed(dog)}
									className='mr-2 size-4'
									value={formatBreed(dog)}
									checked={!!checkedState[formatBreed(dog)]}
									onChange={handleChange}
								/>
								<label htmlFor={formatBreed(dog)}>{dog}</label>
							</div>
						))}
				</div>
			</fieldset>
			<button
				className='bg-blue-800 text-white p-2 rounded-lg font-bold mb-2'
				type='submit'
			>
				Show me the doggos!
			</button>
			<button
				className='border-2 border-blue-800 bg-blue-800/25 text-white p-2 rounded-lg font-bold'
				type='button'
				onClick={handleReset}
			>
				Reset gallery
			</button>
		</form>
	);
};

export default DogListForm;
