$(document).ready(function() {
    function hasClass(elem, className) {
        return elem.classList.contains(className);
    }

    var docToAdd = null
    document.addEventListener('click', function (e) {
        if (hasClass(e.target, 'selectDoctor')) {
            docToAdd = e.target.value
            createAxios({
                method: 'post',
                url: 'choose_doc',
                data: {
                    'username': localStorage.getItem('username'),
                    'doc_username': docToAdd
                }
            }).then(res => {
                
                document.location.replace('/src/patient.html')
            })
        }
    }, false);

    document.addEventListener('click', function(e) {
        //console.log(e.target)
        if (hasClass(e.target, 'like-btn') || hasClass(e.target, 'likes')) {
            //console.log('test')
            //console.log(e.target.value)
            createAxios({
                method: 'post',
                url: 'rate',
                data: {
                    'username': localStorage.getItem('username'),
                    'rating': 1
                }
            })
        } else if (hasClass(e.target, 'dislike-btn') || hasClass(e.target, 'dislikes')) {
            createAxios({
                method: 'post',
                url: 'rate',
                data: {
                    'username': localStorage.getItem('username'),
                    'rating': -1
                }
            })
        }
    }, false)

    if (localStorage.getItem('username')) {
        createAxios({
            method: 'post',
            url: 'view_doc',
            data: {
                'username': localStorage.getItem('username'),
            }
        }).then(res => {
            const docs = res.data
            docs.doctors.map(doc => {
                //console.log(doc.username)
                const section = document.getElementById('docs-section')
                const card = document.createElement('div')
                const btn = document.createElement('button')
                btn.appendChild(document.createTextNode('Select this Doctor'))
                btn.className = 'check-in-btn d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm selectDoctor'
                btn.setAttribute('value', doc.username)
                card.setAttribute('class', 'card shadow mb-4 doctor-card')
                const cardHeader = document.createElement('div')
                cardHeader.setAttribute('class', 'card-header py-3')
                const row = document.createElement('div')
                row.className = 'row'
                const img = document.createElement('img')
                img.setAttribute('class', 'img-profile rounded-circle doctorPictures')
                img.setAttribute('src', 'https://source.unsplash.com/QAB-WJcbgJk/60x60')
                const h6 = document.createElement('h6')
                h6.className = 'm-0 font-weight-bold text-primary'
                const body = document.createElement('div')
                body.className = 'card-body'
                const p = document.createElement('p')
                const ratings = document.createElement('div')
                ratings.className = 'small text-gray-500'
                ratings.style = 'margin-bottom: 12px'
                const like = document.createElement('i')
                like.className = 'fa fas fa-fw fa-thumbs-up likes'
                const dislike = document.createElement('i')
                dislike.className = 'fa fas fa-fw fa-thumbs-down dislikes activeIcon' 
                const span = document.createElement('span')
                const rating = document.createElement('div')
                rating.className = 'rating-div'
                rating.style = 'margin-top: -32px'
                rating.style = 'margin-bottom: 8px'
                rating.appendChild(document.createTextNode('Rating: ' + doc.rating + ' points'))
                span.className = 'counter'
                span.appendChild(document.createTextNode('12'))
                h6.appendChild(document.createTextNode(doc.first_name + ' ' + doc.last_name))
                row.appendChild(img)
                row.appendChild(h6)
                cardHeader.appendChild(row)
                body.appendChild(p)
                body.appendChild(ratings)
                body.appendChild(rating)
                body.appendChild(btn)
                card.appendChild(cardHeader)
                card.appendChild(body)
                section.appendChild(card)
            })
        })
        
    }
})