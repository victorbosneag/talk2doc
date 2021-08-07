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
                localStorage.setItem('username', res.username); //set current user
                window.location.replace('index.html');
            })
        }
    })
    //console.log(localStorage.getItem('username'));
})