import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Accordion() {
  const [active, setActive] = useState(null); // Keeps track of the currently active accordion item (fact).
  const [facts, setFacts] = useState([]); // Holds the array of fetched random cat facts.
  const [hover, setHover] = useState(false); //in order to change logo when hover the item
  const [loading, setLoading] = useState(false); // Indicates whether data is being fetched or not.
  const [hoveredIndex, setHoveredIndex] = useState(null); //Stores the index of the currently hovered accordion item.
  const [showLine, setShowLine] = useState(false); // Manages the visibility of lines (background color change on hover).
  const [count, setCount] = useState(3); //for the last item you can change the number but you should add photos to "photos" array
  const photos = ["cat[1].jpg", "cat[2]webp.webp", "cat[3].png"]; //An array of cat images to display along with the facts.

  useEffect(() => {
    //for Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const url = "https://catfact.ninja/facts";
  useEffect(() => {
    //fetching
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFacts(data.data.slice(0, count)))
      .catch("error is:", Error);
  }, [active]);

  facts[count] = ["Logo.svg", "Logo2.svg"]; //last item

  const lines = []; //dividers for under each item
  for (let i = 0; i < facts.length; i++) {
    lines.push(
      <span className="w-[1000px] max-lg:w-[500px] h-[2px] bg-gega-green"></span>
    );
  }

  const handleActive = (index) => {
    setActive(index === active ? null : index);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setShowLine(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setShowLine(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!facts[count - 1] || loading ? (  //if data isn't ready Loader will continue to load
        <div className="flex items-center justify-center">
          <div className="relative">
            <MoonLoader color="#36d7b7" size={300} className="" />
            <div className="absolute top-24 left-24">
              <img src="Logo.svg" alt="" className="w-[200px] h-[200px] " />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-center mb-20">3 Random Cat facts</h1>
          {facts.map((fact, index) => (
            <div
              className="flex flex-col items-center cursor-pointer w-full"
              key={index}
            >
              <div
                className="w-full rounded-xl hover:bg-gega-bg duration-300"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {fact.fact == null && (    //if fact doesn't have fact, it means that it is logo item
                  <div
                    className="flex px-3 py-2 justify-center cursor-pointer w-full items-center"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    {hover ? (
                      <div className="">
                        <img
                          src="Logo2.svg"
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    ) : (
                      <div className="">
                        <img
                          src="Logo.svg"
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {fact.fact != null && (
                  <div
                    className="flex flex-row justify-between items-center w-full px-3 py-4"
                    onClick={() => handleActive(index)}
                  >
                    <p>0{index + 1}</p>
                    <p>
                      Click to
                      {active === index ? (   //when we click the div, "open" will change to "close"
                        <span> close </span>
                      ) : (
                        <span> open </span>
                      )}
                      fact
                    </p>
                    <p className="text-2xl">{active === index ? "-" : "+"}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-center items-center">
                {active === index && (
                  <div className="flex flex-row items-center w-[90%] mt-5">
                    <div className="max-w-[200px] mr-6">
                      <p>{fact.fact}</p>
                    </div>
                    <div className="w-full h-full">
                      <img
                        src={photos[index]}
                        alt=""
                        className="w-[300px] h-[200px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {showLine    //when the item is hovered over, it replaces the line of the element below and before it with a div tag
                ? ((lines[hoveredIndex] = <div></div>),   
                  (lines[hoveredIndex - 1] = <div></div>),
                  (lines[hoveredIndex + 1] = (
                    <div className="w-full h-[2px] bg-gega-green"></div>
                  )) && lines[index])
                : lines[index]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accordion;
