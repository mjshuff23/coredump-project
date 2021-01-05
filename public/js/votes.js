// function createIds(qOrA, upOrDown,  attribute) {
//     ids = document.querySelectorAll(`${attribute}`);
//     let idsArr = [];
//     let scoresArr = []
//      for (let i=0; i < ids.length; i++) {
//          let id = '';
//          if (qOrA === 'question') {
//             id = ids[i].dataset.questionid;
//             scoresArr.push(`score-${qOrA}-${id}`)
//          } else if (qOrA === 'answer') {
//             id = ids[i].dataset.answerid;
//             scoresArr.push(`score-${qOrA}-${id}`)
//          }
//         idsArr.push(`${qOrA}${upOrDown}-${id}`);
//      }

//      return [ idsArr, scoresArr ];
// }

// function printStuff(array) {
//     for (let i = 0; i < array.length; i++) {
//         console.log("Array [", i, "]: ", array[i]);
// }
// }

// console.log("Outside of DOM Content Loaded");
document.addEventListener('DOMContentLoaded', (e) => {
    const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

    document.querySelectorAll('.answersContainer').forEach((item) => {
        item.addEventListener('click', async (e) => {
            // console.log("Event listener for answers ");
            //e.preventDefault();
            //e.stopPropagation();
            const answerId = e.target.dataset.answerid;
            let scoreElt = document.querySelector(`p[data-answerid="${answerId}"]`);
            if (e.target.classList.contains('fa-caret-up')) {
                await postVote({ vote: true, answerId, userId }, '/questions/voteAnswer', scoreElt);
            } else if (e.target.classList.contains('fa-caret-down')) {
                await postVote({ vote: false, answerId, userId }, '/questions/voteAnswer', scoreElt);
            }
        });
    });
    document.querySelectorAll('.containerSolo').forEach((item) => {
        // console.log("Item:  ", item);
        item.addEventListener('click', async (e) => {
            // console.log("Event listener for questions ");
            //e.preventDefault();
            //e.stopPropagation();
            const questionId = e.target.dataset.questionid;
            // console.log("QuestionId: ", questionId);
            let scoreElt = document.querySelector(`p[data-questionid="${questionId}"]`);
            if (e.target.classList.contains('fa-caret-up')) {
                await postVote({ vote: true, questionId, userId }, '/questions/voteQuestion', scoreElt);
            } else if (e.target.classList.contains('fa-caret-down')) {
                await postVote({ vote: false, questionId, userId }, '/questions/voteQuestion', scoreElt);
            } else {
                if (!questionId || window.location.href.search(/questions\/\d+/) !== -1) return;
                window.location.href = `questions/${questionId}`;
            }
        });
    });
});

async function postVote(body, route, scoreElt) {
    try {
        const res = await fetch(route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log("Returned from fetch...");
        if (res.ok) {
            const retVal = await res.json();
            // console.log("Return value:  ", retVal.voteCount);
            // console.log("scoreElt.innerHTML: ", scoreElt);
            scoreElt.innerHTML = retVal.voteCount; //newScore
        }
        if (!res.ok) {
            throw res;
        }
        return res;
    }
    catch (res) {
        // console.log("Response object:  *******************************************", res);
        const errorJSON = await res.json();
        // console.log("ErrorJSON:  ", errorJSON);

        if (errorJSON) {
            let errorsContainer = document.querySelector(".main-box");
            if (!errorJSON.error) return;
            let errorsHTML = `<li>${errorJSON.error}</li>`;
            errorsContainer.innerHTML = `<ul width="40px"; style="color:red; background-color: rgba(255, 255, 255, 0)">${errorsHTML}</ul>`;
            await setTimeout(function () { errorsContainer.innerHTML = ``; }, 5000);
        }
    }
}
