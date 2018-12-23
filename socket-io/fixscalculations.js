function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
const distance1 = getDistanceFromLatLonInKm(25.083326, 67.012554, lat2, lng2);//for hu alert
const distance2 = getDistanceFromLatLonInKm(25.074447, 67.013600, lat2, lng2);//for nothrenbypass alert
if (distance1 <= 0.02880746058673089 || distance2 <= 0.02880746058673089) {
    console.log('send notification');
}