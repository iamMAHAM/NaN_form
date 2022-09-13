function ContestResponse() {
  // Implémentez votre code ci-dessous

 	let prixP =Number(input[0]);
 	let Tser = Number(input[1]);
 	let persT = input.slice(2);
 	let montantV = 0;
 	let somme = 0;


 	for (var i =0; i < persT.length; i++) {

 		let np = Number(persT[i]);
 		let vente = np* prixP;


 		if(np>=10){
 			vente = vente*(0.7);
 		}
 		else if(np>=6){
 			vente = vente*(0.8);
 		}
 		else if(np>=4){
 			vente = vente*(0.9);
 		}

 		somme = somme+vente;

 	}
 	console.log(Math.ceil(somme));


}
// -- Fin de votre code