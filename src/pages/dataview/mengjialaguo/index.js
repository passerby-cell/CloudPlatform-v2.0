export const addMengjialaguoLayer = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("road", {
      type: "image",
      url: require("./guadaer.png"),
      coordinates: [
        [72.81897900758375, 18.97891135781917],
        [72.81811573553242, 18.95836545547479],
        [72.83931386033453, 18.958184023426412],
        [72.83931386033453, 18.978820652999744],
      ],
    });
    resultMap.addLayer({
      id: "road-layer",
      type: "raster",
      source: "road",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};
