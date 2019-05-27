// Using GSAP
let caseDetailsTween;

$('#mygrid > .grid-table').on('click', 'tr', function (e) {
  let td = $('td:first-child', $(this));
  
  // Find a place to hold the item Id
  let itemId = $('input[type=hidden]', td).val();

  // ASP.NET MVC
  let url = "MyController/MyAction/" + itemId;

  $.ajax({
    url: url,
    type: 'get',
    cache: false,
    beforeSend: () => {
      // Trigger a third party CSS loading animation
      $('.list-item-details').addClass('loading');
    }
  })
    .done((data) => {
      $('#case-details').html(data);
    })
    .always(() => {
      // Remember to end the animation
      $('.list-item-details').removeClass('loading');

      // We must dynamically calculate the height of the returned data
      let height = $('#mygrid-details > .row').height();

      // Let's add some animation
      caseDetailsTween = TweenLite.fromTo('#mygrid-details', 0.5, { height: 0 }, { height: height });

      $('#collapse-details-pane').addClass('expanded');
    });
});
      
$('#collapse-details-pane').click(function (e) {
  e.preventDefault();

  if (typeof caseDetailsTween != 'undefined') {
    if (caseDetailsTween.reversed()) {
      caseDetailsTween.play();
      $('#collapse-details-pane').addClass('expanded');
    } else {
      caseDetailsTween.reverse();
      $('#collapse-details-pane').removeClass('expanded');
    }
  }
});
