//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');

$(document).ready(function() {
    $('#submit-checkIn-btn').on('click', function(e) {
        //var symptoms = ["Fever/chills", "Cough", "Loss of taste/smell", "Shortness of breath", "Fatigue", "Muscle/body aches", "Headaches", "Sore throat", "Congestion/runny nose", "Nausea", "Diarrhea"]
        //var severities = []
        const symptoms = {
            "Fever": 0, 
            "Cough": 0, 
            "Taste": 0, 
            "Breath": 0, 
            "Fatigue": 0, 
            "Ache": 0, 
            "Headache": 0, 
            "Throat": 0, 
            "Nose": 0, 
            "Nausea": 0, 
            "Diarrhea": 0
        }
        /*
        for(var i = 0; i < symptoms.length; i++){
            severities.push(0);
        } */
        $("input.severity").each(function(i, obj) {
            if($(this).val() != ""){
                symptoms[$(this).attr('id')] = parseInt($(this).val());
            }
        });
        //console.log('submit clicked');
        const sendInfo = async () => {
            const response = await createAxios({
                method: 'post',
                url: '/symptom_log',
                data: {
                    'username': localStorage.getItem('user')['username'],
                    'Symptoms': symptoms,
                }
            });
        }
        sendInfo();
    })
    
    if (localStorage.getItem('user')) {
        const getDocNotes = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_notes',
                data: {
                    'username': localStorage.getItem('user')['username'],
                }
            })
            const notes = JSON.parse(res);
            notes.map(note => {
                const noteSection = document.getElementById('note-section');
                const div1 = document.createElement('div');
                div1.className = 'note';
                const div2 = document.createElement('div');
                div2.className = 'small text-gray-500';
                const p = document.createElement('p');
                const node = document.createTextNode(note.info); //to be implemented
                const node2 = document.createTextNode(note.date);
                p.appendChild(node);
                div1.appendChild(p);
                div2.appendChild(node2);
                div1.appendChild(div2);
                noteSection.appendChild(div1);
                noteSection.appendChild(document.createElement('hr'));
            });
        }
    }
})
