$(document).ready(function() {
    var patientName = null;
    function hasClass(elem, className) {
        return elem.classList.contains(className);
    }
    
    document.addEventListener('click', function (e) {
        //e.preventDefault()
        //console.log(e.target)
        

        if (hasClass(e.target, 'submit-note-btn')) {
            patientName = e.target.value
        } else if (hasClass(e.target, 'submit-meds-btn')) {
            patientName = e.target.value
        }
        $('#doctor-medsForm').text('Treatment form for ' + patientName)
        $('#doctor-dailyForm').text('Daily Check-in for ' + patientName)
    })
    
    $('#submit-doctorMeds-btn').click(function(e) {
        createAxios({
            method: 'post',
            url: '/add_meds',
            data: {
                'username': localStorage.getItem('username'),
                'username_patient': patientName,
                'note': document.getElementById('doctorMeds').value
            }
        }).then(res => {
            console.log(res)
        })
    })

    $('#submit-doctorNotes-btn').click(function(e) {
        //console.log(document.getElementById('doctorNotes').value);
        const sendInfo = async () => {
            const response = await createAxios({
                method: 'post',
                url: '/add_notes',
                data: {
                    'username': localStorage.getItem('username'),
                    'username_patient': patientName,
                    'note': document.getElementById('doctorNotes').value,
                }
            });
        }
        sendInfo();
    })
    if (localStorage.getItem('username')) {
        const getConsultations = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_patients',
                data: {
                    'username': localStorage.getItem('username'),
                }
            })
            const notes = res.data
            notes.patients.map(note => {
                const section = document.getElementById('consultation-section');
                const a = document.createElement('a')
                const btn = document.createElement('button')
                const btn2 = document.createElement('button')
                a.setAttribute('class', 'note')
                btn.setAttribute('data-toggle', 'modal')
                btn.setAttribute('data-target', '#myModal')
                btn.setAttribute('value', note.username)
                btn.setAttribute('class', 'submit-note-btn')
                btn2.setAttribute('data-toggle', 'modal')
                btn2.setAttribute('data-target', '#myModal1')
                btn2.setAttribute('value', note.username)
                btn2.setAttribute('class', 'submit-meds-btn')
                btn.appendChild(document.createTextNode('Add Note'))
                btn2.appendChild(document.createTextNode('Meds'))
                btn.style.margin = '-20px 20px 40px'
                btn2.style.margin = '-20px 20px 40px'
                const h4 = document.createElement('h4');
                const p = document.createElement('p');
                const div = document.createElement('div');
                div.className = 'small text-gray-500';
                h4.appendChild(document.createTextNode(note.username + ' (' + note.first_name + ' ' + note.last_name + ')'))
                h4.appendChild(btn)
                h4.appendChild(btn2)
                
                note.symptoms.map(entry => {
                    p.appendChild(document.createTextNode('Symptom: ' + Object.keys(entry))) //'Severity: ' + Object.values(entry)[0][0]
                    p.appendChild(document.createElement('br'))
                    p.appendChild(document.createTextNode('Severity: ' + Object.values(entry)[0][0]))
                    p.appendChild(document.createElement('br'))
                    p.appendChild(document.createTextNode(Object.values(entry)[0][1]))
                    p.appendChild(document.createElement('br'))
                    p.appendChild(document.createElement('br'))
                    //p.appendChild(document.createTextNode(Object.values(entry)[0][1]))
                })
                //div.appendChild(document.createTextNode('Janurary 15, 2019'))
                a.appendChild(h4)
                a.appendChild(p)
                a.appendChild(btn)
                a.appendChild(btn2)
                a.appendChild(div)
                section.appendChild(a)
            });
        }

        const getPatients = async () => {
            const res = await createAxios({
                method: 'post',
                url: 'view_patients', //view_patient?
                data: {
                    'username': localStorage.getItem('username'),
                }
            })
            const patients = res.data
            patients.patients.map(patient => {
                const section = document.getElementById('patient-section')
                const div1 = document.createElement('div');
                div1.className = 'note';
                const h4 = document.createElement('h4')
                h4.appendChild(document.createTextNode(patient.first_name + ' ' + patient.last_name))
                div1.appendChild(h4)
                section.appendChild(div1)
                section.appendChild(document.createElement('hr'))
            })
        }
        getConsultations();
        getPatients();
    }
})  