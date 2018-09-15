/**
 * Brought to you by Yago Estévez. https://twitter.com/yagoestevez
 */
require( "babel-runtime/regenerator" );
require( './index.html'              );
require( './main.scss'               );

const makeNavLinksSmooth = ( ) => {
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
}

const spyScrolling = ( ) => {
  const sections = document.querySelectorAll( '.section' );
  const navBar   = document.querySelector( '#navbar' );

  window.onscroll = ( ) => {
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if ( sections[ 0 ].offsetTop === scrollPos ) {
      navBar.classList.remove( 'bg-black' );
      navBar.classList.add( 'bg-transparent' );
    } else {
      console.log( sections[ 0 ].offsetTop, scrollPos )
      navBar.classList.remove( 'bg-transparent' );
      navBar.classList.add( 'bg-black' );
    }

    scrollPos += window.innerHeight / 2;

    for ( let s in sections )
      if ( sections.hasOwnProperty( s ) && sections[ s ].offsetTop <= scrollPos ) {
        const id = sections[ s ].id;
        document.querySelector( '.active' ).classList.remove( 'active' );
        document.querySelector( `a[href*=${ id }]` ).parentNode.classList.add( 'active' );
      }
  }  
}

makeNavLinksSmooth( );
spyScrolling( );


/*
const sections = document.querySelectorAll( '.section' );

window.onscroll = ( ) => {
  const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

  for ( let s in sections ) {
    if ( sections.hasOwnProperty( s ) ) {
      if ( sections[ s ].offsetTop <= scrollPos ) {
        const id   = sections[ s ].id;
        const curr = document.querySelector( '.active' );
        const next = document.querySelector( `a[href*=${ id }]` );
        if ( curr.id !== id ) {
          curr.classList.remove( 'active' );
          next.parentNode.classList.add( 'active' );
        }
      }
    }
  }
}
*/