import { db } from '../../firebase'; // Import Firestore instance

// Function to save address to Firestore
export const saveAddressToFirestore = async (name, address, lat, lon) => {
    try {
        await db.collection('User123-Places').add({
            name: name,
            address: address,
            lat: lat,
            lon: lon
        });
        console.log('Document successfully written!');
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Rethrow the error to handle it in MapItem.js
    }
};
