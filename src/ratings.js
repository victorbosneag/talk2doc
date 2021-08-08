$(document).ready(function() {
    if (localStorage.getItem('user')) {
        const res = createAxios({
            method: 'post',
            url: 'view_doc',
            data: {
                'username': localStorage.getItem('user')['username'],
            }
        }).then(res => {
            const docs = res.data
            docs.map(doc => {
                const section = document.getElementById('docs-section')
                const card = document.createElement('div')
                card.setAttribute('class', 'card shadow mb-4')
                const cardHeader = document.createElement('div')
                cardHeader.setAttribute('class', 'card-header py-3')
                const row = document.createElement('div')
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
                const like = document.createElement('i')
                like.className = 'fa fas fa-fw fa-thumbs-up likes'
                const dislike = document.createElement('i')
                dislike.className = 'fa fas fa-fw fa-thumbs-down dislikes activeIcon' 
                like.appendChild(document.createTextNode(doc.rating))
                h6.appendChild(document.createTextNode(doc.first_name + ' ' + doc.last_name))
                row.appendChild(img)
                row.appendChild(h6)
                cardHeader.appendChild(row)
                body.appendChild(p)
                body.appendChild(ratings)
                ratings.appendChild(like)
                ratings.appendChild(dislike)
                card.appendChild(cardHeader)
                card.appendChild(body)
                section.appendChild(card)
            })
        })
    }
})