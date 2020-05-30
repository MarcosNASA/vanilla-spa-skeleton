"use strict";

var app = (function App() {
  var pages = [];
  var displayEvent = new Event('display');

  return { bootstrap };

  /**
   * Initialize the app.
   */
  function bootstrap() {
    var [page1, ...rest] = pages = Array.from(
      document.querySelectorAll('.page'),
    );
    pages.forEach(function setPageEventListener(page) {
      page.addEventListener('display', onPageRender);
    });

    document
      .querySelectorAll('.spa-link')
      .forEach(function setLinkEventListener(link) {
        link.addEventListener('click', navigate);
      });

    history.replaceState({}, 'Home', '#home');
    page1.dispatchEvent(displayEvent);

    window.addEventListener('popstate', navigateBack);
  }

  /**
   * Allows to perform actions on page render.
   * @param {object} event Event details for the event triggered
   * on page render.
   */
  function onPageRender(event) {
    var [page1, page2] = pages;
    switch (event.srcElement.id) {
      case 'page1':
        console.log(page1);
        break;
      case 'page2':
        console.log(page2);
        break;
      default:
        break;
    }
  }

  /**
   * Navigates to a new page.
   * @param {object} event Event details for the event triggered
   * by clicking a navigation link.
   */
  function navigate(event) {
    event.preventDefault();
    var newPageId = event.target.dataset.target;
    document.querySelector('.active').classList.remove('active');
    var newPage = document.getElementById(newPageId);
    newPage.classList.add('active');
    history.pushState({}, newPageId, `#${newPageId}`);
    newPage.dispatchEvent(displayEvent);
  }

  /**
   * Navigates the history, allowing the user to navigate back.
   * @param {object} event Event details for the event triggered
   * when the active history entry changes.
   */
  function navigateBack(event) {
    var newPageId = location.hash.replace('#', '');
    document.querySelector('.active').classList.remove('active');
    var newPage = document.getElementById(newPageId);
    newPage.classList.add('active');
    newPage.dispatchEvent(displayEvent);
  }
})();

app.bootstrap();
