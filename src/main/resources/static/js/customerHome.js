$( "#updatePasswordForm" ).submit(function(e) {
    alert("here"+ $("#password_old").val());
    var oldPassword = $("#password_old").val();
    var newPassword = $("#password_1").val();
    var retypePassword = $("#password_2").val();
    if (!(newPassword == retypePassword)) {
        $("#password_1").focus();
        return false;
    }
    return true;
});


function checkPasswordMatch() {
    var password = $("#password_1").val();
    var confirmPassword = $("#password_2").val();

    if (password != confirmPassword)
        $("#divCheckPasswordMatch").html('<i class="fa fa-times" aria-hidden="true"></i> Passwords do not match!');
    else
        $("#divCheckPasswordMatch").html("Passwords match.");
}

$(document).ready(function () {
   $("#password_1, #password_2").keyup(checkPasswordMatch);
});