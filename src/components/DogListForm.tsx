const DogListForm = ({ dogList }: { dogList: string[] }) => {
	// FORMATTING BREED VALUES
	const formatBreed = (breed: string) => {
		return breed.split(' ').join('-');
	};

	return (
		<form className='px-24 flex flex-col'>
			<div className='flex flex-col mb-4'>
				<label htmlFor='breed-select' className='font-bold'>
					Select one or more breeds{' '}
					<span className='font-extralight'>
						Hold ctrl/cmd while clicking to select multiple
					</span>
				</label>
				<select
					name='breed-select'
					id='breed-select'
					multiple
					className='border-2 rounded-lg p-2'
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
