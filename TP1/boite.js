function table() {
    var grille = document.createElement("table");
    for (var i = 0; i <= 9; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j <= 9; j++) {
            var td = document.createElement("td");
            td.style.width = "20px";
            td.style.height = "20px";
            td.style.border = "thin solid #000000";
            c = new cellule(i,j);
            td.addEventListener("click", function () {
                addCircle(i,j);
            });
            c.dom = td;
            c.initialiser();
            tr.appendChild(c.dom);
        }
        grille.appendChild(tr);
    }
    document.getElementById('jeu').appendChild(grille);
}

function init() {
    var boite = table();
}

function cellule(li, co) {
    this.li = li;
    this.co = co;
    this.etat = -1;
    this.atome = false;
    this.dom = null;
    this.grille = (li > 0) && (li < 9) && (co > 0) && (co < 9);
    this.initialiser = function () {
        var couleur = "";
        if ((this.li === 0 && this.co === 0) || (this.li === 0 && this.co === 9) || (this.li === 9 && this.co === 0) || (this.li === 0 && this.co === 0) || (this.li === 9 && this.co === 9)) {
            // les 4 coins
            couleur = 'grey';
        } else if (this.li === 0 || this.co === 0 || this.li === 9 || this.co === 9) {
            // les boutons latéraux ou les pions joué
            couleur = 'darkgrey';
        } else {
            couleur = "white";
        }
        this.dom.style.backgroundColor = couleur;
    };
}

function addCircle(i,j) {
    alert(i);
}