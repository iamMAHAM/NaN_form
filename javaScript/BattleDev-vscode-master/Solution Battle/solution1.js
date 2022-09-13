function ContestResponse() {
  // Implémentez votre code ci-dessous

  let nbreresto=input[0];
  let temp;
  let recupMoyenne =[];
  let note1,note2,note3;
  let notes= input.slice(1);
  for (var i = 0 i <note.length;  i++){
  	temp = notes[i].split(' ');
  	note1= parseInt(temp[0])
  	note2= parseInt(temp[1])
  	note3= parseInt(temp[2])
  	let somme = note1+note2+note3;
  	let moyenne = somme/3;
  	moyenne=Math.ceil(moyenne);
  	recupMoyenne.push(moyenne);
  	//console.log(moyenne)
  }
    console.log(Math.max(...recupMoyenne));
}
// -- Fin de votre code