// ==UserScript==
// @name         kinopub theater mode
// @namespace    https://github.com/oligsei/
// @version      1.0.0
// @match        https://kino.pub/item/view/*
// @run-at document-end
// ==/UserScript==

(function () {
  'use strict'

  function createTheaterModeElement () {
    const container = document.createElement('span')
    container.classList.add('m-l-sm', 'small')

    const button = document.createElement('a')
    button.classList.add('text-info')
    button.setAttribute('id', 'theater')
    button.setAttribute('href', 'javascript:void(0);')

    const icon = document.createElement('i')
    icon.classList.add('fa', 'fa-adjust')

    button.appendChild(icon)
    container.appendChild(button)

    return container
  }

  function createTheaterMode (elements) {
    const state = {
      theater: true,
    }

    function disableTheaterMode ({ action, aside, main, header }) {
      action.querySelector('.fa').removeAttribute('style')

      main.querySelector('.padding').removeAttribute('style')
      main.removeAttribute('style')

      aside.classList.remove('hide')
      header.classList.remove('hide')
    }

    function enableTheaterMode ({ action, aside, main, header }) {
      action.querySelector('.fa').setAttribute('style', 'transform: scaleX(-1);')

      main.querySelector('.padding').setAttribute('style', 'padding: 0;')
      main.setAttribute('style', 'padding-top: 0;')

      aside.classList.add('hide')
      header.classList.add('hide')
    }

    return () => {
      state.theater = !state.theater

      if (state.theater) {
        enableTheaterMode(elements)
      } else {
        disableTheaterMode(elements)
      }
    }
  }

  const theaterContainer = createTheaterModeElement()
  const theaterHandler = createTheaterMode({
    action: theaterContainer,
    aside: document.querySelector('#aside'),
    main: document.querySelector('#view'),
    header: document.querySelector('.app-header'),
  })

  theaterContainer.addEventListener('click', theaterHandler)

  document.querySelector('#view h3 .m-l.small').appendChild(theaterContainer)
})()