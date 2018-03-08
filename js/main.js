/*Classe labyrinthe

FAIT    > Les dimensions du labyrinthe sont entrées par l'utilisateur
        > Pouvoir se déplacer dans le labyrinthe au clavier
        > Génération aléatoire de la solution du laby
        > On démarre au début (en haut à gauche et on gagne quand on arrive à la case d'arrivée aléatoire
        > Génération des murs
        > au lieu de return -1, return la case actuelle (donc la case de la victoire) et un évènement de produit quand on y arrive
        > Se débrouiller pour qu'on voit les limites de la map
        > Connexion avec base de données
        > Affichage des contrôles
        > Un timer se lance quand on démarre le mode speedrun
        > Notre meilleur temps s'update quand on le bat


A FAIRE > Afficher en permanence notre meilleur temps
        > Si je me sens, pouvoir s'inscrire
        > Afficher des infos sur le jeu quand on n'est pas connecté


 */

(function() {
    "use strict";

    let css_perso = {
        'background-color' : 'blue',
        //'border' : 'solid 2px blue'
    };

    let css_case = {
        'background-color' : 'white',
        //'border' : 'solid 1px white'
    };

    let css_mur = {
        'background-color' : 'black',
        //'border' : 'solid 2px black'
    };

    let css_arrivee = {
        'background-color' : 'yellow',
        //'border' : 'solid 2px yellow'
    };

    let css_table = {
        'width' : '750px',
        'margin':0
        //'background-color' : 'white'
    };

    let css_center = {
        'margin-left' : 'auto',
        'margin-right' :'auto',
        'margin-top' : '85px',
        'margin-bottom' : '85px'
    };


    $(document).ready(function () {
        let erreurCritique = function () {
            $('<body/>').html('Une erreur s\'est produite. Veuillez réessayer.')
        };

        let habillerLaby = function (longueur, largeur) {

            $('#labyrinthe').css(css_table).css('height', 750*longueur/largeur);
            $('#labyrinthe.center').css(css_center);
            $(".case-laby").css(css_case);
            //$(".case-soluce").css(css_case);
            $(".case-arrivee").css(css_arrivee);
            //$(".case-mauvais-chemin").css(css_case);
            $(".case-mur").css(css_mur);
            $(".case-perso").css(css_perso);
        };

        let actualiserPositionPerso = function () {
            $(".case-laby").css(css_case);
            //$(".case-soluce").css(css_case);
            $(".case-arrivee").css(css_arrivee);
            //$(".case-mauvais-chemin").css(css_case);
            $(".case-mur").css(css_mur);
            $(".case-perso").css(css_perso);
        };


        let initKeyboardEvents = function (laby_actuel, estSpeedrun) {
            $('body').on('keydown', function (event) {
                var h_player = laby_actuel.player_hauteur;
                var l_player = laby_actuel.player_largeur;
                if (event.keyCode === 83 || event.keyCode === 90 || event.keyCode === 81 || event.keyCode === 68) {
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
                    if (laby_actuel.case_perso.td.hasClass('case-arrivee')) {
                        if (estSpeedrun)
                            if (laby_actuel.hauteur !== 7 && laby_actuel.largeur !== 7)
                                agrandirLaby(laby_actuel);
                            else
                                finSpeedrun();
                        else
                            alert('Vous avez gagné ! Essayez le mode speedrun !');
                    }
                }
            });
        };

        let agrandirLaby = function (laby_actuel) {
            $('body').off('keydown');
            $('#labyrinthe').replaceWith('<table style="display: none" id="labyrinthe" class="center"></table>');
            let nouv_laby = new Labyrinthe(laby_actuel.hauteur+1, laby_actuel.largeur+1, laby_actuel.player_hauteur, laby_actuel.player_largeur, '#labyrinthe');
            habillerLaby(nouv_laby.hauteur, nouv_laby.largeur);
            initKeyboardEvents(nouv_laby, true);
            $('#labyrinthe').show();
        };

        let finSpeedrun = function () {
            clearInterval(idTimer);
            alert('Bravo ! Votre temps est de ' + temps + 'secondes !');
            $.ajax({
                url:'/json/score.php',
                dataType: 'json',
                type: 'POST',
                data: 'temps='+temps
            })
                .done(function (data) {
                    console.log(data.best);
                    if (data.temps_ameliore)
                        alert('Vous avez amélioré votre meilleur temps !')
                    else
                        alert('Réessayez pour battre votre meilleur temps !');
                })
                .fail(erreurCritique);
        };

        let temps = 0;
        let idTimer;

        let myTimer = function () {
            $('#temps-ecoule').replaceWith('<div id="temps-ecoule">'+ '<p>' + ++temps + '</p>' + '</div>');
        };

        let demarrerTimer = function () {

            idTimer = setInterval(myTimer, 1000);
        };

        let recupRecord = function () {
            $.ajax({
                url: '/json/score.php'
            })
                    .done(function (data) {
                        console.log(data.best);
                        if (typeof(data.best) !== "undefined") {
                            $('#temps-record').append('<p>' + data.best + '</p>');
                        }

                    })
                    .fail(erreurCritique);
        }

        $.ajax({
            'url':'/json/est_connecte.php'
        })
            .done(function (data) {
                if (data.fail_co === false) {
                    if (data.est_connecte === true) {
                        $('#settings').show();
                        $('#speedrun').show();
                        $('#userdeco').show();
                        if (data.err_settings === true) {
                            $('#settings').append('<p style="margin: 0">Mauvaise saisie.</p>');
                        }
                        if (typeof(data.laby_cree) !== "undefined") {
                            $('#div-laby').show();
                            let laby_actuel = new Labyrinthe(data.hauteur, data.largeur, 0, 0, '#labyrinthe');
                            habillerLaby(data.hauteur, data.largeur);
                            if (data.speedrun === false)
                                initKeyboardEvents(laby_actuel, false);

                            else {
                                recupRecord();
                                demarrerTimer();
                                initKeyboardEvents(laby_actuel, true);
                            }


                            $('#labyrinthe').show();

                        }
                    }
                    else {
                        $('#div-jeu').hide();
                        $('#userco').show();
                    }
                }
                else {
                    $('#userco').append('<p>Identifiants incorrects</p>');
                    $('#div-jeu').hide();
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
        });

        $('#speedrun').submit(function () {
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





