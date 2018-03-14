/*FAIT  > Les dimensions du labyrinthe sont entrées par l'utilisateur
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
        > On peut s'inscrire
        > Afficher des infos sur le jeu quand on n'est pas connecté
        > Afficher en permanence notre meilleur temps


A FAIRE > Essayer de rendre le site responsive
        > Rendre le code plus simple à lire, opti et propre
        > Réinit la BD et arrêter le mode speedrun à 50*50 (ou moins ?)
        > Mettre le site en ligne
 */

(function() {
    "use strict";

    let css_table = {
        'width' : '50%',
        'height':'50%',
        'margin':0
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
            $(".case-laby").css('background-color','white');
            $(".case-arrivee").css('background-color','yellow');
            $(".case-mur").css('background-color','black');
            $(".case-perso").css('background-color','blue');
        };

        let actualiserPositionPerso = function () {
            $(".case-laby").css('background-color','white');
            $(".case-arrivee").css('background-color','yellow');
            $(".case-mur").css('background-color','black');
            $(".case-perso").css('background-color','blue');
        };


        let initKeyboardEvents = function (laby_actuel, estSpeedrun) {
            $('body').on('keydown', function (event) {
                let h_player = laby_actuel.player_hauteur;
                let l_player = laby_actuel.player_largeur;
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
                            if (laby_actuel.hauteur !== 40 && laby_actuel.largeur !== 40)
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
            alert('Bravo ! Votre temps est de ' + temps + ' secondes !');
            $.ajax({
                url:'/json/score.php',
                dataType: 'json',
                type: 'POST',
                data: 'temps='+temps
            })
                .done(function (data) {
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
        };

        // $.ajax({
        //     url: '/json/creation_bd.php'
        // })
        //     .done(function (data) {
        //         if (data.bool_error)
        //             console.log(data.error);
        //     });

        let afficherRecords = function () {
            $.ajax({
                url:'/json/meilleurs_scores.php'
            })
                .done(function (data) {
                    console.log(data);
                    if (typeof(data.meilleursTemps) !== "undefined") {
                        for (let i = 0 ; i < data.meilleursTemps.length ; ++i) {
                            let trActu = $('<tr />');
                            trActu.append('<td class="case-classement">' + '<p>'+ (i+1) +'</p>' + '</td>');
                            trActu.append('<td class="case-classement">' + '<p>' + data.meilleursTemps[i].NAME + '</p>' + '</td>');
                            trActu.append('<td class="case-classement">' + '<p>' + data.meilleursTemps[i].BEST + '</p>' + '</td>');
                            $('#classement').append(trActu);
                        }
                        $('.case-classement').css('border', 'solid 5px white');
                    }
                })
        };

        $.ajax({
            'url':'/json/est_connecte.php'
        })
            .done(function (data) {
                console.log(data);

                if (data.fail_co === false) {
                    if (data.est_connecte === true) {
                        $('#div-insc').hide();
                        $('#div-bienvenue').hide();
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
                            if (data.speedrun === false) {
                                $('#div-timer').hide();
                                initKeyboardEvents(laby_actuel, false);
                            }

                            else {
                                $('#div-timer').show();
                                afficherRecords();
                                recupRecord();
                                demarrerTimer();
                                initKeyboardEvents(laby_actuel, true);
                            }


                            $('#labyrinthe').show();

                        }
                    }
                    else {
                        $('#div-jeu').hide();
                        $('#userinsc').show();
                        $('#div-bienvenue').show();
                        $('#userco').show();
                        if (typeof(data.err_saisie) !== "undefined")
                            $('#div-insc').append(data.err_saisie);
                        if (typeof(data.pseudo_pris) !== "undefined")
                            $('#div-insc').append(data.pseudo_pris);
                        if(typeof(data.email_pris) !== "undefined")
                            $('#div-insc').append(data.email_pris);

                        if (data.insc_enreg)
                            $('#div-insc').append(data.insc_enreg);
                    }
                }
                else {
                    $('#userco').append('<p>Identifiants incorrects</p>');
                    $('#div-jeu').hide();
                    $('#userco').show();
                    $('#userinsc').show();
                }


            })
            .fail(erreurCritique);

        $('#userinsc').submit(function () {
            $.ajax({
                url:$(this).attr('action'),
                method:$(this).attr('method'),
                data:$(this).serialize()
            })
                .done(function (data) {
                    window.location.reload(true);

                })
                .fail(erreurCritique);
            return false;
        });

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
            return false;
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
            return false;
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
            return false;
        })
    })
})();





