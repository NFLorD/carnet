"use_strict";
$(function() {

  // HIDE WHATS SUPPOSED TO BE HIDDEN
  $("#form").hide();
  $("#card").hide();

  // SET EDIT CHECKER FALSE BY DEFAULT
  let isEdit = false;

  // OUR LIST OF ENTRIES
  if(localStorage.getItem('entries') !== null){
    var entries = JSON.parse(localStorage.getItem('entries'));
  } else {
    var entries = [];
  }

  // DISPLAY (CALLED BY ADD/EDIT)
  function display() {
    $("#list").html("");
    entries.forEach(function(entry, index) {
      $("#list").append(
        "<li><a href='#' data-id='" +
          index +
          "'>" +
          entry.firstName +
          " " +
          entry.lastName.toUpperCase() +
          "</a></li>"
      );  
    });
  }

  // CARD (CALLED BY EDIT/CLICK ON A LIST LINK)
  function cardDisplay(id) {
    let obj = entries[id];
    $("#card h3").text(obj.civility + " " + obj.firstName + " " + obj.lastName);
    $("#card em").text(obj.phone);
    $("#card a").attr("data-id", id);
  }

  // TOGGLED BY BUTTON CLICK (#show) OR EDITING
  function showForm() {
    $("#form").toggle();
    isEdit = false;
    $("#add").text("Ajouter");
    $("#lastName").val("");
    $("#firstName").val("");
    $("#phone").val("");
    $("#civility").val("M.");
  }

  // TOGGLED BY BUTTON CLICK (#add) WHEN EDIT == FALSE
  function add() {
    entries.push({
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      phone: $("#phone").val(),
      civility: $("#civility").val()
    });
    display();
  }

  // TOGGLE BY BUTTON CLICK (#add) WHEN EDIT == true, SEES ITSELF PASSED THE INDEX TO CHANGE
  function edit(id) {
    let obj = entries[id];
    obj.firstName = $("#firstName").val();
    obj.lastName = $("#lastName").val();
    obj.phone = $("#phone").val();
    obj.civility = $("#civility").val();
    showForm();
    cardDisplay(id);
    display();
  }

  // START PROGRAM
  display();

  // BIND FORM TO BTN
  $("#show").click(showForm);

  // CLEARS THE LIST AND HIDES THE CARD, ENTRIES IS NOW EMPTY/NULL IN LOCALSTORAGE
  $("#del").click(function() {
    $("#list").html("");
    $("#card").hide();
    entries = [];
    localStorage.removeItem('entries');
  });

  // BIND LIST UPDATES TO BTN
  $("#add").click(function(e) {
    e.preventDefault();
    if (isEdit == true) {
      edit($(this)[0].dataset.id);
    } else {
      add();
    }
    // EVERY UPDATE ENDS WITH A LOCALSTORAGE VARIABLE UPDATE
    localStorage.setItem('entries', JSON.stringify(entries));
  });

  // BIND LIST LINK WITH DETAILS CARD
  $("#list").on("click", "li>a", function() {
    cardDisplay($(this)[0].dataset.id);
    $("#card").show();
  });

  // BIND CARD LINK TO SHOW FORM AND FILL IT WITH RIGHT INFO, SET BTN TO 'MODIFIER' AND EDIT TO TRUE
  $("#card").on("click", "a", function() {
    isEdit = true;
    let obj = entries[$(this)[0].dataset.id];
    $("#add").text("Modifier");
    $("#add").attr("data-id", $(this)[0].dataset.id);
    $("#lastName").val(obj.lastName);
    $("#firstName").val(obj.firstName);
    $("#phone").val(obj.phone);
    $("#civility").val(obj.civility);
    $("#form").show();
  });

});
