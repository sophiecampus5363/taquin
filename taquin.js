// fonctions du programme
const tab = [];
const tabBut = [];
$(document).ready(function () {

    var N = 4;


///////////////////////////////////////////////////
///  création et remplissage du tableau qui sera modifié      /////
//////////////////////////////////////////////////

    for (var i = 0; i < N; i++) {
        var row = [];
        for (var j = 0; j < N; j++) {
            row.push(i * N + j)
        }
        tab.push(row);
    }

///////////////////////////////////////////////////////////////////
///  création et remplissage du tableau BUT = jeu résolu     /////
//////////////////////////////////////////////////////////////////


    for (var i = 0; i < N; i++) {
        var row = [];
        for (var j = 0; j < N; j++) {
            row.push(i * N + j)
        }
        tabBut.push(row);
    }


    function render(tab) {
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                var selector = "#L" + i + "c" + j;
                const val = tab[i][j];
                $(selector).text(val);
                if (val === 15) {
                    $(selector).addClass("empty_tile")
                } else {
                    $(selector).removeClass("empty_tile")
                }
            }
        }


    }

    render(tab);

///////////////////////////////////////////////////
///  inverser les valeurs des cases permutées /////
//////////////////////////////////////////////////


    var coord_empty_tile = [3, 3];

    function swapValue([i, j]) {
        var row_empty_tile = coord_empty_tile[0]
        var col_empty_tile = coord_empty_tile[1]

        var temp = tab[i][j]
        tab[i][j] = tab[row_empty_tile][col_empty_tile]
        tab[row_empty_tile][col_empty_tile] = temp

        coord_empty_tile = [i, j];


    }


//stocker état de mon tableau dans autre variable pour pouvoir annuler coup précédent, annuler swap, retrouver coord d'avant swap


///////////////////////////////////////
///  Tableau des coups possibles /////
//////////////////////////////////////


    function coupsPossibles() {

        var row_empty_tile = coord_empty_tile[0]
        var col_empty_tile = coord_empty_tile[1]

        var coups = [];

        if (row_empty_tile < 3) {
            coups.push([row_empty_tile + 1, col_empty_tile])
        }

        if (row_empty_tile > 0) {
            coups.push([row_empty_tile - 1, col_empty_tile])
        }

        if (col_empty_tile < 3) {
            coups.push([row_empty_tile, col_empty_tile + 1,])
        }

        if (col_empty_tile > 0) {
            coups.push([row_empty_tile, col_empty_tile - 1])
        }


        return coups;

    }


///////////////////////////////////////////////////
///             déplacements pour mélanger     ////
// ///////////////////////////////////////////////

    function shuffleTiles() {
        for (var k = 0; k < 3; k++) {
            var tableau_regles = coupsPossibles()
            swapValue(tableau_regles[Math.floor(Math.random() * tableau_regles.length)])

        }
    }

    shuffleTiles()
    render(tab);

///////////////////////////////////////////////////
///            résolution d'un jeu            ////
// ///////////////////////////////////////////////


//génération de parcours
// tentative de remettre chaque case à sa place d'origine
// comparer deux tableaux : actuel et  but à atteindre


    function isSolved(tab, tabBut) {     // équivalent de "est_gagnant", compare les deux tableaux pour voir si l'état actuel correspond au tableau résolu
        console.log(tab);
        for (var a = 0; a < tab.length; a++) {
            for (var b = 0; b < tab[a].length; b++) {
                if (tab[a][b] != tabBut[a][b]) {
                    return false
                }
            }
        }
        return true
    }


// boucle sur les lignes et les colonnes
//comparer élément [i][j] du tableau réel et du tableau but
// si élements différents -> isSolved = false



    function Solve(tab, depth) { // trad algo en code

        if (depth > 4) {
            return false
        }
        if (isSolved(tab, tabBut)) {
            return true
        }

        var coupsPossActu = coupsPossibles();
        for (var x = 0; x < coupsPossActu.length; x++) {
            var nouv_tab = swapValue(coord_empty_tile); // On applique le mouvement x sur tab
            if (Solve(nouv_tab, depth + 1)) {
                return true;
            }
        }
        return false

    }

    $(document).on('click', '#resoudre', function() {
        Solve(tab, 0);
    });

});

// stocker les modifications de mon tableau dans des variables au nom clair
// pour éviter les conflits de scope et appeler la bonne version de l'instantanné de mon tableau (son état)