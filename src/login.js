$(document).ready(function() {
    
    $('#login-btn').on('click', function(e) {
        const username = $('#username');
        const password = $('#password');
        const sendLoginInfo = () => {
            createAxios({
                method: get,
                url: '/loginUser',
                data: {
                    username: username,
                    password: password
                }
            }).then(res => {
                localStorage.setItem('user', res.user); //set current user
                localStorage.getItem('user').isDoctor === true ? window.location.replace('doctor.html') : window.location.replace('patient.html')
            })
        }
    })
    //console.log(localStorage.getItem('username'));
})