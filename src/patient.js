//const form = document.getElementById('dailyCheckInForm');
//const symptoms = document.getElementById('symptoms');
//const otherInfo = document.getElementById('otherInfo');

$(document).ready(function() {
    $('#submit-checkIn-btn').on('click', function(e) {
        //console.log('submit clicked');
        const sendInfo = async () => {
            const promise = await createAxios({
                method: 'post',
                url: '/checkin',
                data: {
                    'Symptoms': '',
                }
            });
        }
        sendInfo();
    })
    
    if (localStorage.getItem('user')) {
        const getDocNotes = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'doc-notes',
                data: {
                    'username': localStorage.getItem('user').username
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
