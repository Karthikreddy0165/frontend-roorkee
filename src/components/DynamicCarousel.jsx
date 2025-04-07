import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DynamicCarousel = ({ c1Images, c2Images }) => {
  const imageTemplate = (image, index) => {
    return (
      <img
        src={image}
        alt={`Image-${index}`}
        className="w-60 h-40 object-cover rounded shadow-md"
      />
    );
  };

  return (
    <div className="relative w-full h-screen">
      {/* C1 Carousel */}
      <div className="absolute top-1/4 left-10 w-60 z-20">
        <Carousel
          value={c1Images}
          itemTemplate={imageTemplate}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={3000}
          showNavigators={false}
        />
      </div>

      {/* C2 Carousel */}
      <div className="absolute bottom-1/4 right-10 w-60 h-80 z-20">
        <Carousel
          value={c2Images}
          itemTemplate={imageTemplate}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={3000}
          showNavigators={false}
        />
      </div>
    </div>
  );
};

export default DynamicCarousel;
