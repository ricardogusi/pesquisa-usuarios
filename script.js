let users = []
let result = []
let masc = null
let fem = null
let idades = null

window.addEventListener('load', ()=>{
    

    input = document.querySelector('#searchbar')
    btn = document.querySelector('.btn')
    usersSpan = document.querySelector('.usersnumber')
    usersStatistics = document.querySelector('.usersstatistics')
    usersData = document.querySelector('.usersdata')
    usersNumber = document.querySelector('.usersnumber')
    
    btn.addEventListener('click', renderingUsers)
    input.addEventListener('keypress', function(e){     
        if(e.which == 13){
        
            renderingUsers();
           
        }
     }, false);
    
    
    fetchusers()
    
    
})





async function fetchusers (){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    let json = await res.json()
    users = Array.from(json.results)
    users = users.map (user => {
        let { picture, name, dob, gender } = user
        
        return {
            picture: picture.thumbnail,
            name: name.first + ' ' + name.last,
            age: dob.age,
            gender
        }
    })
                
    render()
            
}


function render(){
    
    renderingUsers()
}



function renderingUsers(){

    if (input.value.length > 0 ) {
        let result = []
      
        result = users.filter(user => user.name.toLowerCase().includes(input.value))

        ordered = Array.from(result)
        ordered.sort((a,b) =>{
            return a.name.localeCompare(b.name)
        })
        
        
        let usersHTML = '<div class="container">'
        ordered.forEach(user =>{
            let { picture, name, age } = user
            
            const userHTML = `<div class="userdiv"><img src='${picture}' class='pic'><span> ${name}, ${age} anos </span></div>`
            usersHTML += userHTML    
            usersData.innerHTML = usersHTML
            
        })
        
        usersNumber.innerHTML = `${result.length} usuári@(s) encontrad@(s)`

        
        let statisticsHTML = '<div class="scontainer">'
        let masc = 0
        let fem = 0
        let idade = 0
        let media = 0

        result.forEach(user =>{
            let {gender} = user
            if (gender === "male") {
                masc ++
            } else {
                fem ++
            }
        })
        
        idade = result.reduce((a,c)=>{
            return a + c.age
        },0)
        
        media = idade / result.length

        const sHTML = `
                        <h2>Estatísticas</h2>
                        <div><span>Sexo Masculino: ${masc}</span></div>
                        <div><span>Sexo Feminino: ${fem}</span></div>
                        <div><span>Soma das idades: ${idade}</span></div>
                        <div><span>Média das idades: ${Math.floor(media)}</span></div>  `

        statisticsHTML += sHTML
        usersStatistics.innerHTML = statisticsHTML 

    } 
  

    return result  

}

