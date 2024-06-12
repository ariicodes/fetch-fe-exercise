const ImageGallery = ({ images }: { images: string[] }) => {
	return (
		<>
			<ul className='flex flex-wrap gap-0 lg:gap-4 justify-center'>
				{images.map((image, i) => (
					<li
						key={i}
						className='overflow-hidden size-96 flex flex-row justify-center'
					>
						<img
							src={image}
							alt={image}
							className='object-cover object-center h-72'
						/>
					</li>
				))}
			</ul>
		</>
	);
};

export default ImageGallery;
