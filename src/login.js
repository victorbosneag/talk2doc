$(document).ready(function() {
    
    $('#login-btn').on('click', function(e) {
        const username = $('#username').val();
        const password = $('#password').val();
        createAxios({
            method: 'post',
            url: '/login',
            data: {
                'username': username,
                'password': password
            }
        }).then(res => {
            localStorage.setItem('user', res.data); //set current user
            localStorage.getItem('user').isdoctor === true ? window.location.replace('doctor.html') : window.location.replace('patient.html')
        })
    })
    //console.log(localStorage.getItem('username'));
})