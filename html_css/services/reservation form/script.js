window.addEventListener('DOMContentLoaded', ()=>{
    const codepromo = document.querySelector(".codepromo")
    const date = document.querySelector("input[type='date']")
    const time = document.querySelector("input[type='time']")
    const submit = document.querySelector(".submit")
    const inputImages = document.querySelectorAll("input[type='file']")
    const deletes = document.querySelectorAll(".delete")

    const minDate = new Date().toLocaleDateString().split('/').reverse().join('-')
    const hoursTwo = parseInt(new Date().toLocaleString().split(' ')[1].split(':').shift()) + 2
    const minHour = new Date().toLocaleString().split(' ')[1].split(':').slice(0, 2).fill(hoursTwo, 0, 1).join(':')
    date.min = minDate
    date.value = minDate
    time.value = minHour


    codepromo.addEventListener('click', (e)=>{
        const code = e.target.previousElementSibling.value
        console.log('codepromo', code)
        //faire le traitement sur le cocepromo
    })

    Array.from(inputImages).map(input=>{
        input.addEventListener('change', (e)=>{
            const parent = e.target.closest('.upload-item')
            const image = e.target.previousElementSibling.previousElementSibling.firstElementChild
            const previewUrl = URL.createObjectURL(e.target.files[0])
            image.src = previewUrl
            parent.classList.add('active')
        })
    })

    Array.from(deletes).map(del=>{
        del.addEventListener('click', (e)=>{
            const parent = e.target.closest(".upload-item")
            const file = parent.lastElementChild
            parent.classList.remove('active')
            file.value = ''
        })
    })

    submit.addEventListener('click', (e)=>{
        // faire le traitement quand on soumet le formulaire 
    })

})