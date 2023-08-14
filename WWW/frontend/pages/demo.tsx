import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Spinner } from "../components/ui/Spinner";
import useSupabaseUser from "../utils/store/useSupabaseUser";
import { useRouter } from "next/router";
import InputComponent from "../components/ui/Input";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
import { socketRequest } from "../utils/socketRequest";

type ErrorResponse = {
  message: string;
};

export let socket;

const IndexPage = () => {
  const router = useRouter();

  const { userDetails } = useSupabaseUser();

  const [prompt, setPrompt] = useState<string>("");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [promptResponse, setPromptResponse] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [inputFile, setInputFile] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    socket = io("https://mj.sag17.tech/");

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("progress", (data) => {
      setProgress(data * 100);
    });

    socket.on("imageURL", (data) => {
      setIsLoading(false);
      setImage(data);
    });
  }, []);

  const brands = [
    "Puma",
    "Adidas",
    "Alexander McQueen",
    "Fila",
    "Saint Laurent",
    "Hoka One One",
    "Balenciaga",
    "Reebok",
    "Dior",
    "ASICS",
    "Miu Miu",
    "Skechers",
    "Lacoste",
    "Jimmy Choo",
    "Timberland",
    "Maison Margiela",
    "Vans",
    "Nike",
    "New Balance",
    "Versace",
    "Rick Owens",
    "Christian Louboutin",
    "Clarks",
    "Merrell",
    "Balmain",
    "Under Armour",
    "Prada",
    "Common Projects",
    "Jordan",
    "Salomon",
    "Valentino",
    "Dr. Martens",
    "Fendi",
    "Off-White",
    "Acne Studios",
    "Bottega Veneta",
    "Converse",
    "Vetements",
    "Isabel Marant",
    "Hermès",
    "Givenchy",
    "Yeezy",
    "Gucci",
    "Brooks",
    "Burberry",
  ];
  const fabrics = [
    "Organza",
    "Silk",
    "Georgette",
    "Corduroy",
    "Lace",
    "Nylon",
    "Satin",
    "Wool",
    "Velvet",
    "Leather",
    "Fleece",
    "Poplin",
    "Taffeta",
    "Flannel",
    "Tweed",
    "Voile",
    "Denim",
    "Muslin",
    "Brocade",
    "Chambray",
    "Spandex",
    "Hemp",
    "Broadcloth",
    "Cashmere",
    "Batiste",
    "Jacquard",
    "Cotton",
    "Rayon",
    "Chiffon",
    "Polyester",
    "Linen",
    "Canvas",
    "Seersucker",
    "Crepe",
  ];
  const designers = [
    "Alexander McQueen",
    "Diane von Fürstenberg",
    "Issey Miyake",
    "Riccardo Tisci",
    "Marc Jacobs",
    "Balenciaga",
    "Michael Kors",
    "Vera Gucci",
    "Jonathan Anderson",
    "Karl Lagerfeld",
    "Chloé",
    "Miu Miu",
    "Phoebe Philo",
    "Donatella Versace",
    "Calvin Klein",
    "Jil Sander",
    "Rei Kawakubo",
    "Junya Watanabe",
    "Giorgio Armani",
    "Jimmy Choo",
    "Thom Browne",
    "Maison Margiela",
    "Tom Ford",
    "Versace",
    "Azzedine Alaïa",
    "Rick Owens",
    "Marni",
    "Jacquemus",
    "Christian Dior",
    "Mary-Kate and Ashley Olsen",
    "Stella McCartney",
    "Prada",
    "Roberto Cavalli",
    "Virgil Abloh",
    "Valentino Garavani",
    "Ralph Lauren",
    "Oscar de la Renta",
    "Tory Burch",
    "Demna Gvasalia",
    "Fendi",
    "Alber Elbaz",
    "Louis Vuitton",
    "Yves Saint Laurent",
    "Dolce & Gabbana",
    "Coco Chanel",
    "Hermès",
    "Givenchy",
    "Gucci",
    "Jean Paul Gaultier",
    "Burberry",
    "Donna Karan",
  ];
  const colorful_foods = [
    "Rhubarb color",
    "Butternut squash color",
    "Radish color",
    "Strawberry color",
    "Sweet potato color",
    "Thyme color",
    "Beet color",
    "Honeydew melon color",
    "Blueberry color",
    "Lemon color",
    "Endive color",
    "Apricot color",
    "Pomegranate color",
    "Broccoli color",
    "Green pea color",
    "Tangerine color",
    "Green bean color",
    "Yellow tomato color",
    "Pineapple color",
    "Pepper color",
    "Plum color",
    "Green apple color",
    "Fig color",
    "Blackberry color",
    "Red cabbage color",
    "Tomato color",
    "Cherry color",
    "Papaya color",
    "Arugula color",
    "Turmeric color",
    "Kale color",
    "Chili pepper color",
    "Mango color",
    "Yellow bell pepper color",
    "Peach color",
    "Red pepper color",
    "Orange color",
    "Red apple color",
    "Turnip color",
    "Garlic color",
    "Pear color",
    "Watermelon color",
    "Raspberry color",
    "Cantaloupe color",
    "Okra color",
    "Lime color",
    "Clementine color",
    "Acai color",
    "Red onion color",
    "Parsley color",
    "Purple potato color",
    "Lavender color",
    "Cucumber color",
    "Purple carrot color",
    "Potato color",
    "Eggplant color",
    "Guava color",
    "Ginger color",
    "Grapefruit color",
    "Pumpkin color",
    "Carrot color",
    "Persimmon color",
    "Rosemary color",
    "Spinach color",
    "Passion fruit color",
    "Yellow squash color",
    "Jalapeno pepper color",
    "Cranberry color",
    "Sage color",
    "Bell pepper color",
    "Kiwi color",
    "Purple cabbage color",
    "Mint color",
    "Nectarine color",
    "Yellow apple color",
    "Grape color",
    "Zucchini color",
  ];
  const types = [
    "Running Shoes",
    "Desert Boots",
    "Hiking Boots",
    "Penny Loafers",
    "Spectator Shoes",
    "Slip-on Shoes",
    "Firefighter Boots",
    "Volleyball Shoes",
    "Soccer Cleats",
    "Boxing Shoes",
    "Weightlifting Shoes",
    "Clogs",
    "Mountaineering Boots",
    "Ballet Flats",
    "Wrestling Shoes",
    "Snow Boots",
    "Boat Shoes",
    "Trail Running Shoes",
    "Police Boots",
    "Cowboy Boots",
    "Oxfords",
    "Safety Shoes",
    "Tennis Shoes",
    "Rain Boots",
    "Sandals",
    "Cross Training Shoes",
    "Electrician Boots",
    "Flip-flops",
    "Skateboarding Shoes",
    "Chukka Boots",
    "Football Cleats",
    "Walking Shoes",
    "Mechanic Shoes",
    "Military Boots",
    "Derby Shoes",
    "Hiking Shoes",
    "Golf Shoes",
    "Cycling Shoes",
    "Nursing Shoes",
    "Loafers",
    "Combat Boots",
    "Espadrilles",
    "Baseball Cleats",
    "Basketball Shoes",
    "Horse Riding Boots",
    "Moccasins",
    "Wingtip Shoes",
    "Slides",
    "Mules",
    "Chef Shoes",
    "Monk Shoes",
    "Chelsea Boots",
    "Construction Boots",
    "Logger Boots",
    "Saddle Shoes",
  ];
  const stitches = [
    "Buttonhole Stitch",
    "Japanese Ribbon Stitch",
    "Cross Stitch",
    "Honeycomb Couching",
    "Lattice Stitch",
    "Satin Stitch",
    "Colonial Knot",
    "French Knot",
    "Drizzle Stitch",
    "Pistil Stitch",
    "Raised Chain Band",
    "Raised Fishbone Stitch",
    "Long and Short Buttonhole Stitch",
    "Fly Stitch",
    "Raised Satin Stitch",
    "French Knot Rose",
    "Whip Stitch",
    "Roumanian Couching",
    "Split Stitch",
    "Wheat Ear Stitch",
    "Running Stitch",
    "Rope Stitch",
    "Blanket Stitch",
    "Scalloped Buttonhole Stitch",
    "Embroidery",
    "Rosette Chain Stitch",
    "Pekinese Stitch",
    "Herringbone Stitch",
    "Long and Short Stitch",
    "Bullion Stitch",
    "Backstitch",
    "Stem Stitch",
    "Seed Stitch",
    "Oyster Stitch",
    "Lazy Daisy Stitch",
    "Fern Stitch",
    "Fishbone Stitch",
    "Bullion Knot Stitch",
    "Coral Stitch",
    "Chain Stitch",
    "Cretan Stitch",
    "Spider Web Stitch",
    "Woven Wheel Stitch",
    "Bokhara Couching",
    "Couching Stitch",
    "Feather Stitch",
  ];
  const clothing_patterns = [
    "Vintage",
    "Geometric",
    "Damask",
    "Stripes",
    "Floral",
    "Tropical",
    "Scribble Print",
    "Grid",
    "Camo",
    "Camouflage",
    "Houndstooth",
    "Mosaic",
    "Tribal",
    "Polka Dot",
    "Tartan",
    "Gingham",
    "Retro",
    "Watercolor",
    "Herringbone",
    "Plaid",
    "Chevron",
    "Abstract",
    "Pinstripe",
    "Starry Night",
    "Ikat",
    "Marble",
    "Animal Print",
    "Pop Art",
    "Paisley",
    "Cracked Ice",
    "Psychedelic",
    "Tattoo Print",
    "Galaxy",
    "Zigzag",
    "Patchwork",
    "Ombre",
    "Argyle",
    "Digital Print",
    "Checkerboard",
    "Tie-dye",
    "Leopard Print",
  ];

  const [brandKeys, setBrandKeys] = useState([]);
  const [fabricKeys, setFabricKeys] = useState([]);
  const [designerKeys, setDesignerKeys] = useState([]);
  const [colorfulFoodKeys, setColorfulFoodKeys] = useState([]);
  const [typeKeys, setTypeKeys] = useState([]);
  const [stitchesKeys, setStitchesKeys] = useState([]);
  const [clothingPatternsKeys, setClothingPatternsKeys] = useState([]);

  const handleGenerateRandomShoePrompt = () => {
    const shoe_brand = brands[Math.floor(Math.random() * brands.length)];
    setBrandKeys([shoe_brand]);

    const shoe_fabric = fabrics[Math.floor(Math.random() * fabrics.length)];
    setFabricKeys([shoe_fabric]);

    const designer = designers[Math.floor(Math.random() * designers.length)];
    setDesignerKeys([designer]);

    const colorful_food =
      colorful_foods[Math.floor(Math.random() * colorful_foods.length)] +
      " color";
    setColorfulFoodKeys([colorful_food]);

    const shoe_type = types[Math.floor(Math.random() * types.length)];
    setTypeKeys([shoe_type]);

    const stitch = stitches[Math.floor(Math.random() * stitches.length)];
    setStitchesKeys([stitch]);

    const clothing_pattern =
      clothing_patterns[Math.floor(Math.random() * clothing_patterns.length)];
    setClothingPatternsKeys([clothing_pattern]);
  };

  const generatedPrompt =
    "Close-up shot, Focus on " +
    brandKeys.join(", ") +
    ", " +
    fabricKeys.join(", ") +
    ", " +
    designerKeys.join(", ") +
    ", " +
    colorfulFoodKeys.join(", ") +
    ", " +
    typeKeys.join(", ") +
    ", " +
    stitchesKeys.join(", ") +
    ", " +
    clothingPatternsKeys.join(", ");

  useEffect(() => {
    setPrompt(generatedPrompt);
  }, [generatedPrompt]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files[0];
    setInputFile(file);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleNegativePromptChange = (e) => {
    setNegativePrompt(e.target.value);
  };

  const handleTextToImageSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await socketRequest("imagine", {
      prompt,
    }).catch((err) => {
      console.log(err);
    });

    // try {
    //   const response = await fetch(`/api/midjourney`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       prompt,
    //     }),
    //   });

    //   if (response.ok) {
    //     const eventSource = new EventSource("/api/midjourney");

    //     eventSource.onmessage = (event) => {
    //       console.log(event);
    //       const message = event.data;
    //       // Handle the received partial message
    //       console.log(message);
    //       // Check if it's the final message
    //       if (message === "Final message") {
    //         setImage(message);
    //         eventSource.close();
    //       } else {
    //         console.log(message.data);
    //       }
    //     };

    //     eventSource.onerror = (error) => {
    //       // Handle SSE connection error
    //     };
    //   } else {
    //     // Handle API route error
    //   }
    // } catch (error) {
    //   // Handle fetch error
    // }

    // try {
    //   const res = await fetch(`https://206.81.11.40/midjourney`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ prompt }),
    //   });

    //   if (!res.ok) {
    //     const errorData: ErrorResponse = await res.json();
    //     throw new Error(errorData.message);
    //   }

    //   const data = await res.json();
    //   console.log(data);
    //   if (data.status === "success") {
    //     setImage(data.imageURL);
    //   } else {
    //     toast.error("Error, Try again");
    //   }
    // } catch (error) {
    //   setError(error.message);
    // }

    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-start justify-start">
        <div className="mt-10 w-full md:w-full">
          <div className="flex w-full flex-col p-4 md:p-5">
            <label className="mb-4 text-2xl font-semibold text-white">
              Generate Shoes
            </label>

            <div className="flex w-full flex-col lg:flex-row">
              <div className="w-full">
                <div className="min-h-96 collapse p-0">
                  <div className=" p-0">
                    <InputComponent
                      title={"Shoe Brand"}
                      keywords={brands}
                      preSelectedKeywords={brandKeys}
                      setKeywords={setBrandKeys}
                    />

                    <InputComponent
                      title={"Shoe Fabrics"}
                      keywords={fabrics}
                      preSelectedKeywords={fabricKeys}
                      setKeywords={setFabricKeys}
                    />

                    <InputComponent
                      title={"Designers"}
                      keywords={designers}
                      preSelectedKeywords={designerKeys}
                      setKeywords={setDesignerKeys}
                    />
                    <InputComponent
                      title={"Colorful Foods"}
                      keywords={colorful_foods}
                      preSelectedKeywords={colorfulFoodKeys}
                      setKeywords={setColorfulFoodKeys}
                    />
                    <InputComponent
                      title={"Types"}
                      keywords={types}
                      preSelectedKeywords={typeKeys}
                      setKeywords={setTypeKeys}
                    />
                    <InputComponent
                      title={"Stitches"}
                      keywords={stitches}
                      preSelectedKeywords={stitchesKeys}
                      setKeywords={setStitchesKeys}
                    />

                    <InputComponent
                      title={"Clothing Patterns"}
                      keywords={clothing_patterns}
                      preSelectedKeywords={clothingPatternsKeys}
                      setKeywords={setClothingPatternsKeys}
                    />
                  </div>

                  <button
                    onClick={handleGenerateRandomShoePrompt}
                    className="btn-secondary btn  flex w-fit normal-case"
                  >
                    Inspire
                  </button>

                  <div className="divider"></div>
                  <label className="text-lg font-semibold text-white">
                    Prompt
                  </label>
                  <textarea
                    className="textarea-bordered textarea flex w-full flex-auto border border-neutral-700 bg-black p-2 text-base font-medium text-white "
                    rows={5}
                    placeholder="Enter prompt here..."
                    value={prompt}
                    onChange={handlePromptChange}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleTextToImageSubmit}
              className="btn-secondary btn-lg btn mt-6 flex w-full normal-case"
              disabled={isLoading}
            >
              Generate
            </button>
            {isLoading ? (
              <input
                type="range"
                min={0}
                max="100"
                value={progress}
                className="range range-md mt-5 cursor-default"
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="my-10 flex flex-col items-center justify-center p-4">
        {isLoading ? (
          <>
            <span className="loading-bars loading-lg loading"></span>
          </>
        ) : (
          <>
            {image ? (
              <div className="flex items-center justify-center border border-neutral-500 bg-black p-1">
                <img
                  src={image}
                  alt="My Image"
                  className="h-96 w-full object-cover md:h-96 lg:h-full"
                  sizes="(max-width: 639px) 640px, (max-width: 1023px) 1024px, 1600px"
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
