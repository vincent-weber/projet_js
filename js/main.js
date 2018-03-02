/*Classe labyrinthe

FAIT    > Les dimensions du labyrinthe sont entrées par l'utilisateur

A FAIRE > Créer un compte et faire en sorte qu'on puisse se connecter seulement avec celui-ci (pas de BD)
        > Tout d'abord essayer de créer une labyrinthe statique (avec bordures non aléatoires)
        > Puis essayer de faire un algo qui génère un labyrinthe automatiquement (avec bordures aléatoires QUI SONT DES CASES ET NON PAS DES BORDER !)
        > Pouvoir se déplacer dans le labyrinthe (clavier ou souris ?)
        > On démarre au début (en haut à gauche et on gagne quand on arrive à la fin (en bas à droite)


 */

(function() {
    "use strict";

    let css_case = {
        'background-color' : 'white',
        'text-align' : 'center',
        'font-size' : 'large',
        'border' : 'solid 2px red',
        'color' : 'black'
    };

    let css_rouge = {
        'background-color' : 'red',
        'color' : 'white',
        'font-size' : 'bolder',
        'font-style' : 'oblique',
        'text-align' : 'center'
    };

    let css_table = {
        'width' : '750px',
        //'background-color' : 'green',
        'padding' : '0px 0%'
    }

    let css_center = {
        'margin-left' : 'auto',
        'margin-right' :'auto',
        'margin-top' : '85px',
        'margin-bottom' : '85px'
    }

    $(document).ready(function () {

        let erreurCritique = function () {
            $('<body/>').html('Une erreur s\'est produite. Veuillez réessayer.')
        };

        let habillerDamier = function (longueur, largeur) {

            $('#labyrinthe').css(css_table).css('height', 750*longueur/largeur);
            $('#labyrinthe.center').css(css_center);
            //$('.test').css('width', 750/longueur + 'px').css('height', 750/largeur + 'px');
            $(".case-laby").css(css_case).hover(function() {
                $(this).css(css_rouge)
            }, function() {
                $(this).css(css_case);
            });
        };

        $.ajax({
            'url':'/json/est_connecte.php'
        })
            .done(function (data) {
                console.log(data.damier_cree);
                console.log(data.longueur);
                console.log(data.largeur);
                if (typeof (data.est_connecte) !== "undefined") {
                    $('#settings').show();
                    $('#userdeco').show();
                    if (typeof(data.damier_cree) !== "undefined") {
                        new Labyrinthe(data.longueur, data.largeur, '#labyrinthe');
                        habillerDamier(data.longueur, data.largeur);
                        $('#damier').show();
                    }
                }
                else {
                    $('#userco').slideDown(0);
                }

            })
            .fail(erreurCritique);

        $('#userco').submit(function () {
            $.ajax({
                url:$(this).attr('action'),
                method:$(this).attr('method'),
                data:$(this).serialize()
            })
                .done(function (data) {
                    console.log('data=',data);
                    if(data.est_connecte === true)
                        window.location.reload(true);

                })
                .fail(erreurCritique);
        });

        $('#userdeco').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (data) {
                    window.location.reload(true);
                })
                .fail(erreurCritique);
            return false;
        });

        $('#settings').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (data) {
                    window.location.reload(true);
                })
                .fail(erreurCritique);
        })
    })
})();





