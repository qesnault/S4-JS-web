var univers; 

function table() {
    var grille = document.createElement("table");
    for (var i = 0; i <= 9; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j <= 9; j++) {
            var td = document.createElement("td");
            td.style.width = "25px";
            td.style.height = "25px";
            td.style.border = "thin solid #000000";
            c = new cellule(i, j);
            c.dom = td;
            c.initialiser();
            univers[i][j] = c;
            tr.appendChild(c.dom);
        }
        grille.appendChild(tr);
    }
    document.getElementById('jeu').appendChild(grille);
}

function init() {
    creerUnivers();
    var boite = table();
    fillRandom();
}

function cellule(li, co) {
    this.li = li;
    this.co = co;
    this.etat = -1;
    this.atome = false;
    this.dom = null;
    this.colorChanged = false;
    this.grille = (li > 0) && (li < 9) && (co > 0) && (co < 9);
    var that = this;


    this.initialiser = function () {
        var couleur = "";
        if ((this.li === 0 && this.co === 0) || (this.li === 0 && this.co === 9) || (this.li === 9 && this.co === 0) || (this.li === 0 && this.co === 0) || (this.li === 9 && this.co === 9)) {
            // les 4 coins
            couleur = 'grey';
        } else if (this.li === 0 || this.co === 0 || this.li === 9 || this.co === 9) {
            // les boutons latéraux ou les pions joué
            couleur = 'darkgrey';
            this.dom.addEventListener("click", function () {
                changeColor(that);
            }, false);
        } else {
            couleur = "white";
            this.dom.addEventListener("click", function () {
                addCircle(that);
            }, false);
        }
        this.dom.style.backgroundColor = couleur;
    };
}

function addCircle(c) {
    if (!c.atome) {
        var circle = document.createElement("canvas");
        circle.id = "cellule" + c.li + c.co;
        circle.width = 20;
        circle.height = 20;
        var ctx = circle.getContext("2d");
        ctx.beginPath();
        ctx.arc(11, 11, 9, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
        c.dom.appendChild(circle);
        c.atome = true;
    } else {
        var circle = document.getElementById("cellule" + c.li + c.co);
        c.dom.removeChild(circle);
        c.atome = false;
    }
}

function changeColor(c) {
    if (!c.changeColor) {
        c.dom.style.backgroundColor = getRandomColor();
        c.changeColor = true;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function creerUnivers() {
    var li, co, ligne;
    univers = [];
    for (li = 0; li < 10; li += 1) {
        ligne = [];
        for (co = 0; co < 10; co += 1) {
            ligne.push(new cellule(li, co));
        }
        univers.push(ligne);
    }
}

function fillRandom(){
    for(var i =0; i<5;){
        var x = randomInt(8)+1;
        var y = randomInt(8)+1;
        var cell = univers[2][3];
        i++;
        if(!cell.atome){
            addCircle(cell);
        }
    }
}

function randomInt(n){
    Math.floor(Math.random() * Math.floor(n)); // returns a random integer from 0 to n-1
}