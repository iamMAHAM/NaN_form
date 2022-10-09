const container = document.querySelector<HTMLDivElement>(".container")
const info = document.querySelector<HTMLDivElement>(".recoltedInfo")
const submit = document.querySelector<HTMLInputElement>("input[type='submit']")
const form = document.querySelector('form')

submit?.addEventListener('click', (e: Event)=>{
    const children = form?.elements
    e.preventDefault()
    if (children){
        for (let i =0; i< children.length; i++){
            const ab = children[i] as HTMLInputElement
            info
                ? info.innerHTML += `<p>${ab.value}</p>`
                : ''
        }
    }
})