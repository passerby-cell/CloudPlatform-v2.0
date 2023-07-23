export const addHasakesitanLayer = (resultMap) => {
  resultMap.on("load", () => {
    resultMap.addSource("ganhan_hasakesitan", {
      type: "image",
      url: require("./result/hasakesitan/2018-1.png"),
      coordinates: [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936],
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
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936],
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
