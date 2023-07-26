export const addHasakesitanLayer = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("ganhan_hasakesitan", {
      type: "image",
      url: require("./result/hasakesitan/2018-1.png"),
      coordinates: [
        [43.802653914196884, 61.39570470387841],
        [90.20454083769284, 61.39570470387841],
        [90.20454083769284, 30.78581128872647],
        [43.802653914196884, 30.78581128872647],
      ],
    });
    resultMap.addLayer({
      id: "ganhan_hasakesitan_layer",
      type: "raster",
      source: "ganhan_hasakesitan",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};

export const addXinJiangLayer = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("ganhan_xinjiang", {
      type: "image",
      url: require("./result/xinjiang/2018-1.png"),
      coordinates: [
        [72.5, 50.1407948645123],
        [97.43846412060706, 50.1407948645123],
        [97.43846412060706, 32.505247144540155],
        [72.5, 32.505247144540155],
      ],
    });
    resultMap.addLayer({
      id: "ganhan_xingjiang_layer",
      type: "raster",
      source: "ganhan_xinjiang",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  });
};
