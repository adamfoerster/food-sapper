import { writable, get, Writable } from "svelte/store";
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
  const restaurants: Writable<IRestaurant[]> = writable([]);
  const _selectedRestaurant: Writable<IRestaurant> = writable({
    id: null,
    name: "",
    address: "",
    enabled: true,
    company: "bari"
  });
  _db = getFirebase().getDB();
  _restaurantsCollection = _db.collection("restaurants");

  const _getRestaurant = async (docId: string) => {
    const doc = await _restaurantsCollection.doc(docId).get();
    return { id: docId, ...doc.data() };
  };

  return {
    restaurants$: restaurants.subscribe,
    selectedRestaurant$: _selectedRestaurant.subscribe,
    getRestaurant: _getRestaurant,
    selectRestaurant: (restaurant: IRestaurant) => {
      console.log(restaurant);
      _selectedRestaurant.set(restaurant);
    },
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
    addRestaurant: async (restaurant: IRestaurant) => {
      await _restaurantsCollection.add({
        ...restaurant,
        enabled: true,
        company: "bari"
      });
      return true;
    },
    editRestaurant: async (restaurant: IRestaurant) => {
      await _restaurantsCollection
        .doc(restaurant.id)
        .set({ ...restaurant, enabled: true, company: "bari" });
      return true;
    },
    removeRestaurant: (id: string) => {}
  };
};
