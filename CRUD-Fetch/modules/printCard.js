export const printCardsHouses = (contenedor, arrayHouses) => {
    contenedor.innerHTML = "";

    arrayHouses.forEach(house => {
        const article = document.createElement("article");
        article.classList.add("main__card");
        article.innerHTML = `
        <article class="Card">
        <img  src="${house.image}" alt="">
        <button class="ForSale">FOR SALE</button>
        <button class="Departament">DEPARTAMENT</button>
        <button class="card__delete" name='${house.id}'>❌</button>
                <button class="card__edit" name='${house.id}'>✏</button>
                <button class="card__price" >$2,500.oo</button>
                <button class="card__favorite" name='${house.id}'>❤</button>

        <h4 src="${house.city}">Beverly Hills, California </h4>
        <p> 272 SW Brooklyn AV, Brooklyn,CA</p>
        <p> 7310, USA </p>
        <figure class="figureCero">    
        <figure class="figureUno">
            <img src="${house.image}"
            <p>Carlos Sebastián                   </p>
        
        </figure>
        <p>4 months ago</p>
        </figure>

        <figure class="FigureHugeOne">
            <figure class="FigureHugeOneTwo">
            <img src="./icons/Fill 3 (1).png" alt="">
            <p src="${house.Squaredfeet}"> 240 S.ft.</p>
            </figure>
            <figure class="FigureHugeTwo">
                <img src="./icons/Fill 1.png" alt="">
                <p=src="${house.restrooms}">2</p>   
                <img src="./icons/Fill 4.png" alt="">
                 <p src="${house.rooms}">3</p>
                 <img src="./icons/Rectangle.png" alt="">
                <p src="${house.parking}">5</p>
            </figure>    
        </figure>
    </figure>
</article>
        `;

        contenedor.appendChild(article);
    });
};
