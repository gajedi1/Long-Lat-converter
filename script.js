document.getElementById('coords').addEventListener('submit', function (e) {
    e.preventDefault();

    const lat = document.getElementById('lattitude').value;
    const lng = document.getElementById('longitude').value;

    if (!lat || !lng) {
        document.getElementById('print').innerText = "Input both Long-Lat";
        return;
    }
    document.getElementById('buffer').style.display = 'block';
    document.getElementById('print').innerText = '';

    const apiKey = 'c0036066518f432f8eb24d2fa569c825'; 
    var query = lat + ',' + lng;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json';

    var geocodeUrl = api_url
        + '?'
        + 'key=' + apiKey
        + '&q=' + encodeURIComponent(query)
        + '&pretty=1'
        + '&no_annotations=1';
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('buffer').style.display = 'none';
            if (data.results && data.results.length > 0) {
                const location = data.results[0].formatted;
                document.getElementById('print').innerText = `Location: ${location}`;
            } else {
                document.getElementById('print').innerText = "Location not found.";
            }
        })
        
        .catch(error => {
            document.getElementById('buffer').style.display = 'none';
            document.getElementById('print').innerText = "Error fetching location.";
            console.error(error);
        });
});
