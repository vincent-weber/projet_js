let Labyrinthe;

(function() {
    "use strict";

    Labyrinthe = function(hauteur,largeur, h_debut, l_debut, dest) {

        this.hauteur = hauteur;
        this.largeur = largeur;
        this.h_debut = h_debut;
        this.l_debut = l_debut;
        this.dest = dest;
        this.tab = [];
        this.player_hauteur = h_debut;
        this.player_largeur = l_debut;
        this.case_arrivee = null;
        this.case_perso = null;

        let self = this;

        let initCases = function() {
            for (let i = 0 ; i < self.hauteur ; ++i) {
                for (let j = 0 ; j < self.largeur ; ++j) {
                    if (j-1 < 0) {
                        self.tab[i][j].aDroite = self.tab[i][j+1];
                        if (i-1 < 0)                                    // en haut a gauche
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        else if (i+1 > self.hauteur-1)                  // en bas a gauche
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                        else {                                          // a gauche
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        }
                    }
                    else if (j+1 > self.largeur-1) {
                        self.tab[i][j].aGauche = self.tab[i][j-1];
                        if (i-1 < 0)                                    // en haut a droite
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        else if (i+1 > self.hauteur-1) {                // en bas a droite
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                        }
                        else {                                          // a droite
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        }
                    }

                    else {
                        self.tab[i][j].aGauche = self.tab[i][j-1];
                        self.tab[i][j].aDroite = self.tab[i][j+1];
                        if (i-1 < 0)                                    // en haut
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        else if (i+1 > self.hauteur-1)                  // en bas
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                        else {
                            self.tab[i][j].enHaut = self.tab[i-1][j];
                            self.tab[i][j].enBas = self.tab[i+1][j];
                        }
                    }
                }
            }
        };





        let pasEnHaut = function (h, l) {
            return ((self.tab[h][l].enHaut.enHaut !== null && self.tab[h][l].enHaut.enHaut.td.hasClass('case-soluce')) ||
            (self.tab[h][l].enHaut.aGauche !== null && self.tab[h][l].enHaut.aGauche.td.hasClass('case-soluce'))       ||
            (self.tab[h][l].enHaut.aDroite !== null && self.tab[h][l].enHaut.aDroite.td.hasClass('case-soluce')))
        };

        let pasAGauche = function (h, l) {
            return ((self.tab[h][l].aGauche.enHaut !== null && self.tab[h][l].aGauche.enHaut.td.hasClass('case-soluce')) ||
            (self.tab[h][l].aGauche.aGauche !== null && self.tab[h][l].aGauche.aGauche.td.hasClass('case-soluce'))       ||
            (self.tab[h][l].aGauche.enBas !== null && self.tab[h][l].aGauche.enBas.td.hasClass('case-soluce')))
        };

        let pasEnBas = function (h, l) {
            return ((self.tab[h][l].enBas.aGauche !== null && self.tab[h][l].enBas.aGauche.td.hasClass('case-soluce')) ||
            (self.tab[h][l].enBas.enBas !== null && self.tab[h][l].enBas.enBas.td.hasClass('case-soluce'))             ||
            (self.tab[h][l].enBas.aDroite !== null && self.tab[h][l].enBas.aDroite.td.hasClass('case-soluce')))
        };

        let pasADroite = function (h, l) {
            return ((self.tab[h][l].aDroite.enHaut !== null && self.tab[h][l].aDroite.enHaut.td.hasClass('case-soluce')) ||
            (self.tab[h][l].aDroite.aDroite !== null && self.tab[h][l].aDroite.aDroite.td.hasClass('case-soluce'))       ||
            (self.tab[h][l].aDroite.enBas !== null   && self.tab[h][l].aDroite.enBas.td.hasClass('case-soluce')))
        };



        let randomHautGauche = function (h_Haut, l_Haut, h_Gauche, l_Gauche) {
            let r_hg = Math.random();
            if (r_hg < 0.5) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
        };

        let randomHautBas = function (h_Haut, l_Haut, h_Bas, l_Bas) {
            let r_hb = Math.random();
            if (r_hb < 0.5) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }
        };

        let randomHautDroite = function (h_Haut, l_Haut, h_Droite, l_Droite) {
            let r_hd = Math.random();
            if (r_hd < 0.5) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };

        let randomBasDroite = function (h_Bas, l_Bas, h_Droite, l_Droite) {
            let r_bd = Math.random();
            if (r_bd < 0.5) {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };

        let randomGaucheDroite = function (h_Gauche, l_Gauche, h_Droite, l_Droite) {
            let r_gd = Math.random();
            if (r_gd < 0.5) {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };

        let randomGaucheBas = function (h_Gauche, l_Gauche, h_Bas, l_Bas) {
            let r_gb = Math.random();
            if (r_gb < 0.5) {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
            else {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }
        };

        let randomHautGaucheBas = function (h_Haut, l_Haut, h_Gauche, l_Gauche, h_Bas, l_Bas) {
            let r_hgb = Math.random();
            if (r_hgb < 0.33) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else if (r_hgb < 0.67) {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
            else {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }

        };

        let randomHautGaucheDroite = function (h_Haut, l_Haut, h_Gauche, l_Gauche, h_Droite, l_Droite) {
            let r_hgd = Math.random();
            if (r_hgd < 0.33) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else if (r_hgd < 0.67) {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };

        let randomHautBasDroite = function (h_Haut, l_Haut, h_Bas, l_Bas, h_Droite, l_Droite) {
            let r_hbd = Math.random();
            if (r_hbd < 0.33) {
                self.tab[h_Haut][l_Haut].td.addClass('case-soluce');
                return defCaseSoluce(h_Haut, l_Haut, 'haut');
            }
            else if (r_hbd < 0.67) {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };

        let randomGaucheBasDroite = function (h_Gauche, l_Gauche, h_Bas, l_Bas, h_Droite, l_Droite) {
            let r_gbd = Math.random();
            if (r_gbd < 0.33) {
                self.tab[h_Gauche][l_Gauche].td.addClass('case-soluce');
                return defCaseSoluce(h_Gauche, l_Gauche, 'gauche');
            }
            else if (r_gbd < 0.67) {
                self.tab[h_Bas][l_Bas].td.addClass('case-soluce');
                return defCaseSoluce(h_Bas, l_Bas, 'bas');
            }
            else {
                self.tab[h_Droite][l_Droite].td.addClass('case-soluce');
                return defCaseSoluce(h_Droite, l_Droite, 'droite');
            }
        };



        let defCaseSoluce = function (h, l, mvtPrecedent) {
            if (mvtPrecedent === 'bas'){
                if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) {
                    if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) {
                        if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) {
                            self.case_arrivee = self.tab[h][l];
                        }
                        else if (pasADroite(h, l))  // que à droite
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h][l+1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l+1, 'droite');
                        }
                    }
                    else if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) {  // que en bas
                        if (pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                    }

                    else {  //bas ou droite
                        if (pasEnBas(h, l) || pasADroite(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomBasDroite(h+1, l, h, l+1);
                    }
                }
                else if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) {
                    if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) { // que a gauche
                        if (pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                    }
                    else { // a gauche ou a droite
                        if (pasAGauche(h, l) || pasADroite(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomGaucheDroite(h, l-1, h, l+1);
                    }
                }
                else if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) { // gauche ou bas
                    if (pasAGauche(h, l) || pasEnBas(h, l))
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomGaucheBas(h, l-1, h+1, l);
                }
                else {  // gauche, bas ou droite
                    if (pasAGauche(h, l) || pasEnBas(h, l) || pasADroite(h, l))
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomGaucheBasDroite(h, l-1, h+1, l, h, l+1);
                }
            }



            else if (mvtPrecedent === 'droite') {
                if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) {
                    if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) {
                        if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else if (pasEnHaut(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que en haut
                            self.tab[h-1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h-1, l, 'haut');
                        }
                    }
                    else if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) {
                        if (pasADroite(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que a droite
                            self.tab[h][l+1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l+1, 'droite');
                        }
                    }
                    else {  // en haut ou a droite
                        if (pasEnHaut(h, l) || pasADroite(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomHautDroite(h-1, l, h, l+1);
                    }
                }
                else if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) {
                    if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) { // que en bas
                        if (pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                    }
                    else {  // en bas ou en haut
                        if (pasEnHaut(h, l) || pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomHautBas(h-1, l, h+1, l);
                    }
                }

                else if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) {
                    if (pasEnBas(h, l) || pasADroite(h, l)) //bas ou droite
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomBasDroite(h+1, l, h, l+1);

                }
                else {
                    if (pasEnHaut(h, l) || pasEnBas(h, l) || pasADroite(h, l))
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomHautBasDroite(h-1, l, h+1, l, h, l+1);
                }
            }



            else if (mvtPrecedent === 'haut') {
                if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce') || pasADroite(h, l)) {
                    if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) {
                        if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else if (pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que a gauche
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                    }
                    else if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) {
                        if (pasEnHaut(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que en haut
                            self.tab[h-1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h-1, l, 'haut');
                        }
                    }
                    else {  // en haut ou a gauche
                        if (pasEnHaut(h, l) || pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomHautGauche(h-1, l, h, l-1);
                    }
                }
                else if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) {
                    if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) { // que a droite
                        if (pasADroite(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h][l+1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l+1, 'droite');
                        }
                    }
                    else {  // a droite ou a gauche
                        if (pasADroite(h, l) || pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomGaucheDroite(h, l-1, h, l+1);
                    }
                }

                else if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) {
                    if (pasEnHaut(h, l) || pasADroite(h, l)) //haut ou droite
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomHautDroite(h-1, l, h, l+1);
                }
                else {
                    if (pasEnHaut(h, l) || pasAGauche(h, l) || pasADroite(h, l))
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomHautGaucheDroite(h-1, l, h, l-1, h, l+1);
                }
            }



            else if (mvtPrecedent === 'gauche') {
                if (self.tab[h][l].enHaut === null || self.tab[h][l].enHaut.td.hasClass('case-soluce') || pasEnHaut(h, l)) {
                    if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) {
                        if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else if (pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que en bas
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                    }
                    else if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) {
                        if (pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {  // que a gauche
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                    }
                    else {  // en bas ou a gauche
                        if (pasEnBas(h, l) || pasAGauche(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomGaucheBas(h, l-1, h+1, l);
                    }
                }
                else if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce') || pasAGauche(h, l)) {
                    if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) { // que en haut
                        if (pasEnHaut(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else {
                            self.tab[h-1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h-1, l, 'haut');
                        }
                    }
                    else {  // en haut ou en bas
                        if (pasEnHaut(h, l) || pasEnBas(h, l))
                            self.case_arrivee = self.tab[h][l];
                        else
                            randomHautBas(h-1, l, h+1, l);
                    }
                }

                else if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce') || pasEnBas(h, l)) {
                    if (pasEnHaut(h, l) || pasAGauche(h, l)) //haut ou gauche
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomHautGauche(h-1, l, h, l-1);
                }
                else {
                    if (pasEnHaut(h, l) || pasAGauche(h, l) || pasEnBas(h, l))
                        self.case_arrivee = self.tab[h][l];
                    else
                        randomHautGaucheBas(h-1, l, h, l-1, h+1, l);
                }
            }
            return self.case_arrivee;
        };

        let caseMauvaisChemin = function (h, l) {
            let nbCasesCheminAdj = 0;
            if (!self.tab[h][l].td.hasClass('case-mauvais-chemin') && self.tab[h][l].enHaut !== null &&
                (self.tab[h-1][l].td.hasClass('case-mauvais-chemin') || self.tab[h-1][l].td.hasClass('case-soluce')))
                ++nbCasesCheminAdj;
            if (!self.tab[h][l].td.hasClass('case-mauvais-chemin') && self.tab[h][l].enBas !== null &&
                (self.tab[h+1][l].td.hasClass('case-mauvais-chemin') || self.tab[h+1][l].td.hasClass('case-soluce')))
                ++nbCasesCheminAdj;
            if (!self.tab[h][l].td.hasClass('case-mauvais-chemin') && self.tab[h][l].aGauche !== null &&
                (self.tab[h][l-1].td.hasClass('case-mauvais-chemin') || self.tab[h][l-1].td.hasClass('case-soluce')))
                ++nbCasesCheminAdj;
            if (!self.tab[h][l].td.hasClass('case-mauvais-chemin') && self.tab[h][l].aDroite !== null &&
                (self.tab[h][l+1].td.hasClass('case-mauvais-chemin') || self.tab[h][l+1].td.hasClass('case-soluce')))
                ++nbCasesCheminAdj;
            return nbCasesCheminAdj === 1;

        };

        let defCasesMauvaisChemin = function () {
            let count = 0;
            for (let h = 0 ; h < self.hauteur ; ++h) {
                for (let l = 0 ; l < self.largeur ; ++l) {
                    if (self.tab[h][l].td.hasClass('case-perso') || self.tab[h][l].td.hasClass('case-arrivee'))
                        continue;
                    if (caseMauvaisChemin(h, l)) {
                        self.tab[h][l].td.addClass('case-mauvais-chemin');
                        ++count;
                    }
                }
            }
            return count;
        };

        let defCasesMur = function () {
            for (let h = 0 ; h < self.hauteur ; ++h) {
                for (let l = 0 ; l < self.largeur ; ++l) {
                    if (!self.tab[h][l].td.hasClass('case-soluce') &&
                        !self.tab[h][l].td.hasClass('case-mauvais-chemin') &&
                        !self.tab[h][l].td.hasClass('case-perso'))
                        self.tab[h][l].td.addClass('case-mur');
                }
            }
        };
        


        for (let i = 0 ; i < self.hauteur ; ++i) {
            this.tab.push([]);
            let trActu = $('<tr />');
            for (let j = 0 ; j < self.largeur ; ++j) {
                let td=$('<td />');
                td.attr('id', String(i) + String(j));
                self.tab[i][j] = new Case(trActu, td);

                if (i === self.h_debut && j === self.l_debut) {
                    self.tab[i][j].tr.append(self.tab[i][j].td.addClass('case-perso').addClass('case-soluce'));
                    self.case_perso = self.tab[i][j];
                    self = this;
                }

                else {
                    self.tab[i][j].tr.append(self.tab[i][j].td.addClass('case-laby'));
                }
            }
            $(dest).append(trActu);
        }
        initCases();
        defCaseSoluce(self.h_debut, self.l_debut, 'bas').td.addClass('case-arrivee');

        do {
            var count = 0;
            count = defCasesMauvaisChemin();
        }
        while (count > 0);

        defCasesMur();
    }
}) ();