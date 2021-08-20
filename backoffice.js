const params = new URLSearchParams(location.search)
const movieId = params.get("id")

let results = []

const getProduct = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGMxMTJkNTI2MjAwMTViNmRkMGMiLCJpYXQiOjE2MjkyOTM1ODUsImV4cCI6MTYzMDUwMzE4NX0.DiQ8vcl9fM1k-p1352iy8XiWvbIwvmM_d9yVRtKveNE",
            }
        })

        const allMovies = await response.json()
        return allMovies

    } catch(error){
        console.log(error)
    }
}

const handleSubmit = async function(event) {
    event.preventDefault()

    const url = movieId ? "https://striveschool-api.herokuapp.com/api/movies/" + movieId : "https://striveschool-api.herokuapp.com/api/movies/"

    const newMovie = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("image").value,
    }

    console.log(newMovie)

    const method = movieId ? "PUT" : "POST"

    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(newMovie),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGMxMTJkNTI2MjAwMTViNmRkMGMiLCJpYXQiOjE2MjkyOTM1ODUsImV4cCI6MTYzMDUwMzE4NX0.DiQ8vcl9fM1k-p1352iy8XiWvbIwvmM_d9yVRtKveNE",
                "Content-Type": "application/json",
            }
        })

        if(response.ok){
            const movieResponse = await response.json()
            return movieResponse
        }

    } catch (error){
        console.log(error)
    }finally{
        console.log("Movie submitted")
    }
}

window.onload = async () => {
    const submitButton = document.getElementById("submitButton")

    let editPage = document.getElementById("editPage")
    let span = submitButton.querySelector("span")

    if (movieId) {
        editPage.innerText = "Edit Movie"
        span.innerText = "Save"
    }

    let endpointString = "https://striveschool-api.herokuapp.com/api/movies/"
    if (movieId) {
        endpointString += movieId
    }

    const response = await fetch(endpointString, {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMGMxMTJkNTI2MjAwMTViNmRkMGMiLCJpYXQiOjE2MjkyOTM1ODUsImV4cCI6MTYzMDUwMzE4NX0.DiQ8vcl9fM1k-p1352iy8XiWvbIwvmM_d9yVRtKveNE", 
        }
    })

    const movieDetails = await response.json()
    console.log(movieDetails)
    
    if (movieId) {
        document.getElementById("name").value = movieDetails.name
        document.getElementById("description").value = movieDetails.description
        document.getElementById("category").value = movieDetails.category
        document.getElementById("image").value = movieDetails.imageUrl
    }
}
