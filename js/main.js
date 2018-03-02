/*Classe labyrinthe

FAIT    > Les dimensions du labyrinthe sont entrées par l'utilisateur

A FAIRE > Créer un compte et faire en sorte qu'on puisse se connecter seulement avec celui-ci (pas de BD)
        > Tout d'abord essayer de créer une labyrinthe statique (avec bordures non aléatoires)
        > Puis essayer de faire un algo qui génère un labyrinthe automatiquement (avec bordures aléatoires QUI SONT DES CASES ET NON PAS DES BORDER !)
        > Pouvoir se déplacer dans le labyrinthe (clavier ou souris ?)
        > On démarre au début (en haut à gauche et on gagne quand on arrive à la fin (en bas à droite)
        X event.which pour bouger le perso ?


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
        };

        let actualiserPositionPerso = function () {
            $(".case-laby").css(css_case);
            $(".case-perso").css(css_perso);
        }


        let initKeyboardEvents = function (laby_actuel) {
            $('body').on('keydown', function (event) {

                //Faire une fonction qui vérifie si il est possible de se déplacer dans la direction voulue (quand il y aura les murs)
                var h_player = laby_actuel.player_hauteur;
                var l_player = laby_actuel.player_largeur
                if (event.keyCode === 83      && h_player !== laby_actuel.hauteur-1 && !laby_actuel.tab[h_player+1][l_player].td.hasClass('case-mur'))  // S
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
                console.log(data.laby_cree);
                console.log(data.hauteur);
                console.log(data.largeur);
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





