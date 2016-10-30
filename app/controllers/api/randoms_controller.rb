class Api::RandomsController < ApiController
  def create
    movie = ENV["MOVIEDB_KEY"]
    nasa = ENV["NASA_KEY"]
    beer = ENV["BREWERYDB_KEY"]

    choice = params['choice']
    random_choice = ''
    url = ''

    url = "http://astrocast.herokuapp.com/bites" if choice == 'space-fact'
    url = "https://api.themoviedb.org/3/discover/movie?api_key=#{movie}&language=en-US&with_genres=27" if choice == 'movie'
    url = "https://api.brewerydb.com/v2/beer/random?hasLabels=Y&key=#{beer}" if choice == 'beer'
    url = "https://api.nasa.gov/planetary/apod?api_key=#{nasa}" if choice == 'apod'
    url = "http://taco-randomizer.herokuapp.com/random/?full-taco=true" if choice == 'taco'

    response = HTTParty.get(url)

    respond_to do |format|
      format.json do
        render json: { data: response }
      end
    end
  end

end
