function generateSkillPills(skills) {
  var skillsTemplate = []
  // $.each(skills, function)
}

function generateDescription(description) {
  // console.log(description.length);
  if (description.length <= 236) {
    return description
  } else {
    return description.substring(0, 236).concat('...')
  }
}

function createCard(cardData, cardIndex) {
  var cardTemplate = [
    '<div class="col s12 m6 l4">',
    '<div class="portfolioCards">',
    '<div class="projectInfo">',
    '<div class="titleIcon">',
    '<h3>' + cardData.title + '</h3>',
    '<img class="categoryIcon" src="img/portfolio/category-icons/' + cardData.category + '.svg" />',
    '</div>',
    '<p>' + generateDescription(cardData.description1) + '</p>',
    '<p>SKILLS</p>',
    '',
    '<a id="pCard' + cardIndex + '" class="waves-effect waves-light btn moreInfoBtn green"><i class="material-icons right">info</i>More Info</a>'
  ];

  // a jQuery node
  return $(cardTemplate.join(''));
}


$( document ).ready(function() {

  //animate in titles!
  $( "#welcome" ).fadeTo( 500, '1' , function() {
    $( "#fede" ).fadeTo( 300, '1');
  });

  //-----
  // Create portfolio cards
  //-----

  //import JSON
  console.log('start');
  $.getJSON('data/portfolio.json', function(portfolioData) {
    var pCards = $();
    $.each(portfolioData, function(index, pItem) {
      pCards = pCards.add(createCard(pItem))
    })

    $('.portfolioCardsContainer').append(pCards);
  })

});
