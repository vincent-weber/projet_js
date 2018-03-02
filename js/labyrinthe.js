let Labyrinthe;

(function() {
    "use strict";

    Labyrinthe = function(hauteur,largeur,dest) {

        this.hauteur = hauteur;
        this.largeur = largeur;
        this.dest = dest;
        this.tab = [];

        // this.setPion = function () {
        //     let a = $(this).data('i');
        //     let b = $(this).data('j');
        //     if (typeof(self.tab[a][b]) === "undefined") {
        //         if(self.joueur1) {
        //             $(this).html('X');
        //             self.tab[a][b] = true;
        //             self.joueur1 = false
        //         }
        //         else {
        //             $(this).html('O');
        //             self.tab[a][b] = false;
        //             self.joueur1 = true
        //         }
        //             $(this).mouseleave().unbind('mouseenter').unbind('mouseleave');
        //     }
        // }


        let self = this;

        console.log('construction du labyrinthe');
        for (let i = 0 ; i < hauteur ; ++i) {
            this.tab.push([]);
            let trActu = $('<tr />');
            for (let j = 0 ; j < largeur ; ++j) {
                let td=$('<td />');
                trActu.append(td.addClass('case-laby'));
                td.addClass('test').data('i',i).data('j',j).click(self.movePerso).append('');
            }
            $(dest).append(trActu);
        }
    }
}) ();