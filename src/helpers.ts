import axios from 'axios';

// FORMATTING BREED VALUES
export const formatBreed = (breed: string) => {
	let breedSplit: string[] = [];
	if (breed) {
		breedSplit = breed.split(' ');
	}
	return breedSplit.join('-');
};

// API CALL TO FETCH IMAGES
export const getImages = async (source: string) => {
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
