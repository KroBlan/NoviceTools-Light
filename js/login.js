window.addEventListener('load', function () {

    let cible = document.querySelector('input[type=button]');
    cible.addEventListener("click", check_fx);

});

function check_fx() {
    var user_iden = document.getElementById('identifiant').value;
    var user_pass = document.getElementById('password').value;


    var user_idenDiv = document.getElementById('nom');
    var user_passDiv = document.getElementById('password');

    const REG_IDEN = /.{4,24}/;
    const REG_PASS = /[a-zA-Z0-9]{6,12}/;

    var alert_1 = document.getElementById("alert");

    if (user_iden) {
        if (user_iden !== "") {
            if (REG_IDEN.test(user_iden)) {
//                if (user_iden === "Zouheir") {
                    if (user_pass) {
                        if (user_pass !== "") {
                            if (REG_PASS.test(user_pass)) {
//                                if (user_pass === "123456") {
                                    document.forms['identification'].submit();
//                                } else {
//                                    document.querySelector('.alert_1').style.display = 'block';
//                                    alert_1.innerHTML = "";
//                                    alert_1.innerHTML = "Le mot de passe est invalide.";
//                                }
                            } else {
                                document.querySelector('.alert').style.display = 'block';
                                alert_1.innerHTML = "";
                                alert_1.innerHTML = "Le mot de passe n'est pas au bon format";
                            }
                        } else {
                            document.querySelector('.alert').style.display = 'block';
                            alert_1.innerHTML = "";
                            alert_1.innerHTML = "Merci de renseigner votre mot de passe";
                        }
                    } else {
                        document.querySelector('.alert').style.display = 'block';
                        alert_1.innerHTML = "";
                        alert_1.innerHTML = "Merci de renseigner votre mot de passe";
                    }
//                } else {
//                    document.querySelector('.alert_1').style.display = 'block';
//                    alert_1.innerHTML = "";
//                    alert_1.innerHTML = "L'identifiant n'existe pas.";
//                }
            } else {
                document.querySelector('.alert').style.display = 'block';
                alert_1.innerHTML = "";
                alert_1.innerHTML = "L'\identifiant n'est pas au bon format";
            }
        } else {
            document.querySelector('.alert').style.display = 'block';
            alert_1.innerHTML = "";
            alert_1.innerHTML = "Merci de renseigner votre identifiant";
        }
    } else {
        document.querySelector('.alert').style.display = 'block';
        alert_1.innerHTML = "";
        alert_1.innerHTML = "Merci de renseigner votre identifiant";
    }
}
