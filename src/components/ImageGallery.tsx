const ImageGallery = ({ images }: { images: string[] }) => {
	return (
		<ul>
      {images.map(image => (
        <li>
          <img src={image} alt={image} />
        </li>
      ))}
		</ul>
	);
};

export default ImageGallery;
