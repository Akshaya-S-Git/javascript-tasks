let movie = document.getElementById("movie")
let showtime = document.getElementById("showtime")
let price = document.getElementById("price")
let phone = document.getElementById("phone")
let quantity = document.getElementById("quantity")
let total = document.getElementById("total")
let email = document.getElementById("email")
let bookingForm = document.getElementById("bookingform")
let movieerror = document.getElementById("movieerror")
let timeerror = document.getElementById("timeerror")
let priceerror = document.getElementById("priceerror")
let phoneerror = document.getElementById("phoneerror")
let emailerror = document.getElementById("emailerror")
let qtyerror = document.getElementById("qtyerror")
let popup = document.getElementById("popup")
let popupDetails = document.getElementById("popup-details")

let bookings = []
let mail = ""

function calculatePrice() {
    let ticketPrice = Number(price.value)
    let qty = Number(quantity.value)

    if (!Number.isInteger(qty) || qty <= 0 || price.value === "") {
        total.textContent = "0"
        return
    }

    total.textContent = ticketPrice * qty
}

price.addEventListener("change", calculatePrice)
quantity.addEventListener("input", calculatePrice)

function clearErrors() {
    movieerror.textContent = ""
    timeerror.textContent = ""
    priceerror.textContent = ""
    phoneerror.textContent = ""
    emailerror.textContent = ""
    qtyerror.textContent = ""
}

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault()
    clearErrors()

    let qty = Number(quantity.value)
    let valid = true

    if (movie.value === "") {
        movieerror.textContent = "CHOOSE A VALID MOVIE NAME"
        valid = false
    }

    if (showtime.value === "") {
        timeerror.textContent = "CHOOSE A VALID TIME"
        valid = false
    }

    if (price.value === "") {
        priceerror.textContent = "CHOOSE THE PRICE OF THE TICKET"
        valid = false
    }

    if (phone.value==="" || phone.value.length!==10) {
        phoneerror.textContent = "ENTER A VALID 10 DIGIT PHONE NUMBER"
        valid = false
    }

    if (quantity.value === "" || !Number.isInteger(qty) || qty <= 0) {
        qtyerror.textContent = "ENTER A VALID NUMBER OF PEOPLE"
        valid = false
    }

    if (email.value.trim() === "" || !email.checkValidity()) {
        emailerror.textContent = "ENTER A VALID MAIL"
        valid = false
    }

    if (!valid) {
        return
    }

    let amount = Number(price.value) * qty

    let booking = {
        movie: movie.value,
        showtime: showtime.value,
        ticketClass: price.options[price.selectedIndex].text,
        phone: phone.value.trim(),
        quantity: qty,
        email: email.value.trim(),
        total: amount
    }

    bookings.push(booking)

    popupDetails.innerHTML =
        `<p><span>Movie</span><span>${booking.movie}</span></p>` +
        `<p><span>Show Time</span><span>${booking.showtime}</span></p>` +
        `<p><span>Class</span><span>${booking.ticketClass}</span></p>` +
        `<p><span>Phone</span><span>${booking.phone}</span></p>` +
        `<p><span>Email</span><span>${booking.email}</span></p>` +
        `<p><span>Tickets</span><span>${booking.quantity}</span></p>` +
        `<p><span>Total Price</span><span>₹${booking.total}</span></p>`

    popup.classList.add("show")

    let subject = "Movie Ticket Booking Confirmation"
    let message =
        "Your booking details:\n\n" +
        "Movie: " + booking.movie + "\n" +
        "Showtime: " + booking.showtime + "\n" +
        "Class: " + booking.ticketClass + "\n" +
        "Phone number: " + booking.phone + "\n" +
        "Tickets: " + booking.quantity + "\n" +
        "Total Price: Rs. " + booking.total

    mail =
        "mailto:" + booking.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message)
})

function closePopup() {
    popup.classList.remove("show")
    if (mail !== "") {
        window.location.href = mail
        mail = ""
    }
}

document.getElementById("popup-close").addEventListener("click", closePopup)

function reset() {
    bookingForm.reset()
    total.textContent = "0"
    clearErrors()
}


