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


        let self = this;

        console.log('construction du labyrinthe');
        for (let i = 0 ; i < hauteur ; ++i) {
            this.tab.push([]);
            let trActu = $('<tr />');
            for (let j = 0 ; j < largeur ; ++j) {
                let td=$('<td />');
                td.attr('id', String(i) + String(j));

                self.tab[i][j] = new Case(trActu, td);

                if (i===0 && j===0) {
                    trActu.append(td.addClass('case-perso'));
                    self.case_perso = self.tab[i][j];
                    self = this;
                    console.log(self);
                }
                else if (i%2 === 1 && j%2 === 1)
                    trActu.append(td.addClass('case-mur'));
                else {
                    trActu.append(td.addClass('case-laby'));
                }
            }
            $(dest).append(trActu);
        }
    }
}) ();