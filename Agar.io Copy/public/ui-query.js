const wHeight = $(window).height()
const wWidth = $(window).width()

const player = {}
let orbs = []
let players = []

const canvas = document.querySelector('#the-canvas')
const context = canvas.getContext('2d')
canvas.width = wWidth
canvas.height = wHeight

$(window).load(() => {
  // $("#loginModal").modal({ backdrop: "static ", keyboard: false });
  $('#loginModal').modal('show')
})

$('.name-form').submit((event) => {
  event.preventDefault()
  player.name = document.querySelector('#name-input').value
  $('#loginModal').modal('hide') 
  $('#spawnModal').modal('show')
  document.querySelector('.player-name').innerHTML = player.name
})

$('.start-game').click((event) => {
  $('.modal').modal('hide')
  $('.hiddenOnStart').removeAttr('hidden')
  init()
})