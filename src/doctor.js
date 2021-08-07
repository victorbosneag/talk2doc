$(document).ready(function() {
    var patientName = null;
    $('.note').click(function(e) {
        //currentConsultation = e.currentTarget.id;
        //console.log(e.currentTarget.id);
        //console.log($('#' + e.currentTarget.id).children('h4').text())
        patientName = $('#' + e.currentTarget.id).children('h4').text();
    })

    $('#submit-doctorNotes-btn').click(function(e) {
        //console.log(document.getElementById('doctorNotes').value);
        const sendInfo = async () => {
            const response = await createAxios({
                method: 'post',
                url: '/doctorNote',
                data: {
                    username: patientName,
                    notes: document.getElementById('doctorNotes').value,
                }
            });
        }
        sendInfo();
    })
    
    if (localStorage.getItem('user')) {
        const getConsultations = async () => {
            const res = await createAxios({
                method: 'get',
                url: 'doc-notes',
                data: {
                    username: localStorage.getItem('user').username
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

        const getPatients = async () => {

        }

        getConsultations();
        getPatients();
    }
})  