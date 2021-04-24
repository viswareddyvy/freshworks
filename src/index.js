var $ = require("jquery");
var a = require("./index.css");
var b = require("@fortawesome/fontawesome-free/js/all.js");
  var jsonData = require("./mockdata.json");
  var allQuestions = jsonData.questions;
  var currentquestion = 0;
  var draftResponse = [];
  var feedbackResponses = [];
  let selectedRating;
  
  /** setup the questions and options 
      will be triggering when ever there is change in question
  */
  function setupQuestionAndOptions() {
    $("#question").html(allQuestions[currentquestion].question);
    var options = allQuestions[currentquestion].options;
    switch (allQuestions[currentquestion].type) {
      case "rating":
        $("#form").html(appendRatingHtmlContent(options));
        break;
      case "boolean":
        $("#form").html(appendBooleanContent(options));
        $(".options:eq(0)").prop("checked", true);
        break;
      case "text":
        $("#form").html(appendTextContent());
        break;
      case defualt:
        //$("#form").html(getBooleanOptions(options));
        break;
    }
  }
  
  function appendBooleanContent(options) {
    var formHtml = "";
    for (var i = 0; i < options.length; i++) {
      formHtml +=
        '<div><input type="radio" name="option" value="' +
        i +
        '" class="options"><label for="option' +
        i +
        '">' +
        options[i].text +
        "</label></div><br/>";
    }
    return formHtml;
  }
  
  function appendTextContent() {
    var formHtml =
      "<div><textarea placeholder='Add your comments here'></textarea></div><br/>";
    return formHtml;
  }
  
  function appendRatingHtmlContent(options) {
    var formHtml = "";
    formHtml += '<div class="rating">';
    for (var i = 0; i < options.length; i++) {
      formHtml += "<span >" + options[i].text + "</span>";
    }
    formHtml += "</div>";
    return formHtml;
  }
  
  function storeAns(qType) {
    const feedbackResponse = { question: "", response: "" };
    const questionObj = allQuestions[currentquestion];
    if (qType == "boolean") {
      (feedbackResponse.question = questionObj.question),
        (feedbackResponse.response =
          questionObj.options[$("input[name=option]:checked").val()]);
    } else if (qType == "rating") {
      debugger;
        let optionalVal = '';
       if(selectedRating)
       optionalVal = selectedRating.innerHTML || '';
      (feedbackResponse.question = questionObj.question),
        (feedbackResponse.response = optionalVal);
    } else {
      (feedbackResponse.response = allQuestions[currentquestion].question),
        (feedbackResponse.response = $("textarea").val());
    }
    feedbackResponses.push(feedbackResponse);
    // Uncomment below line to enable user peristance.
    setItemTolocalStorage();
  }
  
  /** when document is ready below code will execute */
  $(document).ready(function () {
    /* Just used jquery to access elements not for anything else 
       I know i have to use javascript but still going with jquery to make application          quick time . if you want I can replace with document.querySelector for below values 
    */
    var $jumbotron = $(".jumbotron");
    var $start = $("#start");
    var $next = $("#next");
    var $back = $("#back");
    var $result = $("#result");
    var $welcome = $(".welcome");
  
    $jumbotron.hide();
    $start.click(function () {
      /* On proceed fetch the data if we have stored any in local storage
      urrently comment as codepen having issue in accessing localstorage */
      //getItemFromLocalStorage();
  
      $jumbotron.fadeIn();
      $(this).hide();
      $welcome.hide();
    });
    addDeligationListener();
    setupQuestionAndOptions();
    $next.click(function () {
      event.preventDefault();
      storeAns(allQuestions[currentquestion].type);
      currentquestion++;
      if (currentquestion < allQuestions.length) {
        setupQuestionAndOptions();
        if (currentquestion == allQuestions.length - 1) {
          $next.html("Submit");
          $next.click(function () {
            $jumbotron.hide();
            $(".thanks").html("Thank You");
            $result.html("Thanks for helping us to impove").hide();
            $result.fadeIn(1500);
            postDatatoApiCall(JSON.stringify(feedbackResponses));
          });
        }
      }
    });
    $back.click(function () {
      if (currentquestion >= 1) {
        currentquestion--;
        setupQuestionAndOptions();
        $next.html("next");
      } else {
        $jumbotron.hide();
        $welcome.show();
        $start.show();
      }
    });
  });
  
  /* To persist state we can use localstorage and set item
     Need to enable cookies in chrome settings to allow localstorage access
   */
  
  function setItemTolocalStorage() {
    localStorage.setItem("feedbackResponses", JSON.stringify(feedbackResponses));
  }
  
  function postDatatoApiCall(data) {
    // Update the below url to actual API
    $.post(
      "https://jsonplaceholder.typicode.com/posts",
      data,
      function (data, status) {
        alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
      }
    );
  }
  
  function getItemFromLocalStorage() {
    localStorage.getItem("feedbackResponses", (result) => {
      draftResponse = result.feebackResponses;
    });
  }
  
  function addDeligationListener() {
    $("form").click(function (event) {
      //Event deligation technique used here
      let target = event.target;
      if (target.tagName != "SPAN") return;
      highlight(target);
    });
  }
  
  function highlight(option) {
    if (selectedRating) {
      selectedRating.classList.remove("selected");
    }
    selectedRating = option;
    selectedRating.classList.add("selected");
  }

exports.fun = function(a, b ) {
    return a + b;
}
 