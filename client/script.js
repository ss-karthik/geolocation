let tracking = false;
let trackingId;
const trackButton = document.querySelector('#tracker');
const latField = document.querySelector('#lat');
const longField = document.querySelector('#long');

trackButton.addEventListener("click", () => {
    tracking = !tracking;
    if (tracking) {
        trackButton.innerHTML = "Stop Tracking!";
        const urlToPost = 'http://localhost:3000/update-location'; 
        trackingId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(JSON.stringify({ latitude, longitude }));
                latField.innerHTML = `Latitude: ${JSON.stringify(latitude)}`;
                longField.innerHTML = `Longitude: ${JSON.stringify(longitude)}`;
                
                fetch(urlToPost, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitude, longitude })
                });
            },
            (error) => {
                console.error('Geolocation error:', error);
            },
            { enableHighAccuracy: true }
        );
    } else {
        trackButton.innerHTML = "Start Tracking!";
        navigator.geolocation.clearWatch(trackingId);
    }
});
