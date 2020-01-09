// -------------------------
// global variables and functions
// -------------------------

var portfolioPageState = {
  selectedCategory: 'All'
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
    '<a href="#portfolioDetailModal" id="pCard-' + cardIndex + '" class="waves-effect waves-light btn modal-trigger moreInfoBtn green"><i class="material-icons right">info</i>More Info</a>'
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
    if (filterCategory === 'All') {
      pCards = pCards.add(createCard(pItem, index))
    } else {
      if (pItem.category === filterCategory) {
        pCards = pCards.add(createCard(pItem, index))
      }
    }
  })

  $('.portfolioCardsContainer').append(pCards);
}

function generatePortfolioImages(images) {
  var theImages = []
  $.each(images, function(index, image) {
    theImages.push('<img class="responsive-img materialboxed portfolioImages" src="img/portfolio/' + image + '" />')
  })
  return theImages.join(' ')
}

function generateStatusInfo(status) {
  var theStatus = '<div class="pDetailStatus"><span class="' + status.label.toLowerCase() + 'Badge"></span>' + status.label + '</div></p> <p>' + status.details + '</p>'
  return theStatus
}

function generateDemoSrcLinks(links) {
  var theLinks = []
  if (links.demo !== "" || links.source_code !== "") {
    theLinks.push('<p><strong><u>DEMO / SOURCE CODE:</u></strong></p>')
    if (links.demo !== "") {
      theLinks.push('<a href="' + links.demo + '"  target="_blank" class="btn blue demoModalBtn">Demo</a>')
    }
    if (links.source_code !== "") {
      theLinks.push('<a href="' + links.source_code + '" target="_blank" class="btn orange srcCodeModalBtn">Source code</a>')
    }
  }

  if (links.press.length > 0) {
    theLinks.push('<p><strong><u>RELATED LINKS:</u></strong></p>')
    $.each(links.press, function(index, link) {
      theLinks.push('<span class="bulletPoint"></span><a href="' + link + '" target="_blank" class="otherLinksModal">' + link + '</a><br/><div class="spacerLinks" />')
    })
  }

  return theLinks.join(' ')
}

// MODAL TEMPLATE GENERATION
function fillDetailsModal(pItemDetails) {
  $('.modal-content').empty();
  var pModal = $();
  console.log(pItemDetails);
  var modalTemplate = [
    '<h5>' + pItemDetails.title + '</h5>',
    '<p><strong><u>YEAR:</u></strong> '+ pItemDetails.year + '</p>',
    '<p><strong><u>DESCRIPTION:</u></strong></p>',
    '<p>' + pItemDetails.description1 + '</p>',
    '<p><strong><u>LESSONS LEARNED:</u></strong></p>',
    '<p>' + pItemDetails.lessons_learned + '</p>',
    '<p><strong><u>IMAGES / SCREENSHOTS:</u></strong></p>',
    generatePortfolioImages(pItemDetails.images),
    '<p><strong><u>SKILLS:</u></strong></p>',
    '<div class="skillPillsContainer">',
    generateSkillPills(pItemDetails.skills),
    '</div>',
    '<p><strong><u>STATUS:</u></strong>',
    generateStatusInfo(pItemDetails.status),
    generateDemoSrcLinks(pItemDetails.links)
  ]
  pModal = pModal.add($(modalTemplate.join('')))
  $('.modal-content').append(pModal);
  $('.materialboxed').materialbox();
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

  //initialize modal
  $('.modal').modal();

  //-----
  // Create portfolio cards
  //-----

  //import JSON
  console.log('start');
  $.getJSON('data/portfolio.json', function(portfolioData) {
    generatePortfolioCards(portfolioData)

    //cards filtering logic
    $('.liCategoryItem').click( function (event) {
      portfolioPageState.selectedCategory = event.target.text.charAt(0).toUpperCase() +  event.target.text.toLowerCase().substring(1)
      $('.portfolioCardsContainer').empty()
      generatePortfolioCards(portfolioData)
    })

    //more info modal logic
    $(document).on( 'click', '.moreInfoBtn', function (event) {
      console.log('click');
      var pItemIndex = event.target.id.split('-')[1]
      console.log(portfolioData);
      fillDetailsModal(portfolioData[pItemIndex])
    })
  })

});
