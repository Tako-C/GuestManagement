//65130500058 Phakphum phrajrern

import { createGuestList } from './data/guestdata.js'
// const createGuestList = require('./data/guestdata.js')


const guestList = createGuestList()


function guestForm() {
  //provide initial guests data list created from GuestManagement class

  let guests = guestList
  // let displsy_Area = document.getElementById('display-area')
  
  // 1. register event for searching and adding
  function registerEventHandling() {
    let search_input = document.getElementById('search-input')
    let btnAdd = document.getElementById('add-guest-btn')
    search_input.addEventListener('keyup' , searchGuest)
    btnAdd.addEventListener('click' , addGuest)

  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    let displsy_Area = document.getElementById('display-area')
    let div_P = document.createElement('div')
    let span_N = document.createElement('span')
    let span_D = document.createElement('span')

    span_N.textContent = guestItem.firstname + ' '+ guestItem.lastname
    span_D.classList.add('remove-icon')
    span_D.id = `${guestItem.firstname}-${guestItem.lastname}`
    span_D.textContent = "[X]"
    span_D.style = "cursor:pointer;color:red"
    displsy_Area.appendChild(div_P)
    div_P.append(span_N , span_D)

    span_D.addEventListener('click', removeGuest)


  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    let displsy_Area = document.getElementById('display-area')
    // for (let i = 0; i < displsy_Area.children.length; i++) {
    //   displsy_Area.children[i].remove()
    //   console.log(displsy_Area.children[i])
      
    // }

    Array.from(displsy_Area.children).forEach(element => {
      element.remove()
    });
    for (let j = 0; j < guestResult.length; j++) {
      displayGuest(guestResult[j])
      
    }

    
    
  }

  // function displayGuests(guestResult) {
  //   const display_Area = document.getElementById("display-area")
  //   Array.from(display_Area.children).forEach((child) => {
  //     child.remove()
  //   })


  //   guestResult.forEach((guest) => {

  //     displayGuest(guest)
  //   })


  // }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    let input = event.target.value
    displayGuests(guests.searchGuests(input))



  }

  // 5. Function to add a new guest
  function addGuest() {
    let inputF = document.getElementById('firstname-input').value
    let inputL = document.getElementById('lastname-input').value
    guests.addNewGuest(inputF,inputL)

    displayGuest({firstname:inputF , lastname:inputL})
    inputF = ""
    inputL = ""




  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const name = event.target.getAttribute("id")
    const name_arr = name.split("")
    let cut_index
    name_arr.forEach((char, i) => {
      if (char === "-") {
        cut_index = i
      }
    })
    const firstname = name_arr.slice(0, cut_index).join('')
    const lastname = name_arr.slice(cut_index + 1, name_arr.length).join('')
    guests.removeGuest({ firstname: firstname, lastname: lastname })
    event.target.parentElement.remove()

  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  }
}
// module.exports = guestForm
export { guestForm }
const { registerEventHandling, displayGuests } = guestForm()
registerEventHandling()
displayGuests(guestList.getAllGuests())
