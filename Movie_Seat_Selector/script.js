const container = document.getElementById('container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('select-movie')
const count = document.getElementById('count')
const total = document.getElementById('total')




let ticketPrice = +movieSelect.value;
// console.log(ticketPrice)




const setMovieData = (index, price) => {
    localStorage.setItem('MovieIndex', index)
    localStorage.setItem('MoviePrice', price)
}


movieSelect.addEventListener('change', () => {
    ticketPrice = +movieSelect.value;
    setMovieData(movieSelect.selectedIndex, movieSelect.value)
    countHandler();
})

const countHandler = () => {
    const clickedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...clickedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    const selectedSeats = clickedSeats.length;
    count.innerText = selectedSeats;
    total.innerText = selectedSeats * ticketPrice;
}


const fetchData = () => {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeat !== null && selectedSeat.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeat.indexOf(index) > -1) {
                console.log(index)
                seat.classList.add('selected')
            }
        })
    }
    const pullMoviedata = localStorage.getItem('MovieIndex');

    if (pullMoviedata !== null) {
        movieSelect.selectedIndex = pullMoviedata;
    }
}
fetchData();

container.addEventListener('click', (e) => {
    // console.log(e.target)

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        countHandler();
    }
})
