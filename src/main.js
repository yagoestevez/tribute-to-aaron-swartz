/**
 * Brought to you by Yago Estévez. https://twitter.com/yagoestevez
 */
require( "babel-runtime/regenerator" );
require( './index.html'              );
require( './main.scss'               );

/** Smooth Scrolling **/
(function navSmoothScrolling ( ) {
  const navLinks = document.querySelectorAll( '.nav-link' );

  for ( let n in navLinks ) {
    if ( navLinks.hasOwnProperty( n ) ) {
      navLinks[ n ].addEventListener( 'click', e => {
        e.preventDefault( );
        document.querySelector( navLinks[ n ].hash )
          .scrollIntoView( {
            behavior: "smooth"
          } );
      } );
    }
  }
})( );

/** ScrollSpy **/
(function scrollSpy( ) {
  const sections = document.querySelectorAll( '.section' );
  const navBar   = document.querySelector( '#navbar' );

  window.onscroll = ( ) => {
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if ( sections[ 0 ].offsetTop === scrollPos ) {
      navBar.classList.remove( 'bg-black' );
      navBar.classList.add( 'bg-transparent' );
    } else {
      navBar.classList.remove( 'bg-transparent' );
      navBar.classList.add( 'bg-black' );
    }

    scrollPos += window.innerHeight / 2;

    for ( let s in sections )
      if ( sections.hasOwnProperty( s ) && sections[ s ].offsetTop <= scrollPos ) {
        const id = sections[ s ].id;
        document.querySelector( '.active' ).classList.remove( 'active' );
        document.querySelector( `a[href*=${ id }]` ).parentNode.classList.add( 'active' );
        document.querySelector( `#${ id }` ).classList.add( 'show' );
      }
  }  
})( );

/** Carousel **/
const numOfSlides = Object.keys( document.querySelectorAll( '.carousel-item' ) ).length;
const changeSlide = ( forward = true ) => {
  const currentSlide = document.querySelector( '.carousel-item.active' );
  const currentID    = +currentSlide.id.slice( currentSlide.id.length-1 );
  const nextSlide    = forward
    ? currentID === numOfSlides
      ? document.querySelector( `#carousel-item-1` )
      : document.querySelector( `#carousel-item-${ currentID + 1 }` )
    : currentID === 1
      ? document.querySelector( `#carousel-item-${ numOfSlides }` )
      : document.querySelector( `#carousel-item-${ currentID - 1 }` );
  currentSlide.classList.remove( 'active' );
  nextSlide.classList.add( 'active' );
}

document.querySelector( '.carousel-control-prev' )
        .addEventListener( 'click', ( ) => changeSlide( false ) );
document.querySelector( '.carousel-control-next' )
        .addEventListener( 'click', ( ) => changeSlide( ) );