class Api::RandomsController < ApiController
  def create
    movie = ENV["MOVIEDB_KEY"]
    nasa = ENV["NASA_KEY"]
    beer = ENV["BREWERYDB_KEY"]

    choice = params['choice']
    url = ''
    random = ''

    if choice == 'movie'
      pages = []
      number = 1
      until number > 4 do
        res = HTTParty.get("https://api.themoviedb.org/3/discover/movie?api_key=#{movie}&language=en-US&page=#{number}&with_genres=27")
        pages += res['results']
        number += 1
      end
      random = pages.sample
    else
      url = "http://astrocast.herokuapp.com/bites" if choice == 'space-fact'
      url = "https://api.brewerydb.com/v2/beer/random?hasLabels=Y&key=#{beer}" if choice == 'beer'
      url = "https://api.nasa.gov/planetary/apod?api_key=#{nasa}" if choice == 'apod'
      url = "http://taco-randomizer.herokuapp.com/random/?full-taco=true" if choice == 'taco'

      random = HTTParty.get(url)
    end


    respond_to do |format|
      format.json do
        render json: { data: random }
      end
    end
  end

end
