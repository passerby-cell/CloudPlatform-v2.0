export const mengjialaguo_after = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("mengjialaguo_after", {
      type: "image",
      url: require("./mengjialaguo_after.png"),
      coordinates: [
        [89.5984983005694, 23.9493358153192],
        [90.2388330069639, 23.9493358153192],
        [90.2388330069639, 23.3237343611658],
        [89.5984983005694, 23.3237343611658],
      ],
    });
    resultMap.addLayer({
      id: "mengjialaguo_after-layer",
      type: "raster",
      source: "mengjialaguo_after",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};

export const mengjialaguo_before = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("mengjialaguo_before", {
      type: "image",
      url: require("./mengjialaguo_before.png"),
      coordinates: [
        [89.5984983005694, 23.9493358153192],
        [90.2388330069639, 23.9493358153192],
        [90.2388330069639, 23.3237343611658],
        [89.5984983005694, 23.3237343611658],
      ],
    });
    resultMap.addLayer({
      id: "mengjialaguo_before-layer",
      type: "raster",
      source: "mengjialaguo_before",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};
