// -------------------------
// global variables and functions
// -------------------------

var portfolioPageState = {
  selectedCategory: 'all'
}

var pillColors = [
  'red darken-1',
  'pink darken-1',
  'purple darken-1',
  'indigo darken-1',
  'blue darken-4',
  'cyan darken-4',
  'teal darken-1',
  'green darken-1',
  'orange darken-2',
  'brown darken-1',
  'blue-grey darken-1'
]

function generateSkillPills(skills) {
  var theseColors = [...pillColors]
  // console.log(pillColors);
  var skillsTemplate = []
  $.each(skills, function(index, skill) {
    var randomNum = Math.floor(Math.random() * theseColors.length);
    var skillPillTemplate = [
      '<span class="skillBadge ' + theseColors[randomNum] + '">',
      skill,
      '</span>'
    ]
    skillsTemplate.push(skillPillTemplate.join(''))
    theseColors.splice(randomNum, 1)

  })
  // console.log(theseColors);
  return skillsTemplate.join(' ')
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
    '<p>SKILLS:</p>',
    '<div class="skillPillsContainer">',
    generateSkillPills(cardData.skills),
    '</div>',
    '<a id="pCard' + cardIndex + '" class="waves-effect waves-light btn moreInfoBtn green"><i class="material-icons right">info</i>More Info</a>'
  ];

  // a jQuery node
  return $(cardTemplate.join(''));
}


function generatePortfolioCards(portfolioData) {
  var pCards = $();
  var filterCategory = portfolioPageState.selectedCategory;
  $('#pCategory').empty().append(filterCategory)
  //loop thru the portfolio items and filter by category
  $.each(portfolioData, function(index, pItem) {
    if (filterCategory === 'all') {
      pCards = pCards.add(createCard(pItem))
    } else {
      if (pItem.category === filterCategory) {
        pCards = pCards.add(createCard(pItem))
      }
    }
  })

  $('.portfolioCardsContainer').append(pCards);
}

// -------------------------
// Page JS logic
// -------------------------

$( document ).ready(function() {

  //animate in titles!
  $( "#welcome" ).fadeTo( 500, '1' , function() {
    $( "#fede" ).fadeTo( 300, '1');
  });

  //initialize dropdown
  $('.dropdown-trigger').dropdown();

  //-----
  // Create portfolio cards
  //-----

  //import JSON
  console.log('start');
  $.getJSON('data/portfolio.json', function(portfolioData) {
    generatePortfolioCards(portfolioData)
    //listen for clicks to re-filter cards
    $('.liCategoryItem').click( function (event) {
      console.log(event.target.text);
      portfolioPageState.selectedCategory = event.target.text.charAt(0).toUpperCase() +  event.target.text.toLowerCase().substring(1)
      $('.portfolioCardsContainer').empty()
      generatePortfolioCards(portfolioData)
    })

  })

});
