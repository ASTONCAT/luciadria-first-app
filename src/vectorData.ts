import {FeatureLayer} from "@luciad/ria/view/feature/FeatureLayer";
import {FeatureModel} from "@luciad/ria/model/feature/FeatureModel";
import {LayerType} from "@luciad/ria/view/LayerType";
import {Map} from "@luciad/ria/view/Map";
import {WFSFeatureStore} from "@luciad/ria/model/store/WFSFeatureStore";
 
export function createCitiesLayer(map: Map) {
  const url = "https://sampleservices.luciad.com/wfs";
  const featureTypeName = "cities";
  // Create a WFS store
  return WFSFeatureStore.createFromURL(url, featureTypeName).then(
      (wfsStore: WFSFeatureStore) => {
        // Create a feature model
        const featureModel = new FeatureModel(wfsStore);
 
        // Create a feature layer
        const featureLayer = new FeatureLayer(featureModel, {
          label: "US Cities",
          layerType: LayerType.STATIC
        });
 
        // Add a layer to the map
        map.layerTree.addChild(featureLayer);
      });
}