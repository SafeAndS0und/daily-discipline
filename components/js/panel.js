
setTimeout(() => {
   const panels = document.querySelectorAll('article')


   panels.forEach(panel => {

      let mouseX
      let difference

      function moveHandler(e) {
         difference = event.x - mouseX // calculate difference to move the element
         panel.style.transform = `translateX(${difference}px)`
      }

      panel.addEventListener('mousedown', event => {
         mouseX = event.x
         panel.style.boxShadow = '2px 2px 6px 0px rgba(0,0,0,0.75)'

         panel.addEventListener('mousemove', moveHandler)
      })

      panel.addEventListener('mouseup', () => {
         panel.style.boxShadow = '0 0 0 0 rgba(0,0,0,0.75)'
         panel.style.transform = `translateX(0px)`
         panel.removeEventListener('mousemove', moveHandler)
      })

   })

}, 1000) //todo yeah