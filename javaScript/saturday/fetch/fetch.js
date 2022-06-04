
function pt()
{
  return new Promise((success, failed) => {
    // success("ok")
    success("lololollrkf,ke,frrfreferfref")
  })
}

window.addEventListener("load", async () =>{
  let res = await fetch("../index.txt", {
    method: "POST",
    body: "hello"
  })
  console.log(res)
})
