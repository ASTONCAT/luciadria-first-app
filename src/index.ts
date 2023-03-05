import "./license-loader";
import {WebGLMap} from "@luciad/ria/view/WebGLMap";
import {WMSTileSetModel}  from "@luciad/ria/model/tileset/WMSTileSetModel";
import {RasterTileSetLayer} from "@luciad/ria/view/tileset/RasterTileSetLayer";
import {getReference} from "@luciad/ria/reference/ReferenceProvider";
import {FusionTileSetModel} from "@luciad/ria/model/tileset/FusionTileSetModel";
 
// Create a 3D Map
const mapReference = getReference("EPSG:4978");
const map = new WebGLMap("map", {reference: mapReference});

// Add image data
const server = "https://sampleservices.luciad.com/wms";
const dataSetName = "4ceea49c-3e7c-4e2d-973d-c608fb2fb07e";

// Note: A dataset an a WMS server is called a "layer", not to be confused with a layer on the LuciadRIA Map.
WMSTileSetModel.createFromURL(server, [{layer: dataSetName}])
.then(model => {
  // Once the data is available, create a layer for it
  const wmsLayer = new RasterTileSetLayer(model);
  // Add the layer to the map
  map.layerTree.addChild(wmsLayer, "top");
});

// Add elevation data
const elevationServer = "https://sampleservices.luciad.com/lts";
const elevationCoverage = "e8f28a35-0e8c-4210-b2e8-e5d4333824ec";
 
FusionTileSetModel.createFromURL(elevationServer, elevationCoverage)
    .then(function(model) {
      const elevationLayer = new RasterTileSetLayer(model, {
        label: "Elevation"
      });
      map.layerTree.addChild(elevationLayer);
    });