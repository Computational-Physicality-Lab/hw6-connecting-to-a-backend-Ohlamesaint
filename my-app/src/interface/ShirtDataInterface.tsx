interface frontAndBack {
  front: string;
  back: string;
}

interface ShirtDataInterface {
  name: string;
  description: string;
  price: string;
  colors: {
    [index: string]: frontAndBack | any;
  };
  default?: any;
}

export default ShirtDataInterface;