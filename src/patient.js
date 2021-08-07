//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');

$(document).ready(function() {
    $('#submit-checkIn-btn').on('click', function(e) {
        //console.log('submit clicked');
        
        const sendInfo = async () => {
            const promise = await createAxios({
                method: 'post',
                url: '/tester/create',
                data: {
                    firstName: 'fred',
                    lastName: 'li'
                }
            });
            //console.log(promise);
        }
        sendInfo();
    })
})
