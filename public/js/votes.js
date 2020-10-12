function createIds(qOrA, upOrDown,  attribute) {
    ids = document.querySelectorAll(`${attribute}`);
    let idsArr = [];
    let scoresArr = []
     for (let i=0; i < ids.length; i++) {
         let id = '';
         if (qOrA === 'question') {
            id = ids[i].dataset.questionid;
            scoresArr.push(`score-${qOrA}-${id}`)
         } else if (qOrA === 'answer') {
            id = ids[i].dataset.answerid;
            scoresArr.push(`score-${qOrA}-${id}`)
         }
        idsArr.push(`${qOrA}${upOrDown}-${id}`);
     }

     return [ idsArr, scoresArr ];
}

function printStuff(array) {
    for (let i = 0; i < array.length; i++) {
        console.log("Array [", i, "]: ", array[i]);
}
}

document.addEventListener('DOMContentLoaded', (e) => {
    const userId = localStorage.getItem("COREDUMP_CURRENT_USER_ID");

    let questionVoteUpArrs = createIds("question", "VoteUp", "[data-questionid]");
    let questionVoteDownArrs = createIds("question", "VoteDown", "[data-questionid]");
    let answerVoteUpArrs = createIds("answer", "VoteUp", "[data-answerid]");
    let answerVoteDownArrs = createIds("answer", "VoteDown", "[data-answerid]");

    console.log("FIRST ***********************************");
    printStuff(questionVoteUpArrs[0]);
    console.log("SECOND***********************************");
    printStuff(questionVoteDownArrs[0]);
    console.log("THIRD***********************************");
    printStuff(answerVoteUpArrs[0]);
    console.log("FOURTH***********************************");
    printStuff(answerVoteDownArrs[0]);
    console.log("FIFTH***********************************");

    questionVoteUpArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener ( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked question upVote");
            const route = "/questions/voteQuestion";
            let questionId = item.split('-')[1];
            let vote = true;
            const body = { vote, userId, questionId};
            console.log("Voting for questionId: ", questionId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "add", document.getElementById(questionVoteUpArrs[1]));
        });
    });

    questionVoteDownArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked question downVote");
            const route = "/questions/voteQuestion";
            let questionId = item.split('-')[1];
            let vote = false;
            const body = { vote, userId, questionId};
            console.log("Voting for questionId: ", questionId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "subtract", document.getElementById(questionVoteDownArrs[1]));
        });
    });

    answerVoteUpArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked answer upVote");
            const route="/questions/voteAnswer";
            let answerId = item.split('-')[1];
            let vote = true;
            const body = { vote, userId, answerId};
            console.log("Voting for answerId: ", answerId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "add", document.getElementById(answerVoteUpArrs[1]));
        });
    });

    answerVoteDownArrs[0].forEach( (item) => {
        document.getElementById(item).addEventListener( 'click', async (e) => {
            console.log("Set event listener on item id:  ", item);
            console.log("Clicked answer downVote");
            const route="/questions/voteAnswer";
            let answerId = item.split('-')[1];
            let vote = false;
            const body = { vote, userId, answerId};
            console.log("Voting for answerId: ", answerId, " vote: ", vote, " userId: ", userId);
            await postVote(body, route, "subtract", document.getElementById(answerVoteDownArrs[1]));
        })
    });




});



async function postVote(body,route, op, scoreElt) {
    try {
        const res = await fetch(route, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Returned from fetch...");
        if (res.ok) {
            const retVal = await res.json();
            console.log("Return value:  ", retVal.voteCount);
            //let newScore = parseInt(scoreElt.innerHTML);
            //op === "add" ? newScore += 1 : newScore -= 1;
            scoreElt.innerHTML = retVal.voteCount //newScore
        }
        if (!res.ok) {
            throw res;
        }
        return res;
    }
    catch (res)  {
        console.log("Response object:  *******************************************", res);
        const errorJSON = await res.json();
        console.log("ErrorJSON:  ", errorJSON);

        if (errorJSON) {
            let errorsContainer = document.querySelector(".main-box");
            let errorsHTML = `<li>${errorJSON.error}</li>`;
            errorsContainer.innerHTML = `<ul width="40px"; style="color:red; background-color:white">${errorsHTML}</ul>`;
            await setTimeout(function() {errorsContainer.innerHTML = ``;}, 5000);
        }
    }
}
