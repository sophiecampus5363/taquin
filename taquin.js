// fonctions du programme
var tab=[];
$(document).ready(function(){

var N=4;


///////////////////////////////////////////////////
///  création et remplissage du tableau      /////
//////////////////////////////////////////////////

for(var i=0; i<N; i++){
    var row=[];
    for (var j=0; j<N; j++){
        row.push(i*N+j)
    }
    tab.push(row);
}

function render(tab){
  //  var element = $("#L1c3")
   // element.text(tab[2][1]);

    for(var i=0; i<N; i++){
        for (var j=0; j<N; j++){
            var selector = "#L"+i+"c"+j;
            const val = tab[i][j];
            $(selector).text(val);
            if(val===15) {
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


var coord_empty_tile = [3,3];

function swapValue(i, j) {
    var row_empty_tile = coord_empty_tile[0]
    var col_empty_tile = coord_empty_tile[1]

    var temp = tab[i][j]
    tab[i][j] = tab[row_empty_tile][col_empty_tile]
    tab[row_empty_tile][col_empty_tile] = temp

    coord_empty_tile = [i,j] ;


}

swapValue(2,3);

render(tab);


///////////////////////////////////////
///  Tableau des coups possibles /////
//////////////////////////////////////


function coupsPossible(){

    var row_empty_tile = coord_empty_tile[0]
    var col_empty_tile = coord_empty_tile[1]

    var coups = [];

    if(row_empty_tile < 3)
    {
        coups.push([row_empty_tile+1, col_empty_tile])
    }

    if(row_empty_tile > 0)
    {
        coups.push([row_empty_tile -1, col_empty_tile])
    }

    if(col_empty_tile < 3)
    {
        coups.push([col_empty_tile+1, row_empty_tile])
    }

    if(col_empty_tile > 0)
    {
        coups.push([col_empty_tile-1, row_empty_tile])
    }


    return coups;

}

coupsPossible()

///////////////////////////////////////////////////
///             déplacements pour mélanger     ////
// ///////////////////////////////////////////////







// boucle qui prend un coup possible, le joue, et qui recommence, tenter plusieurs nbre de boucles, 3, 20, 30


//melanger_taquin()
//partir de la solution (le taquin résolu) et mélanger. Faire un test pour vérifier que le taquin est résoluble.
// si le nombre de cases de la ligne est pair le nombre de permutations nécessaire doit être pair et inversement.

//est_resolu()

//position_case_vide(numero_colonne, numero_ligne)
// les numéros débutent à zéro

//numero_piece()
//renvoie la valeur faciale de la pièce à l'intersection de la colonne x et de la ligne y
//Si cette case est vide, le numéro renvoyé est n2, si n est la taille du taquin.

//echanger (c1, c2)
//échange les pièces situées dans les cases de coordonnées c1 et c2

//déplacable()
//vérifie si un élément peut être déplacé

});