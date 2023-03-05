import "./license-loader";
import {Map} from "@luciad/ria/view/Map";
import {WMSTileSetModel}  from "@luciad/ria/model/tileset/WMSTileSetModel";
import {RasterTileSetLayer} from "@luciad/ria/view/tileset/RasterTileSetLayer";
import {createCitiesLayer} from "./vectorData";

//Create a new map instance, and display it in the div with the "map" ID
const map = new Map("map");

//Add some WMS data to the map
const server = "https://sampleservices.luciad.com/wms";
const dataSetName = "4ceea49c-3e7c-4e2d-973d-c608fb2fb07e";
WMSTileSetModel.createFromURL(server, [{layer: dataSetName}])
.then(model => {
  //Once the data is available, create a layer for it
  const layer = new RasterTileSetLayer(model);
  //and add the layer to the map
  map.layerTree.addChild(layer);
});

createCitiesLayer(map);