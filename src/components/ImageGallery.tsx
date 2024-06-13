const ImageGallery = ({ images }: { images: string[] }) => {
	return (
		<>
			{/* IMAGES CONTAINER */}
			<ul className='flex flex-wrap gap-0 lg:gap-4 justify-center'>
				{/* MAP THROUGH THE IMAGES ARRAY */}
				{images.map((image, i) => (
					<li
						key={i}
						className='overflow-hidden size-96 flex flex-row justify-center'
					>
						<img
							src={image}
							alt={image}
							className='object-cover object-center h-72 rounded-lg'
						/>
					</li>
				))}
			</ul>
		</>
	);
};

export default ImageGallery;
