/* setup plugins */
let jq = document.createElement("script");

jq.addEventListener("load", proceed); 
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
document.querySelector("head").appendChild(jq);

jq.addEventListener("load", proceed); 
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js";
document.querySelector("head").appendChild(jq);
jq = document.createElement("script");
var $

function proceed () {
var jsonData = {
    questions: [
      {
        type: "rating",
        question: "How do you rate the delivery experience?",
        options: [
          {
            text: "Great",
            points: "10"
          },
          {
            text: "Not so Great",
            points: "5"
          },
          {
            text: "Awful",
            points: "0"
          }
        ]
      },
      {
        type: "rating",
        question: "How do you rate the Freshness of the fruits?",
        options: [
          {
            text: "Great",
            value: "10"
          },
          {
            text: "Not so Great",
            value: "5"
          },
          {
            text: "Awful",
            value: "0"
          }
        ]
      },
      {
        type: "boolean",
        question: "Would you order again?",
        options: [
          {
            text: "Yes, Definitely",
            value: true
          },
          {
            text: "Not so Great",
            value: false
          }
        ]
      },
      {
        type: "text",
        question: "Any comments?"
      }
    ]
  };
  var allQuestions = jsonData.questions;
  var currentquestion = 0;
  var draftResponse = [];
  var feedbackResponses = [];
  
  
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
  
  function storeAns(qType) {
    const feedbackResponse = {question:'',response:''}
    const questionObj = allQuestions[currentquestion];
    if (qType == "boolean") {
      (feedbackResponse.question = questionObj.question),
        (feedbackResponse.response =
          questionObj.options[$("input[name=option]:checked").val()]);
    } else if (qType == "rating") {
      (feedbackResponse.question = questionObj.question),
        (feedbackResponse.response =
          questionObj.options[$("input[name=option]:checked").val()]);
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
  
  function setItemTolocalStorage (){
    localStorage.setItem("feedbackResponses",      JSON.stringify(feedbackResponses));
  }

}
  // function getItemFromLocalStorage() {
  //     localStorage.getItem("feedbackResponses", (result)=>{
  //       draftResponse = result.feebackResponses;
  //     });
  // }
  
} 
  
