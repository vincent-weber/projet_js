/*Classe labyrinthe

FAIT    > Les dimensions du labyrinthe sont entrées par l'utilisateur
        > Pouvoir se déplacer dans le labyrinthe au clavier
        > Génération aléatoire de la solution du laby
        > On démarre au début (en haut à gauche et on gagne quand on arrive à la case d'arrivée aléatoire


A FAIRE > Créer un compte et faire en sorte qu'on puisse se connecter seulement avec celui-ci (pas de BD)
        > Tout d'abord essayer de créer une labyrinthe statique (avec bordures non aléatoires) (roue de secours)
        > Génération des murs (aléatoire ou pas ?)
        > au lieu de return -1, return la case actuelle (donc la case de la victoire) et un évènement de produit quand on y arrive
 */

(function() {
    "use strict";

    let css_perso = {
        'background-color' : 'blue',
        'border' : 'solid 2px black',
    }

    let css_case = {
        'background-color' : 'white',
        'border' : 'solid 2px black'
    };

    let css_mur = {
        'background-color' : 'red',
        'border' : 'solid 2px orange'
    };

    let css_solution = {
        'background-color' : 'yellow',
        'border' : 'solid 2px black'
    }

    let css_table = {
        'width' : '750px',
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

        let habillerLaby = function (longueur, largeur) {

            $('#labyrinthe').css(css_table).css('height', 750*longueur/largeur);
            $('#labyrinthe.center').css(css_center);
            $(".case-laby").css(css_case);
            $(".case-perso").css(css_perso);
            $(".case-mur").css(css_mur);
            $(".case-soluce").css(css_solution);
        };

        let actualiserPositionPerso = function () {
            $(".case-laby").css(css_case);
            $(".case-soluce").css(css_solution);
            $(".case-perso").css(css_perso);
        }


        let initKeyboardEvents = function (laby_actuel) {
            $('body').on('keydown', function (event) {

                var h_player = laby_actuel.player_hauteur;
                var l_player = laby_actuel.player_largeur
                if (event.keyCode === 83      && h_player !== laby_actuel.hauteur-1 && !laby_actuel.tab[h_player+1][l_player].td.hasClass('case-mur'))  //S
                    laby_actuel.player_hauteur++;

                else if (event.keyCode === 90 && h_player !== 0                     && !laby_actuel.tab[h_player-1][l_player].td.hasClass('case-mur'))  //Z
                    laby_actuel.player_hauteur--;

                else if (event.keyCode === 81 && l_player !== 0                     && !laby_actuel.tab[h_player][l_player-1].td.hasClass('case-mur'))  //Q
                    laby_actuel.player_largeur--;

                else if (event.keyCode === 68 && l_player !== laby_actuel.largeur-1 && !laby_actuel.tab[h_player][l_player+1].td.hasClass('case-mur'))  //D
                    laby_actuel.player_largeur++;


                laby_actuel.case_perso.td.removeClass('case-perso').addClass('case-laby');
                laby_actuel.case_perso = laby_actuel.tab[laby_actuel.player_hauteur][laby_actuel.player_largeur];
                laby_actuel.case_perso.td.removeClass('case-laby').addClass('case-perso');
                actualiserPositionPerso();

            });
        }


        $.ajax({
            'url':'/json/est_connecte.php'
        })
            .done(function (data) {
                if (typeof (data.est_connecte) !== "undefined") {
                    $('#settings').show();
                    $('#userdeco').show();
                    if (typeof(data.laby_cree) !== "undefined") {
                        let laby_actuel = new Labyrinthe(data.hauteur, data.largeur, '#labyrinthe');
                        habillerLaby(data.hauteur, data.largeur);
                        initKeyboardEvents(laby_actuel);
                        $('#labyrinthe').show();
                    }
                }
                else {
                    $('#userco').show();
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





