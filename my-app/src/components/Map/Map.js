import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for the user's location (blue person icon)
const userIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/007bff/user.png', // URL for the blue person icon
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [10, 20], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const Map = () => {
    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const [address, setAddress] = useState('');

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
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Update user marker
                    if (userMarkerRef.current) {
                        userMarkerRef.current.setLatLng([latitude, longitude]);
                    } else {
                        userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
                            .addTo(mapRef.current)
                            .bindPopup(
                                `<div>
                                    <span style="cursor: pointer; color: blue; text-decoration: underline;" id="location-info">You Are Here</span>
                                </div>`
                            ) // Add clickable text
                            .openPopup(); // Open the popup immediately

                        // Add event listener for the clickable text
                        userMarkerRef.current.on('popupopen', () => {
                            const locationInfo = document.getElementById('location-info');
                            if (locationInfo) {
                                locationInfo.onclick = () => {
                                    // Fetch the address using Nominatim API
                                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(data.display_name); // Log the location info to the console
                                            if (data && data.display_name) {
                                                setAddress(data.display_name); // Set the address in state
                                            } else {
                                                setAddress('Address not found');
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Error fetching address: ", error);
                                            setAddress('Error fetching address');
                                        });
                                };
                            }
                        });
                    }

                    // Center the map on user location
                    mapRef.current.setView([latitude, longitude], 13);
                },
                (error) => {
                    console.error("Error getting user location: ", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        // Cleanup on component unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
            <div style={{ padding: '10px' }}>
                <strong>Current Location Address:</strong>
                <textarea value={address} readOnly style={{ width: '100%', height: '60px' }} />
            </div>
        </div>
    );
};

export default Map;
