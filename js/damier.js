let Labyrinthe;

(function() {
    "use strict";

    Labyrinthe = function(x,y,dest) {

        this.x = x;
        this.y = y;
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

        this.movePerso = function() {
            let a = $(this).data('i');
            let b = $(this).data('j');
            if (typeof(self.tab[a-1][b]) !== "undefined" || !(self.tab[a-1][b])) {
                self.tab[a][b] = true;
                $(this).html('O');
                self.tab[a-1][b] = "false";
                //enlever le symbole sur la case d'avant
            }
            else if (typeof(self.tab[a+1][b]) !== "undefined" || !(self.tab[a+1][b])) {
                self.tab[a][b] = true;
                $(this).html('O');
                self.tab[a+1][b] = "false";
            }
            else if (typeof(self.tab[a][b-1]) !== "undefined" || !(self.tab[a][b-1])) {
                self.tab[a][b] = true;
                $(this).html('O');
                self.tab[a][b-1] = "false";
            }
            else if (typeof(self.tab[a][b+1]) !== "undefined" || !(self.tab[a][b+1])) {
                self.tab[a][b] = true;
                $(this).html('O');
                self.tab[a][b+1] = "false";
            }
        }

        let self = this;

        console.log('construction du labyrinthe');
        for (let i = 0 ; i < x ; ++i) {
            this.tab.push([]);
            let trActu = $('<tr />');
            for (let j = 0 ; j < y ; ++j) {
                let td=$('<td />');
                if (i===0 && j===0) {
                    //td.html('O');
                    self.tab[i][j] = "true";
                }
                self.tab[i][j] = "false";
                trActu.append(td.addClass('case-laby'));
                td.addClass('test').data('i',i).data('j',j).click(self.movePerso).append('');
            }
            $(dest).append(trActu);
        }
    }
}) ();