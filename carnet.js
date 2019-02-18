"use_strict";

// HIDE WHATS SUPPOSED TO BE HIDDEN
$("#form").hide();
$("#card").hide();

// SET EDIT CHECKER FALSE BY DEFAULT
let isEdit = false;

// OUR LIST OF ENTRIES
let entries = [
  {
    firstName: "Nicolas",
    lastName: "Fasano",
    phone: "0623309121",
    civility: "M."
  },
  {
    firstName: "Elise",
    lastName: "Fasano",
    phone: "0123456789",
    civility: "Mme"
  }
];

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

function cardDisplay(a) {
  let obj = entries[a[0].dataset.id];
  $("#card h3").text(obj.civility + " " + obj.firstName + " " + obj.lastName);
  $("#card em").text(obj.phone);
  $("#card a").attr("data-id", a[0].dataset.id);
}

function showForm() {
  $("#form").toggle();
  isEdit = false;
  $("#add").text("Ajouter");
  $("#lastName").val("");
  $("#firstName").val("");
  $("#phone").val("");
  $("#civility").val("M.");
}

function add() {
  entries.push({
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    phone: $("#phone").val(),
    civility: $("#civility").val()
  });
  display();
}

function edit() {
  let obj = entries[$(this)[0].dataset.id];
  obj.firstName = $("#firstName").val();
  obj.lastName = $("#lastName").val();
  obj.phone = $("#phone").val();
  obj.civility = $("#civility").val();
  showForm();
  $("#card").hide();
}

// START PROGRAM
$(function() {
  display();

  // ONCLICK FORM SHOWS
  $("#show").click(showForm);

  // CLEARS THE LIST AND HIDES THE CARD
  $("#del").click(function() {
    $("#list").html("");
    $("#card").hide();
    entries = [];
  });

  // ONCLICK ADD
  $("#add").click(function(e) {
    e.preventDefault();
    if (isEdit !== "") {
      edit();
    } else {
      add();
    }
  });

  // ONCLICK SHOW CARD AND FILL IT WITH RIGHT INFO
  $("#list").on("click", "li>a", function() {
    cardDisplay($(this));
    $("#card").show();
  });

  // ONCLICK SHOW FORM AND FILL IT WITH RIGHT INFO, SET BTN TO 'MODIFIER' AND EDIT TO TRUE
  $("#card").on("click", "a", function() {
    $("#form").show();
    isEdit = true;
    $("#add").text("Modifier");
  });
});
