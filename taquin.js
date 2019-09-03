// fonctions du programme
var tab = [];
var tabBut = [];
$(document).ready(function () {

    var N = 4;


////////////////////////////////////////////////////////////////////
///  création et remplissage du tableau qui sera modifié      /////
//////////////////////////////////////////////////////////////////

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

    //render(tab);

///////////////////////////////////////////////////
///  inverser les valeurs des cases permutées /////
//////////////////////////////////////////////////


    var coord_empty_tile = [3, 3];

    function swapValue([i, j], thisTab) {
        var row_empty_tile = coord_empty_tile[0]
        var col_empty_tile = coord_empty_tile[1]

        var temp = thisTab[i][j]
        thisTab[i][j] = thisTab[row_empty_tile][col_empty_tile]
        thisTab[row_empty_tile][col_empty_tile] = temp

        coord_empty_tile = [i, j];

        return thisTab
    }


    //Fonction qui récupère l'index de "Case_Vide" dans un tableau //
    function getIndexOfV(tab, Case_Vide) {
        for (let i = 0; i < tab.length; i++) {
            let index = tab[i].indexOf(Case_Vide);
            if (index > -1) {
                return [i, index];
            }
        }
    }


    // function whereIsTheEmptyCase() {
    //     // TODO
    //     for (var c = 0; c < tab.length; c++) {
    //         for (var d = 0; d < tab.length; d++) {
    //             return [i, j]
    //         }

    //var newStateTab = tab.slice();


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
        for (var k = 0; k < 1; k++) {
            var tableau_regles = coupsPossibles()
            swapValue(tableau_regles[Math.floor(Math.random() * tableau_regles.length)], tab)

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


    function isSolved(newStateTab, tabBut) {     // équivalent de "est_gagnant", compare les deux tableaux pour voir si l'état actuel correspond au tableau résolu
        console.log(newStateTab);
        for (var a = 0; a < newStateTab.length; a++) {
            for (var b = 0; b < newStateTab[a].length; b++) {
                if (newStateTab[a][b] != tabBut[a][b]) {
                    return false
                }
            }
        }
        return true
    }


// boucle sur les lignes et les colonnes
//comparer élément [i][j] du tableau réel et du tableau but
// si élements différents -> isSolved = false


    function Solve(newStateT, depth) { // trad algo en code
        if (depth > 2) {
            return false
        }
        if (isSolved(newStateT, tabBut)) {
            return true
        }

        var coupsPossActu = coupsPossibles();
        for (var x = 0; x < coupsPossActu.length; x++) {
            // On applique le mouvement x sur tab
            render(newStateT)
            let nouv_tab = JSON.parse(JSON.stringify(newStateT))git
            // TODO: excuter méthode de recherche de la case vide
            getIndexOfV(nouv_tab, "15")
            console.log(getIndexOfV(nouv_tab, "15"))
            nouv_tab = swapValue(coupsPossActu[x], nouv_tab)

            render(nouv_tab)
            // if (Solve(nouv_tab, depth + 1)) {
            //     return true;
            // }
        }
        return false

    }



    $(document).on('click', '#resoudre', function () {
        if (Solve(tab, 0) == true) {
            alert('win')
        } else {
            alert("lose")
        }
    });




});

// stocker les modifications de mon tableau dans des variables au nom clair
// pour éviter les conflits de scope et appeler la bonne version de l'instantanné de mon tableau (son état)

// deux boucles sur mon tableau bi-dimensionnel pour trouver la valeur 15. détermine les coordonnées de la case vide (15)