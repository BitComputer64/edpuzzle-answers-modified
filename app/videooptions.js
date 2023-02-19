var unfocus_checkbox = document.getElementById("pause_on_focus");
var frq_checkbox = document.getElementById("bs_responses");
var frq_answer = document.getElementById("custom_answer");

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
      opener.document.doFRQs = frq_checkbox.checked;
      if (frq_checkbox.checked) {
        frq_answer.hidden = false;
        document.FRQAnswer = (frq_answer.value.trim() != "") ? frq_answer.value : "done";
      }
      else frq_answer.hidden = true;
    break;
  }
}