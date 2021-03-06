import appLoaded from '../../app.js'
import moneyState from '../../assets/js/moneyState.js'


async function initiate(){
   await appLoaded
   const moneyDiv = document.querySelector('.money-status')
   const h1 = moneyDiv.children[0]
   const input = moneyDiv.children[1]
   const button = moneyDiv.children[2]
   const left = moneyDiv.children[3].children[0]

   const limit = parseInt(localStorage.getItem('limit'))

   if(limit){
      const moneySpent = moneyState()

      if(moneySpent){
         h1.innerHTML = `${moneySpent} / ${limit}`
         left.innerHTML = limit - moneySpent
      } else{
         h1.innerHTML = `0 / ${limit}`
         left.innerHTML = limit
      }
   }

   h1.addEventListener('click', () =>{
      input.style.display = 'inline-block'
      button.style.display = 'inline-block'
   })

   button.addEventListener('click', () =>{
      input.style.display = 'none'
      button.style.display = 'none'

      const moneySpent = moneyState()

      if(input.value && input.value > 0){
         h1.innerHTML = `${moneySpent || 0} / ${input.value}`
         left.innerHTML = input.value - moneySpent || input.value
         localStorage.setItem('limit', input.value)
      }
   })

   drawColumns()
}

initiate()

function drawColumns(){
   const history = JSON.parse(localStorage.getItem('history'))
   const chart = document.querySelector('.chart .columns')

   if(!history)
      return


   const moneySpent
      = history
      .map(({amount}) => amount)
      .reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0)

   chart.innerHTML = ''

   history.forEach(hObj =>{
      const percentage = hObj.amount / moneySpent
      const hour = hObj.hour.substring(0, 2)

      const article = document.createElement('article')
      article.innerHTML = hObj.amount
      article.style.height = (150 * percentage) + 10 + 'px'
      article.style.gridColumn = Math.floor(hour)
      chart.appendChild(article)
   })
}

export default initiate