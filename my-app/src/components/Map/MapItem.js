import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for the items on the map
const itemIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/007bff/marker.png', // URL for the item icon
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [10, 20], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const MapItem = () => {
    const mapRef = useRef(null);
    const [address, setAddress] = useState('');
    const [items, setItems] = useState([]); // Array to hold item locations
    const [currentAddress, setCurrentAddress] = useState(''); // State to hold the current address
    const [showInputPopup, setShowInputPopup] = useState(false); // State to control the popup visibility
    const [inputAddress, setInputAddress] = useState(''); // State to hold the user input address
    const [inputName, setInputName] = useState(''); // State to hold the user input name
    const [showAddressDiv, setShowAddressDiv] = useState(false); // New state to control address div visibility
    const [markerAddress, setMarkerAddress] = useState(''); // New state to hold the address of the clicked marker
    const [savedItems, setSavedItems] = useState([]); // New state to hold saved items

    useEffect(() => {
        // Initialize the map
        mapRef.current = L.map('map', {
            center: [51.505, -0.09], // Default center
            zoom: 13,
        });

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current);

        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Center the map on user location
                    mapRef.current.setView([latitude, longitude], 13);

                    // Define the icons
                    const userIcon = L.icon({
                        iconUrl: 'https://img.icons8.com/ios-filled/50/007bff/user.png', // User icon for current location
                        iconSize: [20, 20], // Updated size of the icon
                        iconAnchor: [10, 20], // Updated anchor point of the icon
                        popupAnchor: [0, -20], // Adjusted to move the popup higher above the icon
                    });

                    const markerIcon = L.icon({
                        iconUrl: 'https://img.icons8.com/ios-filled/50/007bff/marker.png', // Default marker icon
                        iconSize: [20, 20], // Updated size of the icon
                        iconAnchor: [10, 20], // Updated anchor point of the icon
                    });

                    // Add a marker for the user's location with the user icon
                    const userMarker = L.marker([latitude, longitude], { icon: userIcon })
                        .addTo(mapRef.current);

                    // Fetch the Current address when userMarker is clicked (using Nominatim API)
                    userMarker.on('click', () => {
                        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                            .then(response => response.json())
                            .then(data => {
                                if (data && data.display_name) {
                                    setCurrentAddress(data.display_name); // Set the current place name
                                    const markerPopupContent = `You Are Here`; 
                                    // const markerPopupContent = `You Are Here<br>${data.display_name}`; // Update popup content with the fetched address
                                    userMarker.bindPopup(markerPopupContent); // Bind the updated content to the marker popup
                                    userMarker.openPopup(); // Open the popup on marker click
                                } else {
                                    setCurrentAddress('Address not found');
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching address: ", error);
                                setCurrentAddress('Error fetching address');
                            });
                    });

                    // Example items (ensure unique IDs)
                    const placeItems = []; // Now an empty array
                    setItems(placeItems);

                    // Add other markers using the default marker icon
                    const otherLocations = placeItems; // Use placeItems as otherLocations
                    otherLocations.forEach(location => {
                        L.marker([location.lat, location.lon], { icon: markerIcon })
                            .addTo(mapRef.current)
                            .bindPopup(location.name);
                    });
                },
                (error) => {
                    console.error("Error getting user location: ", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        // Event listener to close address div on outside click
        const handleClickOutside = (event) => {
            const addressDiv = document.getElementById('address-div');
            if (addressDiv && !addressDiv.contains(event.target)) {
                setCurrentAddress(''); // Hide current address
                setMarkerAddress(''); // Hide marker address
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        // Fetch saved items from the database on component mount
        fetch('https://71a0-2001-f40-970-254a-8481-ad99-4d93-bcea.ngrok-free.app/test/addresses', {
            headers: {
                'ngrok-skip-browser-warning': 'true' // Bypass the ngrok warning page
            }
        }) // Adjust the endpoint as necessary
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data); // Check if data is retrieved correctly
                setSavedItems(data); // Set the saved items state
                data.forEach(item => {
                    const marker = L.marker([item.lat, item.lon], { icon: itemIcon }) // Use itemIcon for saved markers
                        .addTo(mapRef.current)
                        .bindPopup(
                            `<div>${item.name}</div>
                            <button id="delete-button-${item.id}">Delete</button>` // Add delete button with a unique ID
                        ) // Bind the name to the marker popup
                        .on('click', () => {
                            setMarkerAddress(item.address); // Set the address of the clicked marker
                            setShowAddressDiv(true); // Show the address div when marker is clicked

                            // Add event listener for the delete button inside the marker click handler
                            const deleteButton = document.getElementById(`delete-button-${item.id}`);
                            if (deleteButton) {
                                deleteButton.addEventListener('click', (e) => {
                                    e.preventDefault(); // Prevent the popup from closing
                                    e.stopPropagation(); // Stop the click event from bubbling up to the marker
                                    console.log("Delete button is pressed"); // Log when delete button is pressed
                                    handleMarkerDelete(item._id, marker); // Pass the marker to the delete function
                                });
                            }
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching saved items: ", error);
            });
    }, []);

    // Update the currentAddress and markerAddress state when a new address is set
    useEffect(() => {
        if (currentAddress) {
            setMarkerAddress(''); // Clear marker address when current address is updated
        }
    }, [currentAddress]);

    // Submit button clicked, marker created and info saved to db
    const handleAddressSubmit = () => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputAddress)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const { lat, lon } = data[0]; // Get the first result
                    mapRef.current.setView([lat, lon], 13); // Center the map on the new location
                    const newMarker = L.marker([lat, lon], { icon: itemIcon }).addTo(mapRef.current); // Add a marker with the name
                    const markerPopupContent = `${inputName}`; 
                    newMarker.bindPopup(markerPopupContent); // Bind the combined content to the marker popup
                    newMarker.on('click', () => {
                        newMarker.openPopup(); // Open the popup on marker click
                        setMarkerAddress(data[0].display_name); // Set the address of the clicked marker
                        setShowAddressDiv(true); // Show the address div when marker is clicked
                    });

                    // Send data to the backend db
                    fetch('https://71a0-2001-f40-970-254a-8481-ad99-4d93-bcea.ngrok-free.app/test/addresses', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            name: inputName, // Ensure name is included
                            address: data[0].display_name, // Ensure address is included
                            lat: lat, // Ensure latitude is included
                            lon: lon // Ensure longitude is included
                        }), // Include lat and lon
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(result => {
                        console.log(result.message); // Print success message
                        alert(result.message); // Alert success message
                    })
                    .catch(error => {
                        console.error("Error saving address: ", error);
                        alert('Error saving address');
                    });

                    setInputAddress(''); // Clear the input
                    setInputName(''); // Clear the name input
                    setShowInputPopup(false); // Close the popup
                } else {
                    alert('Address not found');
                }
            })
            .catch(error => {
                console.error("Error fetching address: ", error);
                alert('Error fetching address');
            });
    };

    // Function to handle marker deletion
    const handleMarkerDelete = async (id, marker) => {
        console.log(`Attempting to delete address with ID: ${id}`); // Log the ID
        const url = `https://71a0-2001-f40-970-254a-8481-ad99-4d93-bcea.ngrok-free.app/test/addresses/${id}`; // Ensure the correct backend URL
        console.log(`Trying to DELETE at: ${url}`); // Log the full URL
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove the marker from the map
            marker.remove();
            alert('Address deleted successfully');
        } catch (error) {
            console.error("Error deleting address: ", error);
            alert('Error deleting address');
        }
    };

    return (
        <div>
            {/* User Input */}
            {showInputPopup && (
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', zIndex: 1000 }}>
                    <h3>Enter Address</h3>
                    <input 
                        type="text" 
                        value={inputName} 
                        onChange={(e) => setInputName(e.target.value)} 
                        placeholder="Enter name" 
                        style={{ width: '100%', marginBottom: '10px' }} 
                    />
                    <input 
                        type="text" 
                        value={inputAddress} 
                        onChange={(e) => setInputAddress(e.target.value)} 
                        placeholder="Enter address" 
                        style={{ width: '100%', marginBottom: '10px' }} 
                    />
                    <button onClick={handleAddressSubmit}>Submit</button>
                    <button onClick={() => setShowInputPopup(false)}>Cancel</button>
                </div>
            )}
            <button onClick={() => setShowInputPopup(true)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>Add Address</button>
            {/* Uppermost pop up Display current address */}
            {currentAddress && ( // Display the current address
                <div id="address-div" style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
                    padding: '15px', 
                    border: '1px solid #ccc', // Lighter border color
                    borderRadius: '8px', // More rounded corners
                    zIndex: 1000, 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                    display: 'flex', // Use flexbox for layout
                    justifyContent: 'center', // Center the address text
                    alignItems: 'center' // Center items vertically
                }}>
                    <strong>{currentAddress}</strong> 
                </div>
            )}
            {/* Other placeItem pop up Display current address */}
            {markerAddress && ( // Display the current address
                <div id="address-div" style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    background: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
                    padding: '15px', 
                    border: '1px solid #ccc', // Lighter border color
                    borderRadius: '8px', // More rounded corners
                    zIndex: 1000, 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                    display: 'flex', // Use flexbox for layout
                    justifyContent: 'center', // Center the address text
                    alignItems: 'center' // Center items vertically
                }}>
                    <strong>{markerAddress}</strong> 
                </div>
            )}
            
            <div style={{ height: '100vh', width: '100%' }}>
                <div id="map" style={{ height: '100%', width: '100%' }}></div>
            </div>
        </div>
    );
};

export default MapItem;