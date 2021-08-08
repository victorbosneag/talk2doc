$(document).ready(function() {
    $('#register-btn').on('click', function(e) {
        const username = $('#username');
        const password = $('#password');
        const email = $('#email');
        const first_name = $('#firstName');
        const last_name = $('#lastName');
        const isDoctor = $('input[type="radio"][name=doctorRadio]:checked').val();
        createAxios({
            method: 'post',
            url: '/register',
            data: { 
                'username': username,
                'password': password,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'isdoctor': isDoctor === 'true' ? 1 : 0,
            }
        }).then(res => {
            window.location.replace('login.html');
        });
        
    })
    //localStorage.setItem('username', 'hello?');
})