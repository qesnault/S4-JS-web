var univers;
var debug = false;
var score = 0;

function table() {
    var grille = document.createElement("table");
    for (var i = 0; i <= 9; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j <= 9; j++) {
            var td = document.createElement("td");
            td.style.width = "50px";
            td.style.height = "50px";
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
    this.flag = false;
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
                var color = getRandomColor();
                changeColor(that, color);
                score += 1;
                if (that.li === 0) {
                    resultatDuTir(that, 1, 0, color);
                } else if (that.li === 9) {
                    resultatDuTir(that, -1, 0, color);
                } else if (that.co === 0) {
                    resultatDuTir(that, 0, 1, color);
                } else {
                    resultatDuTir(that, 0, -1, color);
                }
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
    if (!c.flag) {
        var circle = document.createElement("canvas");
        circle.id = "cellule" + c.li + c.co;
        circle.width = 46;
        circle.height = 46;
        var ctx = circle.getContext("2d");
        ctx.beginPath();
        ctx.arc(25, 25, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
        c.dom.appendChild(circle);
        c.atome = true;
        c.flag = true;
    } else {
        var circle = document.getElementById("cellule" + c.li + c.co);
        c.dom.removeChild(circle);
        c.atome = false;
        c.flag = false;
    }
}

function changeColor(c, color) {
    if (!c.changeColor) {
        if (color == null) {
            color = getRandomColor();
        }
        c.dom.style.backgroundColor = color;
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

function fillRandom() {
    for (var i = 0; i < 5;) {
        var x = randomInt(8) + 1;
        var y = randomInt(8) + 1;
        var cell = univers[x][y];
        if (!cell.atome) {
            if (debug) {
                addCircle(cell);
            } else {
                cell.atome = true;
            }
            i++;
        }
    }
}

function randomInt(n) {
    return Math.floor(Math.random() * Math.floor(n)); // returns a random integer from 0 to n-1
}

function resultatDuTir(cellule, vl, vc, color) {
    var s = univers[cellule.li + vl][cellule.co + vc];
    if (!s.grille) {
        score += 1;
        changeColor(s, color);
        return s; // Si bord de la grille
    }
    if (s.atome) {
        return null; // Absorption
    }
    if (vc === 0) {
        if (univers[s.li][s.co - 1].atome) {
            if (!cellule.grille) {
                return cellule;
            }
            return resultatDuTir(cellule, 0, 1, color);
        } else if (univers[s.li][s.co + 1].atome) {
            if (!cellule.grille) {
                return cellule;
            }
            return resultatDuTir(cellule, 0, -1, color);
        }
    } else {
        if (univers[s.li - 1][s.co].atome) {
            if (!cellule.grille) {
                return cellule;
            }
            return resultatDuTir(cellule, 1, 0, color);
        } else if (univers[s.li + 1][s.co].atome) {
            if (!cellule.grille) {
                return cellule;
            }
            return resultatDuTir(cellule, -1, 0, color);
        }
    }
    changeColor(s, color);
    return resultatDuTir(s, vl, vc, color);
}

function calcScore() {
    var tempScore = 0;
    for (li = 0; li < 10; li += 1) {
        for (co = 0; co < 10; co += 1) {
            var s = univers[li][co];
            if (s.atome) {
                if (!s.flag) {
                    tempScore += 5; //if atome but not flag
                }
            } else if (s.flag) {
                tempScore += 5; //if flag but no atome
            }
        }
    }
    return tempScore;
}

function showResult(){
    alert("Résulat = " + (score+calcScore()));
}

function debug1(){
    for (li = 0; li < 10; li += 1) {
        for (co = 0; co < 10; co += 1) {
            var s = univers[li][co];
            if (s.atome) {
                addCircle(s);
            }
        }
    }
}