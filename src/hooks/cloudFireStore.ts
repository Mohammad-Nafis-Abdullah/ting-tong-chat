import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { cloudDb } from "../firebase.init";

// get data by passing the collection name
export const getCloudStoreData = async (collectionName: string) => {
      const querySnapshot = await getDocs(collection(cloudDb, collectionName));
      return querySnapshot;
};


// get data from a collection with query
export const getCloudStoreSingleData = async (collectionName:string,id:string)=> {
    const docRef = doc(cloudDb,collectionName,id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
      return null
    }
}


// post data to a collection
export const setCloudStoreData = async <T extends { id: string }>(
    collectionName: string,
    data: T
) => {
    /* try {
        const docRef = await addDoc(collection(cloudDb, collectionName, data.id), data);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
    } */
    const result = await setDoc(doc(cloudDb, collectionName, data.id), data);
    return result;
};
