let Labyrinthe;

(function() {
    "use strict";

    Labyrinthe = function(hauteur,largeur,dest) {

        this.hauteur = hauteur;
        this.largeur = largeur;
        this.dest = dest;
        this.tab = [];
        this.player_hauteur = 0;
        this.player_largeur = 0;
        this.count = 0;


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
        }

        let defCaseSoluce = function (h, l, mvtPrecedent) {
            ++self.count;
            console.log(self.count);
            console.log(mvtPrecedent);
            if (mvtPrecedent === 'bas'){
                if (self.tab[h][l].aGauche === null || self.tab[h][l].aGauche.td.hasClass('case-soluce')) {
                    if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce')) {
                        if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce')) {
                            return -1;
                        }
                        else if (self.tab[h][l].aDroite.enHaut !== null && self.tab[h][l].aDroite.enHaut.td.hasClass('case-soluce')    ||  // que à droite
                                (self.tab[h][l].aDroite.aDroite !== null && self.tab[h][l].aDroite.aDroite.td.hasClass('case-soluce')) ||
                                (self.tab[h][l].aDroite.enBas !== null   && self.tab[h][l].aDroite.enBas.td.hasClass('case-soluce')))
                            return -1;
                        else {
                            self.tab[h][l+1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l+1, 'droite');
                        }
                    }
                    if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce')) {  // que en bas
                        if ((self.tab[h][l].enBas.aGauche !== null && self.tab[h][l].enBas.aGauche.td.hasClass('case-soluce')) ||
                            (self.tab[h][l].enBas.enBas !== null && self.tab[h][l].enBas.enBas.td.hasClass('case-soluce')) ||
                            (self.tab[h][l].enBas.aDroite !== null && self.tab[h][l].enBas.aDroite.td.hasClass('case-soluce')))
                            return -1;
                        else {
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                    }

                    else {  //bas ou droite
                        if ((self.tab[h][l].enBas.aGauche !== null && self.tab[h][l].enBas.aGauche.td.hasClass('case-soluce'))     ||
                            (self.tab[h][l].enBas.enBas !== null && self.tab[h][l].enBas.enBas.td.hasClass('case-soluce'))         ||
                            (self.tab[h][l].enBas.aDroite !== null && self.tab[h][l].enBas.aDroite.td.hasClass('case-soluce'))     ||
                            (self.tab[h][l].aDroite.enHaut !== null && self.tab[h][l].aDroite.enHaut.td.hasClass('case-soluce'))   ||
                            (self.tab[h][l].aDroite.aDroite !== null && self.tab[h][l].aDroite.aDroite.td.hasClass('case-soluce')) ||
                            (self.tab[h][l].aDroite.enBas !== null   && self.tab[h][l].aDroite.enBas.td.hasClass('case-soluce')))
                            return -1;
                        else {
                            let r_bd_B = Math.random();
                            console.log(r_bd_B);
                            if (r_bd_B < 0.5) {
                                self.tab[h+1][l].td.addClass('case-soluce');
                                return defCaseSoluce(h+1, l, 'bas');
                            }
                            else {
                                self.tab[h][l+1].td.addClass('case-soluce');
                                return defCaseSoluce(h, l+1, 'droite');
                            }
                        }
                    }
                }
                if (self.tab[h][l].enBas === null || self.tab[h][l].enBas.td.hasClass('case-soluce')) {
                    if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce')) { // que a gauche
                        if (self.tab[h][l].aGauche.enHaut !== null && self.tab[h][l].aGauche.enHaut.td.hasClass('case-soluce')    ||
                           (self.tab[h][l].aGauche.aGauche !== null && self.tab[h][l].aGauche.aGauche.td.hasClass('case-soluce')) ||
                           (self.tab[h][l].aGauche.enBas !== null && self.tab[h][l].aGauche.enBas.td.hasClass('case-soluce')))
                            return -1;
                        else {
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                    }
                    else { // a gauche ou a droite
                        if (self.tab[h][l].aGauche.enHaut !== null && self.tab[h][l].aGauche.enHaut.td.hasClass('case-soluce') ||
                           (self.tab[h][l].aGauche.aGauche !== null && self.tab[h][l].aGauche.aGauche.td.hasClass('case-soluce')) ||
                           (self.tab[h][l].aGauche.enBas !== null   && self.tab[h][l].aGauche.enBas.td.hasClass('case-soluce'))   ||
                           (self.tab[h][l].aDroite.enHaut !== null && self.tab[h][l].aDroite.enHaut.td.hasClass('case-soluce'))   ||
                           (self.tab[h][l].aDroite.aDroite !== null && self.tab[h][l].aDroite.aDroite.td.hasClass('case-soluce')) ||
                           (self.tab[h][l].aDroite.enBas !== null   && self.tab[h][l].aDroite.enBas.td.hasClass('case-soluce')))
                            return -1;
                        else {
                            let r_gd_B = Math.random();
                            if (r_gd_B < 0.5) {
                                self.tab[h][l-1].td.addClass('case-soluce');
                                return defCaseSoluce(h, l-1, 'gauche');
                            }
                            else {
                                self.tab[h][l+1].td.addClass('case-soluce');
                                return defCaseSoluce(h, l+1, 'droite');
                            }
                        }
                    }
                }
                if (self.tab[h][l].aDroite === null || self.tab[h][l].aDroite.td.hasClass('case-soluce')) { // gauche ou bas
                    if (self.tab[h][l].aGauche.enHaut !== null && self.tab[h][l].aGauche.enHaut.td.hasClass('case-soluce')    ||
                       (self.tab[h][l].aGauche.aGauche !== null && self.tab[h][l].aGauche.aGauche.td.hasClass('case-soluce')) ||
                       (self.tab[h][l].aGauche.enBas !== null   && self.tab[h][l].aGauche.enBas.td.hasClass('case-soluce'))   ||
                       (self.tab[h][l].enBas.aGauche !== null   && self.tab[h][l].enBas.aGauche.td.hasClass('case-soluce'))   ||
                       (self.tab[h][l].enBas.enBas !== null     && self.tab[h][l].enBas.enBas.td.hasClass('case-soluce'))     ||
                       (self.tab[h][l].enBas.aDroite !== null   && self.tab[h][l].enBas.aDroite.td.hasClass('case-soluce')))
                        return -1;
                    else {
                        let r_gb_B = Math.random();
                        if (r_gb_B < 0.5) {
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                        else {
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                    }
                }
                else {  // gauche, bas ou droite
                    if (self.tab[h][l].aGauche.enHaut !== null && self.tab[h][l].aGauche.enHaut.td.hasClass('case-soluce')     ||
                        (self.tab[h][l].aGauche.aGauche !== null && self.tab[h][l].aGauche.aGauche.td.hasClass('case-soluce')) ||
                        (self.tab[h][l].aGauche.enBas !== null   && self.tab[h][l].aGauche.enBas.td.hasClass('case-soluce'))   ||
                        (self.tab[h][l].enBas.aGauche !== null   && self.tab[h][l].enBas.aGauche.td.hasClass('case-soluce'))   ||
                        (self.tab[h][l].enBas.enBas !== null     && self.tab[h][l].enBas.enBas.td.hasClass('case-soluce'))     ||
                        (self.tab[h][l].enBas.aDroite !== null   && self.tab[h][l].enBas.aDroite.td.hasClass('case-soluce'))   ||
                        (self.tab[h][l].aDroite.enHaut !== null && self.tab[h][l].aDroite.enHaut.td.hasClass('case-soluce'))   ||
                        (self.tab[h][l].aDroite.aDroite !== null && self.tab[h][l].aDroite.aDroite.td.hasClass('case-soluce')) ||
                        (self.tab[h][l].aDroite.enBas !== null   && self.tab[h][l].aDroite.enBas.td.hasClass('case-soluce')))
                        return -1;
                    else {
                        let r_gbd_B = Math.random();
                        if (r_gbd_B < 0.33) {
                            self.tab[h][l-1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l-1, 'gauche');
                        }
                        else if (r_gbd_B < 0.67) {
                            self.tab[h+1][l].td.addClass('case-soluce');
                            return defCaseSoluce(h+1, l, 'bas');
                        }
                        else {
                            self.tab[h][l+1].td.addClass('case-soluce');
                            return defCaseSoluce(h, l+1, 'droite');
                        }
                    }
                }
            }
            else if (mvtPrecedent === 'gauche') {

            }
        }

        console.log('construction du labyrinthe');
        for (let i = 0 ; i < self.hauteur ; ++i) {
            this.tab.push([]);
            let trActu = $('<tr />');
            for (let j = 0 ; j < self.largeur ; ++j) {
                let td=$('<td />');
                td.attr('id', String(i) + String(j));

                self.tab[i][j] = new Case(trActu, td);

                if (i===0 && j===0) {
                    self.tab[i][j].tr.append(self.tab[i][j].td.addClass('case-perso'));
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
        defCaseSoluce(0, 0, 'bas');
        console.log(self);
    }
}) ();