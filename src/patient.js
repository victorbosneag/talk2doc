const axios = require('./axios');

console.log('test');
//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');
$(document).ready(function() {
    $('submit-checkIn-btn').on('click', function(e) {
        console.log('submit clicked');
        /*
        const sendInfo = async () => {
            const promsie = await axios({
                method: 'post',
                url: '...'
            });
        }
        sendInfo();
        */
    })
})
