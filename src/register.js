$(document).ready(function() {
    $('#register-btn').on('click', function(e) {
        const username = $('#username');
        const password = $('#password');
        const email = $('#email');
        const first_name = $('#firstName');
        const last_name = $('#lastName');
        const isDoctor = $('input[type="radio"][name=doctorRadio]:checked').val();
        const sendLoginInfo = async () => {
            const response = await createAxios({
                method: post,
                url: '/registerUser',
                data: {
                    username: username,
                    password: password,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    isDoctor: isDoctor == 'true' ? true : false,
                }
            })
        }
        sendLoginInfo();
    })
    //localStorage.setItem('username', 'hello?');
})