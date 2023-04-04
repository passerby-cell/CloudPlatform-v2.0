export const addGuadaerLayer = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("guadeerresult", {
      type: "image",
      url: require("./guadaer.png"),
      coordinates: [
        [62.310005117853564, 25.144126930107788],
        [62.357970339633596, 25.144126930107788],
        [62.357970339633596, 25.101741696535625],
        [62.310005117853564, 25.101741696535625],
      ],
    });
    resultMap.addLayer({
      id: "road-layer",
      type: "raster",
      source: "guadeerresult",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};
