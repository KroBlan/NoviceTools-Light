window.addEventListener('load', function () {

    let cible = document.querySelector('input[type=button]');
    cible.addEventListener("click", check_fx);

});

function check_fx() {
    var user_iden = document.getElementById('pseudo').value;
    var user_pass = document.getElementById('password').value;
//    var user_email = document.getElementById('email').value;

    var user_idenDiv = document.getElementById('pseudo');
    var user_passDiv = document.getElementById('password');
    var user_email = document.getElementById('email');

    const REG_IDEN = /.{4,24}/;
    const REG_PASS = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    const REG_MAIL = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    var alert = document.getElementById("alert");

    if (user_iden) {
        if (user_iden !== "") {
            if (REG_IDEN.test(user_iden)) {
                if (user_pass) {
                    if (user_pass !== "") {
                        if (REG_PASS.test(user_pass)) {
                            document.forms['connexionForm'].submit();

                        } else {
                            document.querySelector('.alert').style.display = 'block';
                            alert.innerHTML = "";
                            alert.innerHTML = "Le mot de passe n'est pas au bon format";
                        }
                    } else {
                        document.querySelector('.alert').style.display = 'block';
                        alert.innerHTML = "";
                        alert.innerHTML = "Merci de renseigner votre mot de passe";
                    }
                } else {
                    document.querySelector('.alert').style.display = 'block';
                    alert.innerHTML = "";
                    alert.innerHTML = "Merci de renseigner votre mot de passe";
                }
            } else {
                document.querySelector('.alert').style.display = 'block';
                alert.innerHTML = "";
                alert.innerHTML = "L'\identifiant n'est pas au bon format";
            }
        } else {
            document.querySelector('.alert').style.display = 'block';
            alert.innerHTML = "";
            alert.innerHTML = "Merci de renseigner votre identifiant";
        }
    } else {
        document.querySelector('.alert').style.display = 'block';
        alert.innerHTML = "";
        alert.innerHTML = "Merci de renseigner votre identifiant";
    }
}
