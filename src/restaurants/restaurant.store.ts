import { writable, get } from "svelte/store";
import { getFirebase } from "../common/firebase-auth";
import { IRestaurant } from "./restaurant.interfaces";

let _db = null;
let _restaurantsCollection = null;
let _restaurantStore = null;

export const getRestaurantStore = () => {
  if (!_restaurantStore) {
    _restaurantStore = createRestaurantStore();
  }
  return _restaurantStore;
};

const createRestaurantStore = () => {
  const restaurants = writable([]);
  _db = getFirebase().getDB();
  _restaurantsCollection = _db.collection("restaurants");

  const _getRestaurant = async (docId: string) => {
    const doc = await _restaurantsCollection.doc(docId).get();
    return { id: docId, ...doc.data() };
  };

  return {
    restaurants$: restaurants.subscribe,
    selectedRestaurant$: restaurants.subscribe,
    getRestaurant: _getRestaurant,
    listAllRestaurants: async (companyId: string) => {
      const restaurantsCol = await _restaurantsCollection
        .where("company", "==", "bari")
        .get();
      let rests: IRestaurant[] = [];
      for (let snapshot of restaurantsCol.docs) {
        rests.push(await _getRestaurant(snapshot.id));
      }
      restaurants.set(rests);
    },
    addRestaurant: (restaurant: IRestaurant) => {},
    editRestaurant: (id: string, restaurant: IRestaurant) => {},
    removeRestaurant: (id: string) => {}
  };
};
