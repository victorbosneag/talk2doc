$(document).ready(function() {
    $('#register-btn').on('click', function(e) {
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        const first_name = $('#firstName').val();
        const last_name = $('#lastName').val();
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
        }).catch(res => {
            alert(res)
        });
        
    })
    //localStorage.setItem('username', 'hello?');
})