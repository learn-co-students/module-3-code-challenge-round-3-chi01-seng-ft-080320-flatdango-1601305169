const url = "http://localhost:3000/films"
//poster, title, runtime, showtime, and available tickets 
const poster = document.getElementsByClassName("four wide column");
const info = document.getElementsByClassName("four wide column");

document.addEventListener("DOMContentLoaded", (e) =>{
    e.preventDefault();
    fetchFilms(); // line 12
    buyTicket(); // line 66
});

function fetchFilms(){
    fetch(url)
    .then(resp => resp.json())
    .then (films => filmPoster(films)) // line 18
    };

 function filmPoster(films){
        allFilms = films 
        firstPoster();
        movieInfo();
    };

    function fetchPatch(ticketsSold){
        currentUrl = `${url}/${allFilms[0].id}`
        console.log(ticketsSold)
        fetch(currentUrl,{
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:JSON.stringify({tickets_sold: ticketsSold})
        })
    }; 
  
   

    // this will display the first poster
    function firstPoster(){
        const postImage = document.getElementById('poster')
        postImage.src = allFilms[0].poster 
    };

    // this will display all the movie information 
    function movieInfo() {
        const tick = document.getElementById("title")
        tick.innerText = allFilms[0].title
    
        const runTime = document.getElementById("runtime")
        runTime.innerText = `${allFilms[0].runtime} minutes`
    
        const desc = document.getElementById("film-info")
        desc.innerText = allFilms[0].description
    
        const showTime = document.getElementById("showtime")
        showTime.innerText = allFilms[0].showtime
    
        const tickNum = document.getElementById("ticket-num")

        const tixRem = (allFilms[0].capacity - allFilms[0].tickets_sold)

        tickNum.innerText = `${parseInt(tixRem)}`
    }

    function buyTicket() {
        showMovie = document.getElementById("showing")
        showMovie.addEventListener('click', (e) => {
            e.preventDefault();
            const desc = parseInt(showMovie.querySelectorAll('span')[1].innerText)
            if (desc > 0){
                allFilms[0].tickets_sold = allFilms[0].tickets_sold + 1 
                // will show tickets sold thru console and wont refresh every time  
                const movieTicketSold = allFilms[0].tickets_sold 
                movieInfo()
                fetchPatch(movieTicketSold) // line 34
            };
        })};

// See the first movie's details, including its poster, title, runtime, showtime, and available tickets 
// (the number of tickets left will need to be derived from the theater's capacity and the number of tickets sold)

// Buy a ticket for a movie. The number of tickets sold for that movie should be persisted, and I should be able to see
// the number of available tickets decreasing on the frontend.

// I should not be able to buy a ticket if the showing is sold out.