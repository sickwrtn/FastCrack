var review_bar = document.createElement("div");
document.body.appendChild(review_bar);
var review_struct = document.createElement("div");
var server_status = document.getElementsByTagName("h1").item(0);
review_struct.setAttribute("class","review");
review_struct.innerHTML = "<h2></h2><p class='content'></p><p></p><p></p><p></p><button class='recommand'>추천</button><button class='report'>신고</button></div>";
var fastwrtn_api_url = "https://api.fastwrtn.com";
var limit = 20;

document.getElementById("submit-button").addEventListener('click',()=>{
    fetch(fastwrtn_api_url + `/comment`,{
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            comment: document.getElementById("review-text").value,
            star:  Number(document.getElementById("rating").value)
        })
    }).then(res => res.json()).then(data => {
        if (data.result == "SUSSES"){
            alert("등록성공!");
        }
        if (data.result == "FAIL"){
            alert(data.data);
        }
    })
})

fetch(fastwrtn_api_url + `/history?limit=${limit}`)
    .then(res => res.json())
    .then(data => {
        for (const content of data.data) {
            const review = review_struct.cloneNode(true);
            review.setAttribute("id",content.id)
            review.childNodes.item(0).textContent = `별점 : `
            for (let index = 0; index < 5 ; index++) {
                if ((Math.round(content.star)) > index){
                    review.childNodes.item(0).textContent = review.childNodes.item(0).textContent + "★";
                }
                else{
                    review.childNodes.item(0).textContent = review.childNodes.item(0).textContent + "☆";
                }
            }
            review.childNodes.item(1).textContent = content.comment;
            review.childNodes.item(2).textContent = `작성자 : ${content.name}(${content.ip})`;
            review.childNodes.item(3).textContent = `작성일 : ${content.date}`; 
            review.childNodes.item(4).textContent = `리뷰 아이디 : ${content.id}`; 
            review.childNodes.item(5).textContent = `추천 : ${content.likeCount}`; 
            review.childNodes.item(5).addEventListener('click',()=>{
                fetch(fastwrtn_api_url + `/comment/action`,{
                    method: "post",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        type: "like",
                        id : Number(review.id)
                    })
                }).then(res => res.json()).then(data => {
                    if (data.result == "FAIL"){
                        alert(data.data);
                    }
                    else{
                        fetch(fastwrtn_api_url + `/history`)
                            .then(res => res.json())
                            .then(data => {
                                review.childNodes.item(5).textContent = `추천 : ${data.data[review.id].likeCount}`;
                            })
                        alert("추천되었습니다!");
                    }
                })
            }) 
            review.childNodes.item(6).addEventListener('click',()=>{
                fetch(fastwrtn_api_url + `/report?id=${review.id}`).then(res => res.json()).then(data => {
                    if (data.result == "FAIL"){
                        alert(data.data);
                    }
                    else{
                        alert("신고되었습니다.")
                    }
                })
            })
            review_bar.insertAdjacentElement("afterbegin",review);  
        }
    })

fetch(fastwrtn_api_url + `/server`)
    .then(res => res.json())
    .then(data => {
        server_status.textContent = "서버상태:";
        for (let index = 0; index < 5 ; index++) {
            if ((Math.round(data.data)) > index){
                server_status.textContent = server_status.textContent + "★";
            }
            else{
                server_status.textContent = server_status.textContent + "☆";
            }
        }
    })