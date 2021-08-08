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
                url: '/add_notes',
                data: {
                    'username': localStorage.getItem('user')['username'],
                    'username_patient': patientName,
                    'note': document.getElementById('doctorNotes').value,
                }
            });
        }
        sendInfo();
    })
    if (localStorage.getItem('user')) {
        const getConsultations = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_symptoms',
                data: {
                    'username': localStorage.getItem('user')['username'],
                }
            })
            const notes = JSON.parse(res);
            notes.map(note => {
                const section = document.getElementById('consultation-section');
                const a = document.createElement('a')
                a.setAttribute('class', note)
                a.setAttribute('data-toggle', 'modal')
                a.setAttribute('data-target', '#myModal')
                a.setAttribute('id', 'test23')
                const h4 = document.createElement('h4');
                const p = document.createElement('p');
                const div = document.createElement('div');
                div.className = 'small text-gray-500';
                h4.appendChild(document.createTextNode('Insert Patient Name'))
                p.appendChild(document.createTextNode('Insert Patient Details'))
                div.appendChild(document.createTextNode('Janurary 15, 2019'))
                a.appendChild(h4)
                a.appendChild(p)
                a.appendChild(div)
                section.appendChild(a)
            });
        }

        const getPatients = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_patients', //view_patient?
                data: {
                    'username': localStorage.getItem('user')['username'],
                }
            })
            const patients = JSON.parse(res)
            patients.map(patient => {
                const section = document.getElementById('patient-section')
                const div1 = document.createElement('div');
                div1.className = 'note';
                const h4 = document.createElement('h4')
                h4.appendChild(document.createTextNode(patient['first_name'] + ' ' + patient['last_name']))
                div1.appendChild(h4)
                section.appendChild(div1)
                section.appendChild(document.createElement('hr'))
            })
        }
        getConsultations();
        getPatients();
    }
})  