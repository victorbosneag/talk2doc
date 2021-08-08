// const axios = require('./axios');

var symptomsDict = {

}




console.log('test');
//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');
$(document).ready(function() {
    $('#submit-checkIn-btn').on('click', function(e) {
        /*
        const sendInfo = async () => {
            const promsie = await axios({
                method: 'post',
                url: '...'
            });
        }
        sendInfo();
        */
        var symptoms = ["Fever/chills", "Cough", "Loss of taste/smell", "Shortness of breath", "Fatigue", "Muscle/body aches", "Headaches", "Sore throat", "Congestion/runny nose", "Nausea", "Diarrhea"]
        var severities = []
        
        for(var i = 0; i < symptoms.length; i++){
            severities.push(0);
        }
    
        
        $("input.severity").each(function(i, obj) {
            if($(this).val() != ""){
                severities[i] = $(this).val();
            }
        });

        console.log(severities.toString());
    });
});
