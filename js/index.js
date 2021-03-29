const VARIABLE_URL_TEAM = "team";
const VARIABLE_URL_GROUP = "group";

const createElement = (tag, name, value) => {
    let element = document.createElement(tag);
    if (name != null) {
        element.classList.add(name);
    }
    if (value != null) {
        element.append(value);
    }
    return element;
}

const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const MenuRusia = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'rusia.json');
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            $("#menu li.nav-item-gr").each((a, b) => {
                let at = b.getAttribute("data-type");
                let gr = datos.grupos[at];
                let fragment = new DocumentFragment();

                for (let i = 1; i <= 4; i++) {
                    let link = createElement("A", "nav-link", gr[i].name);
                    link.setAttribute("href", `group.html?group=${at}&team=${i}`)
                    fragment.append(createElement("LI", null, link));
                }
                let li = createElement("DIV", "text-center", fragment);
                let ul = createElement("UL", "dropdown-menu", li);
                b.append(ul);
            });
        }
    }
}


const teamRusia = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'rusia.json');
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let gp = getParameterByName(VARIABLE_URL_GROUP);
            let tm = getParameterByName(VARIABLE_URL_TEAM);
            if(gp == null || gp.length == 0){
                window.location="index.html";
            }else if(tm == null || tm.length == 0){
                window.location="index.html";
            }
            let gr = datos.grupos[gp][tm];
            console.log(gr);
            // FRAGMENT
            let fragment = new DocumentFragment();
            let title = createElement("H1", "title", gr.name);
            let desc = createElement("P", null, gr.description);
            fragment.append(title);
            fragment.append(desc);
            let containerA = createElement("DIV", null, fragment);
            containerA.classList.add("col-xs-12", "col-sm-9");
            let containerB = createElement("DIV", null, containerA);
            containerB.classList.add("page-header", "row");
            let containerC = createElement("DIV", null, null);
            containerC.classList.add("col-xs-12", "col-sm-3", "text-center");
            let imgA = createElement("IMG", "image-rusia", null);
            imgA.setAttribute("src", gr.image.shield);
            let imgB = createElement("IMG", "image-rusia", null);
            imgB.setAttribute("src", gr.image.team);
            let imgC = createElement("IMG", "image-rusia", null);
            imgC.setAttribute("src", gr.image.uniform);
            containerC.append(imgA);
            containerC.append(createElement("i", null, "Escudo"));
            containerC.append(imgB);
            containerC.append(createElement("i", null, "Equipo"));
            containerC.append(imgC);
            containerC.append(createElement("i", null, "Uniforme"));
            containerB.append(containerC);
            let container = createElement("DIV", "container", containerB);
            $("#container-page").append(container);
        }
    }
}

const macthRusia = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'rusia.json');
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let fragment = new DocumentFragment();
            let array= ["a", "b", "c", "d"];
            for(let i = 0; i < array.length; i++){
                for(let aux of datos.match[array[i]]){
                    let leng = Object.getOwnPropertyNames(aux).length;
                    for(let aux2 = 0; aux2 < leng; aux2++){
                        let tr = createElement("TR", null, null);
                        let tdA = createElement("TD", null, aux[1+ aux2].e1);
                        let tdB = createElement("TD", null, aux[1+ aux2].e2);
                        let tdC = createElement("TD", null, aux[1+aux2].date);
                        tr.append(tdA);
                        tr.append(tdB);
                        tr.append(tdC);
                        fragment.append(tr);
                    }
                }
            }
            $("#container-page-team-tlb").append(fragment);
        }
    }
}

