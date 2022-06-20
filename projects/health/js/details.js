
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


function detail()
{
    
    let container = document.querySelector(".container")
    let details = JSON.parse(localStorage.getItem("detail").trim())
    let content = 
    `
    <div class="left">
        <img src="${details.img.replace("product_thumbnail","product_show")}" alt="" class="img">
        </div>
    
        <div class="right">
        <div class="top">
            <p>${details.redirect.split("-").join(" ").replace("/fr/", "")}</p>
            <p class="green" style="text-transform: uppercase;">${details.title}</p>
        </div>
    
        <div class="center">
            <p>${details.description}</p>
            <div class="row"><p class="bold">Pour qui : </p><p>${details.who}</p></div>
            <div class="row"><p class="bold">Femme Enceinte : </p><p>${details.authw}</p></div>
            <div class="row"><p class="bold">Allaitement : </p><p>${details["milk-c"]}</p></div>
            <div class="row"><p class="bold">Forme : </p><p>${details.figure}</p></div>
        </div>
        <div class="bottom-d">
            <div class="price">
                <input type="number" value="1" min="1" name="0" id="number">
            </div>
            <span class="rt-price">${details.prices}</span>
            <button>add to cart</button>
        </div>
    </div>
    `
    container.innerHTML = content
}

window.addEventListener("load", detail)