// fonctions du programme
var tab=[];
var tabBut=[];
$(document).ready(function(){

var N=4;


///////////////////////////////////////////////////
///  création et remplissage du tableau qui sera modifié      /////
//////////////////////////////////////////////////

for(var i=0; i<N; i++){
    var row=[];
    for (var j=0; j<N; j++){
        row.push(i*N+j)
    }
    tab.push(row);
}

///////////////////////////////////////////////////////////////////
///  création et remplissage du tableau BUT = jeu résolu     /////
//////////////////////////////////////////////////////////////////


    for(var i=0; i<N; i++){
        var row=[];
        for (var j=0; j<N; j++){
            row.push(i*N+j)
        }
        tabBut.push(row);
    }



function render(tab){
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

function swapValue([i, j]) {
    var row_empty_tile = coord_empty_tile[0]
    var col_empty_tile = coord_empty_tile[1]

    var temp = tab[i][j]
    tab[i][j] = tab[row_empty_tile][col_empty_tile]
    tab[row_empty_tile][col_empty_tile] = temp

    coord_empty_tile = [i,j] ;


}


//stocker état de mon tableau dans autre variable pour pouvoir annuler coup précédent, annuler swap, retrouver coord d'avant swap


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
        coups.push([ row_empty_tile, col_empty_tile+1,])
    }

    if(col_empty_tile > 0)
    {
        coups.push([ row_empty_tile, col_empty_tile-1])
    }


    return coups;

}



///////////////////////////////////////////////////
///             déplacements pour mélanger     ////
// ///////////////////////////////////////////////

function shuffleTiles() {
    for (var k = 0; k < 3; k++) {
        var tableau_regles = coupsPossible()
        swapValue(tableau_regles[Math.floor(Math.random()*tableau_regles.length)])

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
//

function isSolved(tab[], tabBut[]){

    if(tab=tabBut){
      isSolved() == true;

    }

// boucle sur les lignes et les colonnes
//comparer élément [i][j] du tableau réel et du tableau but
// si élements différents -> isSolved = false


//
// function Solve(){ // trad algo en code
//     var maxDepth
//     var depth
//     if(depth > maxDepth){
//         alert(taquin non résolu)
//      if
//     }
// }









//est_resolu()



//numero_piece()
//renvoie la valeur faciale de la pièce à l'intersection de la colonne x et de la ligne y
//Si cette case est vide, le numéro renvoyé est n2, si n est la taille du taquin.

//echanger (c1, c2)
//échange les pièces situées dans les cases de coordonnées c1 et c2

//déplacable()
//vérifie si un élément peut être déplacé

});