var unfocus_checkbox = document.getElementById("pause_on_focus");
var frq_checkbox = document.getElementById("bs_responses");
var frq_answer = document.getElementById("custom_answer");
var answers_button = document.getElementById("answers_button");

if (typeof opener.document.visibility_change != "undefined") {
  unfocus_checkbox.checked = opener.document.visibility_change
}

if (typeof opener.document.doFRQs != "undefined") frq_checkbox.checked = opener.document.doFRQs;
else opener.document.doFRQs = frq_checkbox.checked;

var js_text = `
window.addEventListener("visibilitychange", function(event) {
  console.log(document.visibility_change)
  if (document.visibility_change) {
    event.stopImmediatePropagation();
  }
}, true);
`;

function toggle(type) {
  switch (type) {
    case "focus":
      if (typeof opener.document.visibility_change == "undefined") {
        opener.document.visibility_change = unfocus_checkbox.checked;
        var script = opener.document.createElement("script");
        script.innerHTML = js_text;
        opener.document.body.appendChild(script);
      }
      opener.document.visibility_change = unfocus_checkbox.checked;
    break;

    case "responses":
      document.doFRQs = frq_checkbox.checked;
      if (frq_checkbox.checked) {
        frq_answer.hidden = false;
      }
      else frq_answer.hidden = true;

      if (document.questions.length != 0 && (frq_checkbox.checked || document.questions.filter(x => x.type == "multiple-choice").length != 0)) {
        answers_button.disabled = false;
      }
      else answers_button.disabled = true;

    case "custom_response":
      frq_answer.size = (frq_answer.value.length > 0) ? (frq_answer.value.length + 1) : 65;
      document.FRQAnswer = (frq_answer.value.trim() != "") ? frq_answer.value : "done";
    break;
  }
}