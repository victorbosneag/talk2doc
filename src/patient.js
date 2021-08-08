//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');

$(document).ready(function() {
    //console.log(localStorage.getItem('username'))
    //console.log(localStorage.getItem('username'))
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
                    'username': localStorage.getItem('username'),
                    'symptoms': symptoms,
                }
            });
            //console.log(promise);
        }
        sendInfo();
    })
    
    if (localStorage.getItem('username')) {
        const getDocNotes = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_notes',
                data: {
                    'username': localStorage.getItem('username'),
                }
            })
            const notes = res.data
            console.log(notes)
            notes.notes.map(note => {
                const noteSection = document.getElementById('note-section');
                const div1 = document.createElement('div');
                div1.className = 'note';
                const div2 = document.createElement('div');
                div2.className = 'small text-gray-500';
                const p = document.createElement('p');
                const node = document.createTextNode(note[0]);
                const node2 = document.createTextNode(note[1]);
                p.appendChild(node);
                div1.appendChild(p);
                div2.appendChild(node2);
                div1.appendChild(div2);
                noteSection.appendChild(div1);
                noteSection.appendChild(document.createElement('hr'));
            });
        }
        const getMeds = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_meds',
                data: {
                    'username': localStorage.getItem('username'),
                }
            })
            const meds = res.data
            //console.log(meds)
            meds.meds.map(med => {
                const medsSection = document.getElementById('meds-section');
                const div1 = document.createElement('div');
                div1.className = 'med';
                const div2 = document.createElement('div');
                div2.className = 'small text-gray-500';
                const p = document.createElement('p');
                const node = document.createTextNode(med);
                //const node2 = document.createTextNode(note[1]);
                p.appendChild(node);
                div1.appendChild(p);
                //div2.appendChild(node2);
                div1.appendChild(div2);
                medsSection.appendChild(div1);
                medsSection.appendChild(document.createElement('hr'));
            });
        }
        getMeds()
        getDocNotes()
    }
})
